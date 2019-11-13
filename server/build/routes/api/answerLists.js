"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _utils = require("../../utils");

var _expressJwtAuthz = _interopRequireDefault(require("express-jwt-authz"));

var _AnswerList = _interopRequireDefault(require("../../models/AnswerList"));

var _Questioner = _interopRequireDefault(require("../../models/Questioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router(); // @route GET /api/answerList
// @desc Get all answerLists

router.get('/', _utils.checkJwt, (0, _expressJwtAuthz.default)(['read:answerLists']), async (req, res) => {
  try {
    const answerLists = await _AnswerList.default.find();
    res.json({
      success: true,
      answerLists
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route GET /api/answerList/:id
// @desc Get specific answerList

router.get('/:id', _utils.checkJwt, (0, _expressJwtAuthz.default)(['read:answerLists']), async (req, res) => {
  try {
    const answerList = await _AnswerList.default.findById(req.params.id);
    res.json({
      success: true,
      answerList
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route POST /api/answerList/new
// @desc Create new answerList

router.post('/new', _utils.checkJwt, (0, _expressJwtAuthz.default)(['create:answerLists']), async (req, res) => {
  console.log(req.body);

  if (!req.body.questionerId) {
    return res.status(400).send({
      success: false,
      message: 'Questioner ID is required!'
    });
  }

  const questioner = await _Questioner.default.findById(req.body.questionerId);

  if (!questioner) {
    return res.status(400).send({
      success: false,
      message: 'No such questioner found!'
    });
  }

  if (questioner.questions.length !== req.body.answers.length) {
    return res.status(400).send({
      success: false,
      message: 'The amount of answers is not correct!'
    });
  }

  const newAnswerList = new _AnswerList.default({ ...req.body,
    questioner
  });

  try {
    const answerList = await newAnswerList.save();
    res.json({
      success: true,
      answerList
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route DELETE /api/answerList/:id
// @desc Delete answerList

router.delete('/delete/:id', _utils.checkJwt, (0, _expressJwtAuthz.default)(['delete:answerLists']), async (req, res) => {
  try {
    await _AnswerList.default.findOneAndRemove(req.params.id);
    res.json({
      success: true
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
});
var _default = router;
exports.default = _default;