import Item from '../../src/item';
import ResultItem from '../../src/result-item';

describe('ResultItem', () => {
  describe('constructor', () => {
    it('should construct properly', () => {
      const item = new Item('string', 0);
      const resultItem = new ResultItem(item, 100);

      expect(resultItem).to.be.ok;
      expect(resultItem.item).to.be.equal(item);
      expect(resultItem.weight).to.be.equal(100);
    });
  });
});
