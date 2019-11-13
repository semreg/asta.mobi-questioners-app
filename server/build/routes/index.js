"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _api = _interopRequireDefault(require("./api"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/api', _api.default);
router.use('*', (_, res) => {
  res.sendFile(_path.default.join(__dirname, '../../../client/build/index.html'));
});
var _default = router;
exports.default = _default;