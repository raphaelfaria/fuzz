(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var oldFuzz = window.Fuzz;
        var api = window.Fuzz = factory();
        api.noConflict = function () {
            window.Fuzz = oldFuzz;
            return api;
        };
    }
}(function () {
    // Internal functions

    var prepareCollection = function (collection) {
        var _this = this;
        var newCollection = [];
        var l = collection.length;

        for (var i = 0; i < l; i++) {
            newCollection.push(new Item(collection[i], i));
        }

        return newCollection;
    };

    var indexIsSectionStart = function (string, index) {
        return  index === 0 ||
                (string[index].toUpperCase() === string[index] &&
                    (index === 1 ||
                     string[index - 1].toUpperCase() !== string[index - 1]));
    };

    var prepareItem = function (nameArray) {
        var detailedItem = [];
        var detailedChar;
        var l = nameArray.length;
        for (var i = 0; i < l; i++) {
            detailedChar = {
                index: i,
                c: nameArray[i],
                beginSection: indexIsSectionStart(nameArray, i),
                w: 0
            };

            detailedItem.push(detailedChar);
        }

        return detailedItem;
    };


    // Main obj
    var Fuzz = function (collection, options) {
        options || (options = {});

        this.main = collection;
        this.collection = prepareCollection.call(this, this.main);

        return this;
    };

    Fuzz.prototype.match = function (string) {
        var input = string;
        var query = input.replace(/\s+/g, '').toLowerCase();

        var l = this.collection.length;
        var results = [];

        for (var i = 0; i < l; i++) {
            var match = this.collection[i].match(query);

            if (match) results.push(this.collection[i]);
        }

        return results;
    };


    // Item obj
    var Item = function(name, index) {
        this.name = this.parse(name);
        this.nameArray = this.name.split('');
        this.detailed = prepareItem(this.nameArray);

        return this;
    };

    Item.prototype.parse = function(item) {
        return item;
    };

    Item.prototype.clearWeight = function () {
        var l = this.detailed.length;
        for (var i = 0; i < l; i++) {
            this.detailed[i].w = 0;
        }
    };

    Item.prototype.match = function (string) {
        var matchIndex = [];
        var searchIndex = -1;
        var lookUpper = true;
        var testName = this.name;

        for (var i = 0; i < string.length; i++) {
            var currentChar = string.charAt(i);

            if (lookUpper) {
                testName = this.name;
                currentChar = currentChar.toUpperCase();
            }

            if (!lookUpper) testName = testName.toLowerCase();

            if (searchIndex >= this.name.length) return false;

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
                    searchIndex = matchIndex[matchIndex.length -1] || -1;
                }

                lookUpper = !lookUpper;
            }
        }

        this.matched = matchIndex.length ? matchIndex : false;

        return !!(this.matched.length);
    };

    return Fuzz;
}));