import Item from '../../src/item';

describe('Item', () => {
  let item;

  const name = 'String';

  describe('constructor', () => {
    beforeEach(() => {
      item = new Item(name, 0);
    });

    it('should construct properly', () => {
      expect(item.name).to.be.equal(name);
      expect(item.mainIndex).to.be.equal(0);
    });
  });

  describe('matching', () => {
    beforeEach(() => {
      item = new Item(name, 0);
    });

    it('should match and calculate the weight properly', () => {
      expect(item.calcMatch('s')).to.be.equal(75);
    });

    it('matches should be empty if there is no match', () => {
      expect(item.calcMatch('y')).not.to.be.ok;
    });
  });
});
