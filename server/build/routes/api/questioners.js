"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _utils = require("../../utils");

var _expressJwtAuthz = _interopRequireDefault(require("express-jwt-authz"));

var _Questioner = _interopRequireDefault(require("../../models/Questioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express.Router(); // @route GET /api/questioner
// @desc Get all questioners

router.get('/', _utils.checkJwt, (0, _expressJwtAuthz.default)(['read:questioners']), async (req, res) => {
  console.log(req.user);

  try {
    const questioners = await _Questioner.default.find();
    res.json({
      sucess: true,
      questioners
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route GET /api/questioner/:id
// @desc Get specific questioner

router.get('/:id', _utils.checkJwt, (0, _expressJwtAuthz.default)(['read:questioners']), async (req, res) => {
  try {
    const questioner = await _Questioner.default.findById(req.params.id);

    if (!questioner) {
      res.status(400).send({
        success: false,
        message: 'No such questioner found'
      });
    }

    res.json({
      success: true,
      questioner
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route POST /api/questioner/new
// @desc Create new questioner

router.post('/new', _utils.checkJwt, (0, _expressJwtAuthz.default)(['create:questioners']), async (req, res) => {
  const newQuestioner = new _Questioner.default(req.body);

  try {
    const questioner = await newQuestioner.save();
    res.json({
      success: true,
      questioner
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route PUT /api/questioner/:id
// @desc Update questioner

router.put('/update/:id', _utils.checkJwt, (0, _expressJwtAuthz.default)(['update:questioners']), async (req, res) => {
  try {
    const updatedQuestioner = await _Questioner.default.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      success: true,
      updatedQuestioner
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err
    });
  }
}); // @route DELETE /api/questioner/:id
// @desc Delete questioner

router.delete('/delete/:id', _utils.checkJwt, (0, _expressJwtAuthz.default)(['delete:questioners']), async (req, res) => {
  try {
    await _Questioner.default.findOneAndRemove(req.params.id);
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