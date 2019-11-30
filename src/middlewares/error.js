module.exports = {
    // Catches all errors and display message
    errorHandler: (err, req, res, next) => {
        err.status = err.status || 500;
        err.message = err.message || 'Sorry, there was an error!';
        res.locals.error = err;
        res.status(err.status);
        res.render('error');
    },
    // Set Error to not found
    notFound: (req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    }
}