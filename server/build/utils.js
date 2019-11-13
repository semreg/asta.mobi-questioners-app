"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkJwt = void 0;

var _expressJwt = _interopRequireDefault(require("express-jwt"));

var _jwksRsa = _interopRequireDefault(require("jwks-rsa"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const checkJwt = (0, _expressJwt.default)({
  secret: _jwksRsa.default.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: _config.jwksUri
  }),
  audience: _config.audience,
  issuer: _config.issuer,
  algorithms: ['RS256']
});
exports.checkJwt = checkJwt;