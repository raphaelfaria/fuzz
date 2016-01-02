function sortByWeight(a, b) {
  if (a.weight > b.weight) return -1;
  if (a.weight < b.weight) return 1;
  return 0;
}

class Result extends Array {
  constructor(items) {
    super();

    if (items.length) {
      this.meta = items.sort(sortByWeight);
      super.push.apply(this, this.meta.map(item => item.name));
    }
  }
}

export default Result;
