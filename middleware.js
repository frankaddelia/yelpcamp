module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // store the original route to be able to send the user where they originally wanted to go
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in for that!');
        return res.redirect('/login');
    }
    next();
}