import Item from './item';

class Fuzz extends Array {
  constructor(collection, options = {}) {
    super();
    this.main = collection;
    this.push.apply(this, this._prepareCollection());
  }

  parse(item) {
    return item;
  }

  _prepareCollection() {
    return this.main.map((item, i) => {
      return new Item(this.parse(item), i);
    });
  }

  match(string) {
    let query = string.replace(/\s+/g, '').toLowerCase();
    let results = this.filter(item => item.calcMatch(query));

    return results.sort((a, b) => {
      if (a.weight > b.weight) {
        return -1;
      }

      if (a.weight < b.weight) {
        return 1;
      }

      return 0;
    });
  }
}

export default Fuzz;
