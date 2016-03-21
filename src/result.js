function sortByWeight(a, b) {
  return b.weight - a.weight;
}

export default class Result extends Array {
  constructor(items) {
    super();

    if (!items.length) {
      return false;
    }

    this.meta = items.sort(sortByWeight);
    super.push.apply(this, this.meta.map(resultItem => resultItem.item.name));
  }
}
