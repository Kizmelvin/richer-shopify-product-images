import Client from "shopify-buy";

export const client = Client.buildClient({
  storefrontAccessToken: process.env.SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  domain: process.env.SHOPIFY_STORE_DOMAIN,
});

// "08fa0b442045fe3a5e51a80d907caa2e"
// "chidiebere-storre.myshopify.com"
