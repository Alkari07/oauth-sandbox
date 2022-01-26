const express = require('express');
const app = express();
const port = 4000;
const passport = require('passport');
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const keys = require("./config/keys");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header

//connect to mongodb via mongoose
//mongoose provides a schema-based solution to model application data and handle database CRUD
mongoose.connect(keys.MONGODB_URI, () => {
    console.log("connected to mongo db");
});

app.use(
    cookieSession({
        name: "session",
        keys: [keys.COOKIE_KEY],
        maxAge: 24*60*60*100, //a day
        secure: false
    })
);

//parse cookies
app.use(cookieParser());

//initialize passport
app.use(passport.initialize());

// //deserialize cookie from the browser
app.use(passport.session());

//setup cors to allow accepting of requests from the client
app.use(
    cors({
        origin: 'http://127.0.0.1:3000', //allow server to accept requests from this origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true //allow session cookie from browser to pass through
    })
);

//setup routes
app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated"
        });
    } else {
        next();
    }
};

//if we've already logged in, send the profile response
//otherwise, send a 401 response that the user is not authenticated
//auth check before navigating to home page
app.get('/', authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
});

//connect to nodejs express server
app.listen(port, ()=> console.log(`Server is running on port ${port}`));

