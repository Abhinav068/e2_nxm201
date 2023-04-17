

const authorize = (arr) => {
    return (req, res, next) => {
        if (arr.includes(req.body.role)) {
            next();
        }
        else {
            res.send('not authorized');
        }
    }
}

module.exports = { authorize }