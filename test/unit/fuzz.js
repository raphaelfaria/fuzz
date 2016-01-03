import Fuzz from '../../src/fuzz';
import Item from '../../src/item';
import Result from '../../src/result';

describe('Fuzz', () => {
  const itemsStr = ['string', 'String', 'match', 'something'];

  const itemsNum = [1, 2, 3];

  describe('constructor', () => {
    // beforeEach(() => {
    //   fuzz = new Fuzz()
    // });

    it('should construct properly', () => {
      const fuzzInstance = new Fuzz(itemsStr);

      expect(fuzzInstance).to.be.ok;
      expect(fuzzInstance).to.be.instanceof(Fuzz);
      expect(fuzzInstance[0]).to.be.a('string');
      expect(fuzzInstance.main[0]).to.be.instanceof(Item);
    });

    it('sould throw an error if constructor argument is not array', () => {
      expect(() => new Fuzz(itemsNum)).to.throw(Error);
    });

    it('sould throw an error if array is not of strings', () => {
      expect(() => new Fuzz(itemsNum)).to.throw(Error);
    });
  });

  describe('match', () => {
    it('should return a Result instance', () => {
      const fuzzInstance = new Fuzz(itemsStr);

      expect(fuzzInstance.match('s')).to.be.instanceof(Result);
    });

    it('test quick match', () => {
      expect(Fuzz.match('s', itemsStr)).to.be.instanceof(Result);
    });
  });
});
