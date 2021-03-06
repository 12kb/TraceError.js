'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Exception2 = require('./Exception');

var _Exception3 = _interopRequireDefault(_Exception2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraceError = function (_Exception) {
  _inherits(TraceError, _Exception);

  _createClass(TraceError, [{
    key: 'serializeNonError',
    value: function serializeNonError(e) {
      try {
        return JSON.stringify(e, null, 2);
      } catch (e) {
        // ignore
      }

      return e;
    }
  }, {
    key: 'resolveStackFromError',
    value: function resolveStackFromError(e) {
      return e === this && TraceError.globalStackProperty === 'stack' ?
      // use the parent stack to prevent stack overflow
      _get(Object.getPrototypeOf(TraceError.prototype), 'stack', this) :
      // no need to check type since the fallback is the Error.prototype
      e[TraceError.globalStackProperty];
    }
  }, {
    key: 'getLongStack',
    value: function getLongStack() {
      var stacks = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.causes()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cause = _step.value;

          if (cause instanceof TraceError) {
            stacks.push(cause.getLongStack());
          } else if (cause instanceof Error) {
            stacks.push(this.resolveStackFromError(cause));
          } else {
            stacks.push(this.serializeNonError(cause));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var children = TraceError.indent + stacks.join('\n').split('\n').join('\n' + TraceError.indent);
      return (this.resolveStackFromError(this) + '\n' + children).trim();
    }
  }, {
    key: 'messages',
    value: function messages() {
      var messages = [_get(Object.getPrototypeOf(TraceError.prototype), 'message', this)];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.causes()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var cause = _step2.value;

          if (cause instanceof TraceError) {
            messages = messages.concat(cause.messages());
          } else if (cause instanceof Error) {
            messages.push(cause.message);
          } else {
            messages.push(cause);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return messages;
    }
  }, {
    key: 'cause',
    value: function cause() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      return this.getHiddenProperty('causes', [])[index];
    }
  }, {
    key: 'causes',
    value: function causes() {
      return this.getHiddenProperty('causes', []);
    }
  }, {
    key: 'stack',
    get: function get() {
      if (this.getHiddenProperty('useBase')) {
        return _get(Object.getPrototypeOf(TraceError.prototype), 'stack', this);
      }

      this.defineHiddenProperty('useBase', true);

      var stack = this.getLongStack();

      this.defineHiddenProperty('useBase', false);

      return stack;
    }
  }]);

  function TraceError(message) {
    _classCallCheck(this, TraceError);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TraceError).call(this, message));

    for (var _len = arguments.length, causes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      causes[_key - 1] = arguments[_key];
    }

    _this.defineHiddenProperty('causes', causes);
    return _this;
  }

  return TraceError;
}(_Exception3.default);

TraceError.indent = '    ';
TraceError.globalStackProperty = 'stack';
TraceError.Exception = _Exception3.default;
exports.default = TraceError;
