import Item from './item';
import Result from './result';

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
    this.push.apply(this, collection);
    this.main = this._prepareCollection();

  }

  parse(item) {
    return item;
  }

  _prepareCollection() {
    return this.map((item, i) => {
      return new Item(this.parse(item), i);
    });
  }

  match(string) {
    let query = string.replace(/\s+/g, '').toLowerCase();
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
