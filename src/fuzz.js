import Item from './item';
import Result from './result';

function isArray(item) {
  if (Array.isArray) return Array.isArray(item);
  return /array/i.test(Object.prototype.toString.call(item));
}

function sortByWeight(a, b) {
  if (a.weight > b.weight) {
    return -1;
  }

  if (a.weight < b.weight) {
    return 1;
  }

  return 0;
}

class Fuzz extends Array {
  constructor(collection, options = {}) {
    super();

    if (!isArray(collection)) throw new Error('Collection should be an array');

    this.push.apply(this, collection);
    this.main = this._prepareCollection();
  }

  parse(item) {
    return item;
  }

  _prepareCollection() {
    return this.map((item, i) => {
      if (typeof item !== 'string') throw new Error('Items should be strings');
      return new Item(this.parse(item), i);
    });
  }

  match(string) {
    const query = string.replace(/\s+/g, '').toLowerCase();

    let resultArray = this.main
      .filter(item => item.calcMatch(query))
      .sort(sortByWeight);

    return new Result(resultArray);
  }
}

Fuzz.match = function(string, collection) {
  var fuzz = new Fuzz(collection);
  return fuzz.match(string);
};

export default Fuzz;
