const sessionManager = require('././sessionManager');


function checkAuth(req, res, next) {
    const session = sessionManager.getSessionData();

    if (session || session.type === 'admin' || session.type === 'mentor' || session.type === 'intern') {
        next();
    }
}

module.exports = checkAuth;