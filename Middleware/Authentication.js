// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports=isAuthenticated;