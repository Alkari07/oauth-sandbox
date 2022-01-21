import SECURITY_KEYS from "../../security/security";

const TWITTER_TOKENS = {
    TWITTER_CONSUMER_KEY: SECURITY_KEYS.apiKey,
    TWITTER_CONSUMER_SECRET: SECURITY_KEYS.apiKeySecret,
    TWITTER_ACCESS_TOKEN: SECURITY_KEYS.clientId,
    TWITTER_TOKEN_SECRET: SECURITY_KEYS.clientSecret
  };
  
  const DB_USER = "SOME USER";
  const DB_PASSWORD = "SOME PASSWPORD";
  const MONGODB = {
    MONGODB_URI: `mongodb://${DB_USER}:${DB_PASSWORD}@ds<SOME_DOMAIN>.mlab.com:<PORT>/<PROJECT_NAME>`
  };
  
  const SESSION = {
    COOKIE_KEY: "thisappisawesome"
  };
  
  const KEYS = {
    ...TWITTER_TOKENS,
    ...MONGODB,
    ...SESSION
  };
  
  module.exports = KEYS;