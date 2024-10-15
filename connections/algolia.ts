// hello_algolia.mjs
import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
export const dbAllProducts = client.initIndex("allProductos");

export const dbProductsDest = client.initIndex("productosDestacados");
