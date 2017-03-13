import { ReversePipe } from './reverse.pipe'

describe('ReversePipe', () => {

  let pipe;

  beforeEach(() => {
    pipe = new ReversePipe();
  });

  it('should reverse the order of an array', () => {
    let theList = [{id:1},{id:2},{id:3}];
    let result = pipe.transform(theList);
    expect(result).toEqual([{id:3},{id:2},{id:1}]);
  });

  it('should return null if non array object is supplied', () => {
    expect(pipe.transform(null)).toBeNull();
  });

});
