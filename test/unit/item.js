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

    it('sould detail properly', () => {
      expect(item._detailedArray[0].index).to.be.equal(0);
      expect(item._detailedArray[0].char).to.be.equal('S');
      expect(item._detailedArray[0].beginSection).to.be.true;
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
