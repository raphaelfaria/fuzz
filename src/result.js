class Result extends Array {
  constructor(items) {
    super();

    if (items.length) {
      this.meta = [];
      this.push.apply(this, items);
    }
  }

  push(...items) {
    super.push.apply(this.meta, items);
    return super.push.apply(this, items.map(item => item.name));
  }
}

export default Result;
