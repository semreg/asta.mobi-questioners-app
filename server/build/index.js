"use strict";

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mongoose.connect)(_config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  _app.default.listen(3001, () => console.log('App is ready on 3001'));
}).catch(err => {
  console.log(err);
});