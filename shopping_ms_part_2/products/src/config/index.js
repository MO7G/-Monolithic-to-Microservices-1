const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  console.log("hahaha")
  const configFile = `./.env.${process.env.NODE_ENV}`;
  console.log("the configfile is " , configFile)
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  SHOPPING_BINDING_KEY: 'shopping_service',
  CUSTOMER_BINDING_KEY: 'customer_service'
};
