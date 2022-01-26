const router = require('express').Router();
const { session } = require('passport');
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = 'http://127.0.0.1:3000';

//when login is successful, retrieve user info
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "User has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});

//when login failed, send fail msg
router.get('/login/failed', (req, res)=> {
    res.status(401).json({
        success: false,
        message: req.session.messages
    });
});

//redirect on logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

//twitter auth
router.get('/twitter', passport.authenticate('twitter'));

//google auth
router.get('/google', 
    passport.authenticate('google'));

//redirect to home after successful login via twitter
router.get('/twitter/redirect', passport.authenticate('twitter', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed'
}));

//redirect to home after successful login via google
router.get('/google/redirect', (req, res, next) => {
        passport.authenticate('google', {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: '/auth/login/failed', 
        failureMessage: true
        })(req,res,next);
    }
);

module.exports = router;