const passport = require('passport');
const TwitterStrategy = require ('passport-twitter');
const GoogleStrategy = require('passport-google-oidc');
const keys = require('./keys');
const User = require('../models/user-model');

//so that the browser remembers if a user is logged in or not, this is stored in a cookie
//however we can't just send the info in plaintext because then a session could be spoofed
//serialization is the process of a user from the user DB getting encrypted and sending it back to the browser
//as a cookie.  Deserialization is when a cookie from the browser is decrypted to get the user that is already signed in


//serialize the user.id to save in the cookie session so browser will remember the user when logging in again
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//deserialize the cookieUserId to a user in the DB
passport.deserializeUser((id, done) => {
    User.findById(id).then(user=> {
        done (null, user);
    })
    .catch(e=> {
        done(new Error("failed to deserialize user"));
    });
});

passport.use(
    new TwitterStrategy({
        consumerKey: keys.TWITTER_CONSUMER_KEY,
        consumerSecret: keys.TWITTER_CONSUMER_SECRET,
        callbackURL: 'http://127.0.0.1:4000/auth/twitter/redirect'
    },
    async(token, tokenSecret, profile, done)=> {
        //callback function when twitter auth succeeds

        //find current user in UserModel
        const currentUser = await User.findOne({
            twitterId: profile._json.id_str
        });
        //create new user if the DB doesn't have this user
        if (!currentUser) {
            const newUser = await new User({
                name: profile._json.name,
                screenName: profile._json.screen_name,
                twitterId: profile._json.id_str,
                profileImageUrl: profile._json.profile_image_url
            }).save();
            if (newUser) {
                done(null, newUser);
            }
        }
        done(null, currentUser);
    }
    )
);

passport.use(
    new GoogleStrategy({
        consumerKey: keys.GOOGLE_CLIENT_ID,
        consumerSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:4000/auth/google/redirect'
    },
    async(issuer, profile, done)=> {
        //callback function when twitter auth succeeds

        //find current user in UserModel
        const currentUser = await User.findOne({
            googleId: profile.id
        });
        //create new user if the DB doesn't have this user
        if (!currentUser) {
            const newUser = await new User({
                name: profile.displayName,
                screenName: profile.displayName,
                googleId: profile.id,
            }).save();
            if (newUser) {
                done(null, newUser);
            }
        }
        done(null, currentUser);
    }
    )
);