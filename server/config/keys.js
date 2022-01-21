SECURITY_KEYS = require( "../../security/security");

const TWITTER_TOKENS = {
    TWITTER_CONSUMER_KEY: SECURITY_KEYS.apiKey,
    TWITTER_CONSUMER_SECRET: SECURITY_KEYS.apiKeySecret,
    TWITTER_ACCESS_TOKEN: SECURITY_KEYS.clientId,
    TWITTER_TOKEN_SECRET: SECURITY_KEYS.clientSecret
  };
  
  const DB_USER = SECURITY_KEYS.dbUser;
  const DB_PASSWORD = SECURITY_KEYS.dbPassword;
  const MONGODB = {
    MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ramnp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  };
  
  const SESSION = {
    COOKIE_KEY: SECURITY_KEYS.cookieKey
  };
  
  const KEYS = {
    ...TWITTER_TOKENS,
    ...MONGODB,
    ...SESSION
  };
  
  module.exports = KEYS;