// var Airtable = require('airtable');
import Airtable from "airtable";

export const myAirtable = new Airtable({
  apiKey: process.env.TOKEN_AIRTABLE,
}).base("appumUIClNINzc45S");
