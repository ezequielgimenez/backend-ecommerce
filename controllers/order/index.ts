import type { NextApiRequest, NextApiResponse } from "next";
import { createPreference } from "lib/mercadopago";
import { createOrder } from "models/orders";
import { dbAllProducts } from "connections/algolia";
import * as Yup from "yup";

export async function createOrderController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const { productId } = req.query as any;
    const data = (req as any).userData;
    const product = await dbAllProducts.getObject(productId);
    const prods = JSON.parse(JSON.stringify(product));
    const myOrder = await createOrder(data.id, prods);

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

    await schemaUser.validate(data);

    const preference = await createPreference({
      ...body,
      items: [
        {
          id: "1234",
          title: "Dummy Title",
          description: "Dummy description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "car_electronics",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 10,
        },
      ],
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
      external_reference: myOrder.get("id"),
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
      /////////////////ENVIOS///////////////
      // shipments: {
      //   mode: "custom",
      //   local_pickup: false,
      //   default_shipping_method: null,
      //   free_methods: [
      //     {
      //       id: 1,
      //     },
      //   ],
      //   cost: 10,
      //   free_shipping: false,
      //   dimensions: "10x10x20,500",
      //   receiver_address: {
      //     zip_code: "06000000",
      //     street_number: 123,
      //     street_name: "Street",
      //     floor: "12",
      //     apartment: "120A",
      //   },
      // },
      // statement_descriptor: "Test Store",
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
      message: "No se encontro" + error,
    });
  }
}
