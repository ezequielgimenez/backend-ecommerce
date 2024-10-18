import type { NextApiRequest, NextApiResponse } from "next";
import { createPreference } from "lib/mercadopago";
import { createOrder } from "models/orders";
import { dbAllProducts } from "connections/algolia";
import * as Yup from "yup";

const schemaUser = Yup.object().shape({
  name: Yup.string().required(), // Agrega las validaciones que correspondan
  surname: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.object().shape({
    area_code: Yup.string().required(), // Define el esquema del objeto 'phone'
    number: Yup.number().required(),
  }),
  identification: Yup.object().shape({
    type: Yup.string().default("DNI"), // Usa Yup para los campos de identificación
    number: Yup.string().required(),
  }),
  address: Yup.object().shape({
    codigo_postal: Yup.string().required(),
    calle: Yup.string().required(),
    nro_calle: Yup.number().required(),
  }),
});

export async function createOrdersController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = (req as any).userData;
    //aca valido que en la data del user que tengo a traves del token, tenga todos estos campos para realizar una preferencia/compra
    await schemaUser.validate(data);
  } catch (error) {
    res.send({
      success: false,
      message:
        "Por favor verifica tener todos tus datos actualizados para realizar esta transacción",
    });
  }
  //
  try {
    const { productIds } = req.body as { productIds: string[] }; // Recibe array de IDs
    const data = (req as any).userData;

    // Validar que se haya enviado al menos un ID
    if (!productIds || productIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Se requiere al menos un ID de producto." });
    }

    const { results } = await dbAllProducts.getObjects(productIds);

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No se encontraron productos." });
    }

    const itemProducto = JSON.parse(JSON.stringify(results));

    // Crear las órdenes para cada producto
    const myOrders = await Promise.all(
      results.map((product) => createOrder(data.id, product))
    );

    // Creo un ID compuesto para referencia externa
    const externalReference = myOrders
      .map((order) => order.get("id"))
      .join(",");

    // Construir el array de items para la preferencia
    const items = itemProducto.map((product) => ({
      id: product.objectID,
      title: product.name,
      description: product.description,
      picture_url: product.image,
      category_id: "Fashion",
      quantity: 1, // Asume que se comprará una unidad de cada producto
      currency_id: "ARS",
      unit_price: product.precio,
    }));

    const preference = await createPreference({
      items,
      marketplace_fee: 0,
      payer: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: {
          area_code: data.phone.area_code,
          number: data.phone.number,
        },
        identification: {
          type: "DNI",
          number: data.indentification,
        },
        address: {
          zip_code: data.address.codigo_postal,
          street_name: data.address.calle,
          street_number: data.address.nro_calle,
        },
      },
      back_urls: {
        success: "http://test.com/success",
        failure: "http://test.com/failure",
        pending: "http://test.com/pending",
      },
      differential_pricing: {
        id: 1,
      },
      expires: false,
      auto_return: "all",
      binary_mode: true,
      external_reference: externalReference,
      marketplace: "marketplace",
      notification_url:
        "https://payments-sand.vercel.app/api/notification_order", /// A que URL de nuestra API le va a notificar sobre el pago
      operation_type: "regular_payment",

      ////////////////////// Metodos de pago //////////////////////
      // payment_methods: {
      //   default_payment_method_id: "master",
      //   excluded_payment_types: [
      //     {
      //       id: "ticket",
      //     },
      //   ],
      //   excluded_payment_methods: [
      //     {
      //       id: "",
      //     },
      //   ],
      //   installments: 5,
      //   default_installments: 1,
      // },
      //
      /////////////////ENVIOS/////////////// mode: 'custom'  'me2', // Opción para usar envíos de Mercado Envíos
      shipments: {
        mode: "default", // Activa Mercado Envíos.
        local_pickup: true, // Habilita la opción de retiro en tienda.
        free_methods: [
          {
            id: 501, // ID de "retiro en sucursal" (o método gratuito configurado).
          },
        ],
        cost: 20, // Costo del envío a domicilio.
        free_shipping: false, // El envío es gratis solo para retiro en tienda.
        dimensions: "10x10x20,500", // Dimensiones del paquete.
        //
        //direccion
        receiver_address: {
          zip_code: data.address.codigo_postal,
          street_number: data.address.nro_calle,
          street_name: data.address.calle,
          floor: "",
          apartment: "",
        },
      },
      statement_descriptor: "Modakelar ropas y accesorios",
    });

    res.send({
      success: true,
      init_point: preference.init_point,
      data,
      message: "Preferencia de pago creada con orden de compra creada",
    });
    //
  } catch (error) {
    res.send({
      success: false,
      message: error,
      myData: "",
    });
  }
}
