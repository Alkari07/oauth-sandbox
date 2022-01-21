const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

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
        message: "User failed to authenticate"
    });
});

//redirect on logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

//twitter auth
router.get('/twitter', passport.authenticate('twitter'));

//redirect to home after successful login via twitter
router.get('/twitter/redirect', passport.authenticate('twitter', {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: '/auth/login/failed'
}));

module.exports = router;