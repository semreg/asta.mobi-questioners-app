"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const QuestionerSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    _id: {
      type: _mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    content: String
  }]
});
const Questioner = (0, _mongoose.model)('questioners', QuestionerSchema);
var _default = Questioner;
exports.default = _default;