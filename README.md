# oauth-sandbox
Based on the tutorial:

https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0

Setting up URL forwarding using ngrok for Google API
https://dashboard.ngrok.com/get-started/setup

To work:
- npm install at /client and /server
- create a /security/security.js file and fill out the following:
/*****
const SECURITY_KEYS = {
    //TWITTER INFO
    "apiKey": "",
    "apiKeySecret": "",
    "BearerToken": "",
    "clientId": "",
    "clientSecret": "",
    //MONGO DB INFO
    "dbUser": "",
    "dbPassword": ,
    //COOKIE INFO (ARBITRARY)
    "cookieKey": "thisappisawesome",
    //GOOGLE INFO
    "googleClientId": ,
    "googleClientSecret": 
}

module.exports = SECURITY_KEYS;
****/

- nodemon index.js at /server
- npm start at /client
