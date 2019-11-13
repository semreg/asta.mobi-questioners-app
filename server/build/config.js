"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoURI = exports.issuer = exports.audience = exports.jwksUri = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const jwksUri = process.env.JWKS_URI || '';
exports.jwksUri = jwksUri;
const audience = process.env.AUDIENCE || '';
exports.audience = audience;
const issuer = process.env.ISSUER || '';
exports.issuer = issuer;
const mongoURI = process.env.MONGO_URI || 'mongodb://demo:demo1234@localhost:27017/questioners';
exports.mongoURI = mongoURI;