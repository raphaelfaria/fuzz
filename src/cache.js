export default class Cache {
  construct() {
    this.arr = null;
    this.query = null;
  }

  clean() {
    this.arr = null;
    this.query = null;
  }

  check(query) {
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
}
