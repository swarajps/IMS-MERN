let SessionStore = {};

function setSessionData(log_id, type) {
    SessionStore.log_id = log_id;
    SessionStore.type = type;
}

function clearSessionData() {
    SessionStore = {};
}

function getSessionData() {
    return SessionStore;
}

module.exports = { setSessionData, clearSessionData, getSessionData };