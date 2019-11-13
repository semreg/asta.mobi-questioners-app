"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _Questioner = _interopRequireDefault(require("./Questioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emailRe = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = re => email => re.test(email);

const AnswersListSchema = new _mongoose.Schema({
  questioner: {
    type: _Questioner.default.schema,
    required: true
  },
  responderEmail: {
    type: String,
    trim: true,
    lowercase: true,
    required: 'Responder`s email is required!',
    validate: [validateEmail(emailRe), 'Please provide a valid email address'],
    match: [emailRe, 'Please provide a valid email address']
  },
  answers: [{
    _id: _mongoose.Schema.ObjectId,
    content: String
  }]
});
const AnswerList = (0, _mongoose.model)('answerList', AnswersListSchema);
var _default = AnswerList;
exports.default = _default;