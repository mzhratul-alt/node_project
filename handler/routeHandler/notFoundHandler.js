const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Your URL Not Found'
    });
}

module.exports = handler;