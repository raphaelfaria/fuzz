var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Fuzz = factory();
})(this, function () {
  'use strict';

  var Cache = (function () {
    function Cache() {
      _classCallCheck(this, Cache);
    }

    _createClass(Cache, [{
      key: 'construct',
      value: function construct() {
        this.arr = null;
        this.query = null;
      }
    }, {
      key: 'clean',
      value: function clean() {
        this.arr = null;
        this.query = null;
      }
    }, {
      key: 'check',
      value: function check(query) {
        if (!this.query || !query) {
          return false;
        }

        if (query.length < this.query.length) {
          return false;
        }

        if (query === this.query) {
          return true;
        }

        if (query.indexOf(this.query) === 0) {
          return true;
        }

        return false;
      }
    }]);

    return Cache;
  })();

  function isUpper(char) {
    return char.toUpperCase() === char;
  }

  function nonWordChar(char) {
    return (/\W/.test(char)
    );
  }

  function indexIsSectionStart(string, index) {
    return index >= 0 && index === 0 || index === 1 && isUpper(string[index]) || isUpper(string[index]) || nonWordChar(string[index - 1]);
  }

  function calculateWeight(name, substringSize, matchIndex, lastMatchIndex) {
    var isSectionStart = indexIsSectionStart(name, matchIndex);

    var weight = 0;

    if (isSectionStart) {
      weight += 85;
    }

    if (substringSize > 1) {
      weight += 50 + 14 * (substringSize - 1);
    }

    if (lastMatchIndex >= 0 && matchIndex - lastMatchIndex > 0) {
      weight -= matchIndex - lastMatchIndex;
    }

    return weight;
  }

  var Item = (function () {
    function Item(name, index) {
      _classCallCheck(this, Item);

      this.name = name;
      this.mainIndex = index;
    }

    _createClass(Item, [{
      key: 'calcMatch',
      value: function calcMatch(query) {
        var _this = this;

        if (query.length > this.name.length) {
          return false;
        }

        var matchIndexArr = [];
        var ql = query.length;
        var nl = this.name.length;
        var lowerTestName = this.name.toLowerCase();

        var searchIndex = 0;

        for (var i = 0; i < ql; i++) {
          var currentChar = query[i];

          if (searchIndex >= nl) return false;

          searchIndex = lowerTestName.indexOf(currentChar, searchIndex);

          if (searchIndex === -1) {
            return false;
          }

          matchIndexArr.push(searchIndex++);
        }

        var substringSize = 1;

        var weight = matchIndexArr.reduce(function (w, matchIndex, index, arr) {
          var tempWeight = w;

          if (arr[index - 1] === matchIndex - 1) {
            substringSize++;
          } else {
            substringSize = 1;
          }

          tempWeight += calculateWeight(_this.name, substringSize, matchIndex, arr[index - 1]);

          return tempWeight;
        }, 0);

        var lastIndexDiff = nl - matchIndexArr[matchIndexArr.length - 1] - 1;

        weight = weight - Math.round(matchIndexArr[0] * 1.2) - lastIndexDiff;

        return weight > 0 ? weight : 0;
      }
    }]);

    return Item;
  })();

  function sortByWeight(a, b) {
    return b.weight - a.weight;
  }

  var Result = (function (_Array) {
    _inherits(Result, _Array);

    function Result(items) {
      _classCallCheck(this, Result);

      _get(Object.getPrototypeOf(Result.prototype), 'constructor', this).call(this);

      if (!items.length) {
        return false;
      }

      this.meta = items.sort(sortByWeight);
      _get(Object.getPrototypeOf(Result.prototype), 'push', this).apply(this, this.meta.map(function (resultItem) {
        return resultItem.item.name;
      }));
    }

    return Result;
  })(Array);

  var ResultItem = function ResultItem(item, weight) {
    _classCallCheck(this, ResultItem);

    this.item = item;
    this.weight = weight;
  };

  function isArray(item) {
    if (Array.isArray) return Array.isArray(item);
    return (/array/i.test(Object.prototype.toString.call(item))
    );
  }

  var Fuzz = (function (_Array2) {
    _inherits(Fuzz, _Array2);

    function Fuzz(collection, options) {
      _classCallCheck(this, Fuzz);

      _get(Object.getPrototypeOf(Fuzz.prototype), 'constructor', this).call(this);

      if (!isArray(collection)) {
        throw new Error('Argument to Fuzz should be an array');
      }

      this.push.apply(this, collection);
      this.main = this._prepareCollection();
      this.options = Object.assign({
        disableCache: false
      }, options);
      this.cache = new Cache();
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

        return this.map(function (item, i) {
          if (typeof item !== 'string') {
            throw new Error('Argument to Fuzz should be an array of strings');
          }

          return new Item(_this2.parse(item), i);
        });
      }
    }, {
      key: 'match',
      value: function match(string) {
        var query = string.replace(/\s+/g, '').toLowerCase();
        var cached = !this.options.disableCache && this.cache.check(query);

        var searchArray = this.main;

        if (cached) {
          searchArray = this.cache.arr;
        } else {
          this.cache.clean();
        }

        var resultArray = searchArray.reduce(function (arr, item) {
          var searchItem = cached ? item.item : item;

          var weight = searchItem.calcMatch(query);

          if (weight !== false) {
            arr.push(new ResultItem(searchItem, weight));
          }

          return arr;
        }, []);

        this.cache.arr = resultArray;
        this.cache.query = query;

        return new Result(resultArray);
      }
    }, {
      key: 'simpleMatch',
      value: function simpleMatch(string) {
        var queryRegex = new RegExp(string.split('').join('.*?'), 'i');
        return this.filter(function (item) {
          return queryRegex.test(item);
        });
      }
    }], [{
      key: 'match',
      value: function match(string, collection) {
        return new Fuzz(collection, { disableCache: true }).match(string);
      }
    }]);

    return Fuzz;
  })(Array);

  var fuzz = Fuzz;

  return fuzz;
});
//# sourceMappingURL=fuzz.js.map
