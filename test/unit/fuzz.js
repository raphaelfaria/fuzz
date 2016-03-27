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
    const items = require('./big-items-list.json');

    it('should return an array of ResultItem', () => {
      const fuzzInstance = new Fuzz(itemsStr);
      const match = fuzzInstance.match('s');

      expect(match).to.be.instanceof(Array);
      expect(match.length).to.be.equal(3);
      expect(match.meta[0]).to.be.instanceof(ResultItem);
    });

    it('should give the same result if used with cached results', () => {
      const fuzz1 = new Fuzz(items);
      const fuzz2 = new Fuzz(items, { disableCache: true });

      const result1 = fuzz1.match('ab');
      const result2 = fuzz2.match('ab');
      const result3 = Fuzz.match('ab', items);

      expect(result1).to.be.deep.equal(result2);
      expect(result2).to.be.deep.equal(result3);
    });

    it('should match all items in a diverse array', () => {
      const diverseArray = require('./diverse-array.json');
      const fuzz = new Fuzz(diverseArray);
      const match = fuzz.match('test');
      const matchArr = match.slice(0);

      expect(match.length).to.be.equal(diverseArray.length);
      expect(matchArr.sort()).to.be.deep.equal(diverseArray.sort());
    });

    it('should give higher weight exact substrings matches', () => {
      const items1 = [
        'Core',
        'ExtentionCore',
        'Controller',
      ];

      const match1 = Fuzz.match('core', items1);

      expect(match1.slice(0)).to.be.deep.equal(items1);
    });
  });
});
