# oauth-sandbox
Based on the tutorial:

https://medium.com/free-code-camp/how-to-set-up-twitter-oauth-using-passport-js-and-reactjs-9ffa6f49ef0

Setting up URL forwarding using ngrok for Google API
https://dashboard.ngrok.com/get-started/setup

To get this to work, you must:
- run ngrok to create a public url to forward to port 4000 on your local host
- register that ngrok url, along with ngrok_url/auth/google/redirect on the google app
- change the redirect in the google strategy config to be the ngrok_url/auth/google/redirect
