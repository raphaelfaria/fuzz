import Cache from './cache';
import Item from './item';
import Result from './result';
import ResultItem from './result-item';

function isArray(item) {
  if (Array.isArray) return Array.isArray(item);
  return /array/i.test(Object.prototype.toString.call(item));
}

class Fuzz extends Array {
  constructor(collection, options) {
    super();

    if (!isArray(collection)) {
      throw new Error('Argument to Fuzz should be an array');
    }

    this.push.apply(this, collection);
    this.main = this._prepareCollection();
    this.options = Object.assign({
      disableCache: false,
    }, options);
    this.cache = new Cache();
  }

  parse(item) {
    return item;
  }

  _prepareCollection() {
    return this.map((item, i) => {
      if (typeof item !== 'string') {
        throw new Error('Argument to Fuzz should be an array of strings');
      }

      return new Item(this.parse(item), i);
    });
  }

  match(string) {
    const query = string.replace(/\s+/g, '').toLowerCase();
    const cached = !this.options.disableCache && this.cache.check(query);

    let searchArray = this.main;

    if (cached) {
      searchArray = this.cache.arr;
    } else {
      this.cache.clean();
    }

    const resultArray = searchArray.reduce((arr, item) => {
      const searchItem = cached ? item.item : item;

      const weight = searchItem.calcMatch(query);

      if (weight !== false) {
        arr.push(new ResultItem(searchItem, weight));
      }

      return arr;
    }, []);

    this.cache.arr = resultArray;
    this.cache.query = query;

    return new Result(resultArray);
  }

  simpleMatch(string) {
    const queryRegex = new RegExp(string.split('').join('.*?'), 'i');
    return this.filter(item => {
      return queryRegex.test(item);
    });
  }

  static match(string, collection) {
    return (new Fuzz(collection)).match(string);
  }
}

export default Fuzz;
