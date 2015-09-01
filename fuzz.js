(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        var oldFuzz = window.Fuzz;
        var api window.Fuzz = factory();
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
        var length = collection.length;

        for (var i = length; i >= 0; i--) {
            newCollection.push(collection[i]);
        }
    };

    var indexIsSectionStart = function (string, index) {
        return  index === 0 ||
                (string[index].toUpperCase() === string[index] &&
                    (index === 1 ||
                     string[index - 1].toUpperCase() !== string[index - 1]));
    };

    var prepareItem = function(name) {

    }

    // Main obj
    var Fuzz = function (collection) {
        this.main = collection;
        this.collection = prepareCollection.call(this, this.main);

        return this;
    };

    Fuzz.prototype.match = function (string) {
        var input = string;
        var query = input.replace(/\s+/g, '').split('');
    };

    // Item obj
    var Item = function(name) {
        this.name = name;



        return this;
    };
}));