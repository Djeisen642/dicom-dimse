import constants, { DATA_TYPE } from '../src-ts/constants';
import helpers from '../src-ts/helpers';

describe('isString', () => {
  it('should return whether the type of data is a string like type', () => {
    const type = DATA_TYPE.ASCII;
    const isString = helpers.isString(type);

    expect(isString).toBe(true);
  });

  it('should return whether the type of data is not a string like type', () => {
    const type = DATA_TYPE.UINT8;
    const isString = helpers.isString(type);

    expect(isString).toBe(false);
  });
});

describe('isOfDataType', () => {
  // TODO
});

describe('calcLength', () => {
  it('should calculate length of data, hex', () => {
    const type = DATA_TYPE.HEX;
    const value = 'FFAABB';
    const actual = 3;
    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, ascii', () => {
    const type = DATA_TYPE.ASCII;
    const value = 'FFAABB';
    const actual = 6;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, uint8', () => {
    const type = DATA_TYPE.UINT8;
    const value = constants.MAX_DATA_VALUE.UINT8;
    const actual = 1;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, uint16', () => {
    const type = DATA_TYPE.UINT16;
    const value = constants.MAX_DATA_VALUE.UINT16;
    const actual = 2;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, uint32', () => {
    const type = DATA_TYPE.UINT32;
    const value = constants.MAX_DATA_VALUE.UINT32;
    const actual = 4;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, float', () => {
    const type = DATA_TYPE.FLOAT;
    const value = 2.52;
    const actual = 4;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, double', () => {
    const type = DATA_TYPE.DOUBLE;
    const value = 2.52; // TODO figure this out

    const actual = 8;
    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, int8', () => {
    const type = DATA_TYPE.INT8;
    const value = constants.MAX_DATA_VALUE.INT8;
    const actual = 1;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, int16', () => {
    const type = DATA_TYPE.INT16;
    const value = constants.MAX_DATA_VALUE.INT16;
    const actual = 2;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should calculate length of data, int32', () => {
    const type = DATA_TYPE.INT32;
    const value = constants.MAX_DATA_VALUE.INT32;
    const actual = 4;

    const length = helpers.calcLength(type, value);

    expect(length).toBe(actual);
  });

  it('should return NaN, if other types', () => {
    const type = DATA_TYPE.BUFFER;
    const buf = 'string';

    expect(() => {
      helpers.calcLength(type, buf);
    }).toThrowError();
  });
});


describe('getEncoding', () => {
  it('should return an encoding, HEX', () => {
    const type = DATA_TYPE.HEX;
    const encoding = helpers.getEncoding(type);

    expect(encoding).toBe('hex');
  });

  it('should return an encoding, ASCII', () => {
    const type = DATA_TYPE.ASCII;
    const encoding = helpers.getEncoding(type);

    expect(encoding).toBe('ascii');
  });

  it('should error when given an invalid type', () => {
    const type = DATA_TYPE.DOUBLE;

    expect(() => {
      helpers.getEncoding(type);
    }).toThrowError();
  });
});

describe('getEncoding', () => {
  // TODO
});
