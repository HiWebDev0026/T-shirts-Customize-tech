const {Router}= require('express')
const {postShirt, getShirts, getShirt, putShirt, deleteShirt}= require('../controllers/shirt')
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const router= Router();

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
    issuer: [`${process.env.REACT_APP_AUTH0_DOMAIN}`],
    algorithms: ['RS256']
  });

router.get('/', getShirts)
router.get('/:id', getShirt)
router.post('/', checkJwt, postShirt)
router.put('/:id', putShirt)
router.delete('/:id', deleteShirt)

module.exports = router