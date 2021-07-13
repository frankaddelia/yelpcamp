module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in for that!');
        return res.redirect('/login');
    }
    next();
}