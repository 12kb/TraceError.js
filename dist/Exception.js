'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weakmap = require('weakmap');

var _weakmap2 = _interopRequireDefault(_weakmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var privates = new _weakmap2.default();

var Exception = function () {
  _createClass(Exception, [{
    key: 'get',


    // TEMP for extending the base class via Exception.prototype - unsafe procedure
    // marked for deprecation
    value: function get(key) {
      return this.getHiddenProperty('error')[key];
    }

    // marked for deprecation

  }, {
    key: 'set',
    value: function set(key, value) {
      this.getHiddenProperty('error')[key] = value;
    }
  }, {
    key: 'defineHiddenProperty',
    value: function defineHiddenProperty(key, value) {
      var pr = privates.has(this) ? privates.get(this) : {};
      pr[key] = value;
      privates.set(this, pr);
    }
  }, {
    key: 'getHiddenProperty',
    value: function getHiddenProperty(key, def) {
      return privates.has(this) ? privates.get(this)[key] : def;
    }
  }, {
    key: 'stack',
    get: function get() {
      return this.getHiddenProperty('error').stack;
    },
    set: function set(stack) {
      this.getHiddenProperty('error').stack = stack;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.getHiddenProperty('error').name;
    },
    set: function set(name) {
      this.getHiddenProperty('error').name = name;
    }
  }, {
    key: 'message',
    get: function get() {
      return this.getHiddenProperty('error').message;
    },
    set: function set(message) {
      this.getHiddenProperty('error').message = message;
    }
  }]);

  function Exception() {
    _classCallCheck(this, Exception);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var error = new (Function.prototype.bind.apply(Error, [null].concat(args)))();
    error.name = this.constructor.name;
    this.defineHiddenProperty('error', error);
  }

  _createClass(Exception, [{
    key: 'toJSON',
    value: function toJSON() {
      if (!Exception.searchPrototype) {
        return { stack: this.stack, message: this.message, name: this.name };
      }

      var json = {};
      var currProto = this;
      var chain = [currProto];

      while (currProto = Object.getPrototypeOf(currProto)) {
        chain.push(currProto);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = chain[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var proto = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Object.getOwnPropertyNames(proto)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;

              if (json.hasOwnProperty(key)) continue;
              var desc = Object.getOwnPropertyDescriptor(proto, key);
              if (desc) {
                var value = desc.get ? desc.get.call(this) : desc.value;

                if (proto.isPrototypeOf(value)) {
                  continue;
                }

                if (typeof value !== 'function') {
                  json[key] = value;
                }
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

      return json;
    }
  }]);

  return Exception;
}();

Exception.searchPrototype = false;
exports.default = Exception;


Object.setPrototypeOf(Exception.prototype, Error.prototype);
