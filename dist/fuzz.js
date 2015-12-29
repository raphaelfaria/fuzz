var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Fuzz = factory();
})(this, function () {
  'use strict';

  var Item = (function () {
    function Item(name, index) {
      _classCallCheck(this, Item);

      this.name = name;
      this.mainIndex = index;
      this.weight = 0;
      this.detailedArray = this._prepareItem();
    }

    _createClass(Item, [{
      key: '_prepareItem',
      value: function _prepareItem() {
        function indexIsSectionStart(string, index) {
          return index === 0 || string[index].toUpperCase() === string[index] && (index === 1 || string[index - 1].toUpperCase() !== string[index - 1]);
        }

        return this.name.split('').map(function (char, index, arr) {
          return {
            index: index,
            char: char,
            beginSection: indexIsSectionStart(arr, index),
            weight: 0
          };
        });
      }
    }, {
      key: 'calcMatch',
      value: function calcMatch(string) {
        var matchIndex = [];
        var searchIndex = -1;
        var lookUpper = true;
        var testName = this.name;

        var l = string.length;
        var lowerTestName = this.name.toLowerCase();

        for (var i = 0; i < l; i++) {
          var currentChar = string.charAt(i);

          if (lookUpper) {
            testName = this.name;
            currentChar = currentChar.toUpperCase();
          }

          if (!lookUpper) {
            testName = lowerTestName;
          }

          if (searchIndex >= this.name.length) {
            return false;
          }

          searchIndex = testName.indexOf(currentChar, searchIndex + 1);

          if (searchIndex > -1) {
            matchIndex.push(searchIndex);
          } else {
            if (lookUpper === false) {
              matchIndex = [];
              break;
            }

            if (lookUpper === true) {
              i -= 1;
              searchIndex = matchIndex[matchIndex.length - 1] || -1;
            }

            lookUpper = !lookUpper;
          }
        }

        this.matched = matchIndex;

        // Calculate rank
        this.calculateWeight();

        return !!this.matched.length;
      }
    }, {
      key: 'calculateWeight',
      value: function calculateWeight() {
        var _this = this;

        var substringSize = 0;

        this.weight = this.matched.reduce(function (weight, matchIndex, index) {
          if (_this.detailedArray[matchIndex].beginSection === true) {
            _this.detailedArray[matchIndex].weight = 80 - matchIndex;
            weight += _this.detailedArray[matchIndex].weight;

            if (_this.matched[index - 1] == matchIndex - 1) {
              substringSize++;
              _this.detailedArray[matchIndex].weight += 15 * Math.pow(2, substringSize) - matchIndex;
              weight += _this.detailedArray[matchIndex].weight;
            }
          } else if (_this.matched[index - 1] == matchIndex - 1) {
            substringSize++;
            _this.detailedArray[matchIndex].weight = 15 * Math.pow(2, substringSize) - matchIndex;
            weight += _this.detailedArray[matchIndex].weight;
          } else {
            _this.detailedArray[matchIndex].weight = 10 - matchIndex;
            weight += _this.detailedArray[matchIndex].weight;
          }

          weight -= _this.name.length - 1 - _this.matched[_this.matched.length - 1];

          return weight;
        }, 0);

        return this;
      }
    }]);

    return Item;
  })();

  var Fuzz = (function (_Array) {
    _inherits(Fuzz, _Array);

    function Fuzz(collection) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, Fuzz);

      _get(Object.getPrototypeOf(Fuzz.prototype), 'constructor', this).call(this);
      this.main = collection;
      this.push.apply(this, this._prepareCollection());
    }

    _createClass(Fuzz, [{
      key: 'parse',
      value: function parse(item) {
        return item;
      }
    }, {
      key: '_prepareCollection',
      value: function _prepareCollection() {
        var _this2 = this;

        return this.main.map(function (item, i) {
          return new Item(_this2.parse(item), i);
        });
      }
    }, {
      key: 'match',
      value: function match(string) {
        var query = string.replace(/\s+/g, '').toLowerCase();
        var results = this.filter(function (item) {
          return item.calcMatch(query);
        });

        return results.sort(function (a, b) {
          if (a.weight > b.weight) {
            return -1;
          }

          if (a.weight < b.weight) {
            return 1;
          }

          return 0;
        });
      }
    }]);

    return Fuzz;
  })(Array);

  var fuzz = Fuzz;

  return fuzz;
});
//# sourceMappingURL=fuzz.js.map
