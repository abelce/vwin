'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck'),
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass'),
);

var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits'),
);

var _createSuper2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createSuper'),
);

var _react = _interopRequireDefault(require('react'));

var Somo = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(Somo, _React$Component);

  var _super = (0, _createSuper2.default)(Somo);

  function Somo() {
    (0, _classCallCheck2.default)(this, Somo);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Somo, [
    {
      key: 'render',
      value: function render() {
        return /*#__PURE__*/ _react.default.createElement('div', null, 'somo');
      },
    },
  ]);
  return Somo;
})(_react.default.Component);

var _default = Somo;
exports.default = _default;
