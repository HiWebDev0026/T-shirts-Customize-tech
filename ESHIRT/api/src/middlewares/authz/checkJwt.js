const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience:  `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
    issuer: [`https://${process.env.REACT_APP_AUTH0_DOMAIN}/`],
    algorithms: ['RS256']
  });
 
module.exports = checkJwt;

