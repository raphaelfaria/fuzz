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
      expect(item.weight).to.be.equal(0);
    });

    it('sould detail properly', () => {
      expect(item._detailedArray[0].index).to.be.equal(0);
      expect(item._detailedArray[0].char).to.be.equal('S');
      expect(item._detailedArray[0].beginSection).to.be.true;
      expect(item._detailedArray[0].weight).to.be.equal(0);
    });
  });

  describe('Item matching', () => {
    beforeEach(() => {
      item = new Item(name, 0);
    });

    it('should match properly', () => {
      expect(item.calcMatch('s')).to.be.true;
      expect(item._matched).to.be.ok;
      expect(item._matched[0]).to.be.equal(0);
    });

    it('should calculate the weight properly', () => {
      item.calcMatch('s');
      expect(item.weight).to.be.equal(75);
    });

    it('matches should be empty if there is no match', () => {
      item.calcMatch('y');
      expect(item.match).to.be.empty;
    });
  });
});
