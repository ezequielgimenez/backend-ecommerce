import * as mercadopago from "mercadopago";
// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, MerchantOrder, Preference } from "mercadopago";

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
  accessToken: process.env.TOKEN_MERCADOPAGO,
  options: { timeout: 5000, idempotencyKey: "abc" },
});

// mercadopago.MerchantOrder;
const merchantOrder = new MerchantOrder(client);

export async function getMerchantOrder(merchantOrderId) {
  const order = await merchantOrder.get({ merchantOrderId });
  return order;
}

const preference = new Preference(client);

export async function createPreference(body) {
  const myPreference = await preference.create({ body });
  return myPreference;
}
