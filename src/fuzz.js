import Item from './item';
import Result from './result';

function isArray(item) {
  return item.constructor === Array ||
    item instanceof Array ||
    Array.isArray && Array.isArray(item) && item !== Array.prototype ||
    /array/i.test(Object.prototype.toString.call(item));
}

class Fuzz extends Array {
  constructor(collection) {
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
    const resultArray = this.main
      .filter(item => item.calcMatch(query));

    return new Result(resultArray);
  }

  static match(string, collection) {
    return (new Fuzz(collection)).match(string);
  }
}

export default Fuzz;
