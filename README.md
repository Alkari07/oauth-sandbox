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

#Stumbling blocks and gotchas:
- You MUST use http or https all the way through.  Switching (such as using an ngrok redirect to get around localhost whitelisting on google) will cause secure cookie / state mismatch issues
- Double check that site IP (or all IPs) are whitelisted on mongo!
- mongoose.connect callback function that your db is connected from the tutorial is WRONG!  This function fires no matter what!  You need to use the second argument for options, and then use event listeners for different connection states
- The "done" function in the passport config does NOT return from function call - the two "done" calls need to be in an if-else structure or they will both be called and crash the server in some situations (this is how it was in the tutorial)
- You can use somepath/auth/google.com to get around google's requirement that things end in ".com"
- Make sure to use 127.0.0.1, for some reason authorized redirects has an issue with localhost
- I never got the ngrok forwarding to work - this constantly caused a state verification error
-- my guess is that there is weirdness with how the cookie or state variable is handled if you use ngrok as a proxy
