import Fuzz from '../../src/fuzz';
import Item from '../../src/item';
import ResultItem from '../../src/result-item';

describe('Fuzz', () => {
  const itemsStr = ['string', 'String', 'match', 'something'];

  // const itemsNum = [1, 2, 3];

  describe('constructor', () => {
    it('should construct properly', () => {
      const fuzzInstance = new Fuzz(itemsStr);

      expect(fuzzInstance).to.be.ok;
      expect(fuzzInstance).to.be.instanceof(Fuzz);
      expect(fuzzInstance[0]).to.be.a('string');
      expect(fuzzInstance.main[0]).to.be.instanceof(Item);
    });

    it('sould throw an error if constructor argument is not array', () => {
      expect(() => new Fuzz('item')).to.throw(Error, 'Argument to Fuzz should be an array');
    });

    it('sould throw an error if array is not of strings', () => {
      expect(() => new Fuzz([1])).to.throw(Error, 'Argument to Fuzz should be an array of strings');
    });
  });

  describe('match', () => {
    it('should return an array of ResultItem', () => {
      const fuzzInstance = new Fuzz(itemsStr);

      expect(fuzzInstance.match('s')).to.be.instanceof(Array);
      expect(fuzzInstance.match('s').meta[0]).to.be.instanceof(ResultItem);
    });
  });
});
