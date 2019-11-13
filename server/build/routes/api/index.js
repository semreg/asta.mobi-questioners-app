"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _questioners = _interopRequireDefault(require("./questioners"));

var _answerLists = _interopRequireDefault(require("./answerLists"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/questioners', _questioners.default);
router.use('/answerLists', _answerLists.default);
var _default = router;
exports.default = _default;