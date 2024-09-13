// hello_algolia.mjs
import algoliasearch from "algoliasearch";

const appID = "HZJ2XKFLQY";
const apiKey = "ee5aa4e0920458ee4c406f174832adb8";

// Connect and authenticate with your Algolia app
const client = algoliasearch(appID, apiKey);
export const dbAlgolia = client.initIndex("airtable");
