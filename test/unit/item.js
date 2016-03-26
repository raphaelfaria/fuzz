import Item from '../../src/item';

describe('Item', () => {
  describe('constructor', () => {
    it('should construct properly', () => {
      const item = new Item('String', 0);

      expect(item.name).to.be.equal('String');
      expect(item.mainIndex).to.be.equal(0);
    });
  });

  describe('matching', () => {
    it('should match and calculate the weight properly', () => {
      const item = new Item('String', 0);

      expect(item.calcMatch('s')).to.be.ok;
    });

    it('matches should be empty if there is no match', () => {
      const item = new Item('String', 0);

      expect(item.calcMatch('y')).not.to.be.ok;
    });

    it('should match a string that have section starts after non section starts', () => {
      const item1 = new Item('ateSt', 0);
      const item2 = new Item('ateStT', 0);

      const calcMatch1 = item1.calcMatch('test');
      const calcMatch2 = item2.calcMatch('test');

      expect(calcMatch1).to.be.ok;
      expect(calcMatch2).to.be.ok;

      expect(calcMatch1).to.be.above(calcMatch2);
    });

    it('should not match if a string if the first query match is the last on the string', () => {
      const item = new Item('ab', 0);

      expect(item.calcMatch('bc')).to.not.be.ok;
    });
  });
});
