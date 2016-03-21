import Fuzz from '../../src/fuzz';
import Result from '../../src/result';

describe('Result', () => {
  describe('sorting', () => {
    const fuzz = new Fuzz(['string', 'construction']);
    const match = fuzz.match('str');

    expect(match).to.be.instanceof(Result);
    expect(match.meta[0].weight).to.be.above(match.meta[1].weight);
  });
});
