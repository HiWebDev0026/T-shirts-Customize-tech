const jwtAuthz = require('express-jwt-authz');


const checkScopesAdmin = jwtAuthz(['admin:auth'], {
    customScopeKey: 'permissions',
});


module.exports = checkScopesAdmin;