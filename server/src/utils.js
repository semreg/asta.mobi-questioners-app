import jwt from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import { jwksUri, audience, issuer } from './config'

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri
  }),
  audience,
  issuer,
  algorithms: ['RS256']
})
