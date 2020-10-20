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

describe('isOfNumericType', () => {
  it('should check that a number is of type uint8, max', () => {
    const value = constants.MAX_DATA_VALUE.UINT8;
    const type = DATA_TYPE.UINT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type uint8, min', () => {
    const value = constants.MIN_DATA_VALUE.UINT8;
    const type = DATA_TYPE.UINT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type uint8, over max', () => {
    const value = constants.MAX_DATA_VALUE.UINT8 + 1;
    const type = DATA_TYPE.UINT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type uint8, under min', () => {
    const value = constants.MIN_DATA_VALUE.UINT8 - 1;
    const type = DATA_TYPE.UINT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is of type uint16, max', () => {
    const value = constants.MAX_DATA_VALUE.UINT16;
    const type = DATA_TYPE.UINT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type uint16, min', () => {
    const value = constants.MIN_DATA_VALUE.UINT16;
    const type = DATA_TYPE.UINT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type uint16, over max', () => {
    const value = constants.MAX_DATA_VALUE.UINT16 + 1;
    const type = DATA_TYPE.UINT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type uint16, under min', () => {
    const value = constants.MIN_DATA_VALUE.UINT16 - 1;
    const type = DATA_TYPE.UINT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is of type uint32, max', () => {
    const value = constants.MAX_DATA_VALUE.UINT32;
    const type = DATA_TYPE.UINT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type uint32, min', () => {
    const value = constants.MIN_DATA_VALUE.UINT32;
    const type = DATA_TYPE.UINT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type uint32, over max', () => {
    const value = constants.MAX_DATA_VALUE.UINT32 + 1;
    const type = DATA_TYPE.UINT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type uint32, under min', () => {
    const value = constants.MIN_DATA_VALUE.UINT32 - 1;
    const type = DATA_TYPE.UINT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });

  it('should check that a number is of type int8, max', () => {
    const value = constants.MAX_DATA_VALUE.INT8;
    const type = DATA_TYPE.INT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type int8, min', () => {
    const value = constants.MIN_DATA_VALUE.INT8;
    const type = DATA_TYPE.INT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type int8, over max', () => {
    const value = constants.MAX_DATA_VALUE.INT8 + 1;
    const type = DATA_TYPE.INT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type int8, under min', () => {
    const value = constants.MIN_DATA_VALUE.INT8 - 1;
    const type = DATA_TYPE.INT8;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is of type int16, max', () => {
    const value = constants.MAX_DATA_VALUE.INT16;
    const type = DATA_TYPE.INT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type int16, min', () => {
    const value = constants.MIN_DATA_VALUE.INT16;
    const type = DATA_TYPE.INT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type int16, over max', () => {
    const value = constants.MAX_DATA_VALUE.INT16 + 1;
    const type = DATA_TYPE.INT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type int16, under min', () => {
    const value = constants.MIN_DATA_VALUE.INT16 - 1;
    const type = DATA_TYPE.INT16;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is of type int32, max', () => {
    const value = constants.MAX_DATA_VALUE.INT32;
    const type = DATA_TYPE.INT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type int32, min', () => {
    const value = constants.MIN_DATA_VALUE.INT32;
    const type = DATA_TYPE.INT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type int32, over max', () => {
    const value = constants.MAX_DATA_VALUE.INT32 + 1;
    const type = DATA_TYPE.INT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type int32, under min', () => {
    const value = constants.MIN_DATA_VALUE.INT32 - 1;
    const type = DATA_TYPE.INT32;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });

  it('should check that a number is of type float, max', () => {
    const value = constants.PRECISION_DATA_VALUE.FLOAT.MAX;
    const type = DATA_TYPE.FLOAT;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type float, min', () => {
    const value = constants.PRECISION_DATA_VALUE.FLOAT.MIN;
    const type = DATA_TYPE.FLOAT;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type float, over max', () => {
    const value = constants.PRECISION_DATA_VALUE.FLOAT.MAX * 10; // minimum precision registered by float
    const type = DATA_TYPE.FLOAT;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is not of type float, under min', () => {
    const value = constants.PRECISION_DATA_VALUE.FLOAT.MIN / 10; // minimum precision registered by float
    const type = DATA_TYPE.FLOAT;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(false);
  });
  it('should check that a number is of type double, max', () => {
    const value = constants.PRECISION_DATA_VALUE.DOUBLE.MAX;
    const type = DATA_TYPE.DOUBLE;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is of type double, min', () => {
    const value = constants.PRECISION_DATA_VALUE.DOUBLE.MIN;
    const type = DATA_TYPE.DOUBLE;
    const isOfType = helpers.isOfNumberType(type, value);

    expect(isOfType).toBe(true);
  });
  it('should check that a number is not of type double, over max', () => {
    const value = constants.PRECISION_DATA_VALUE.DOUBLE.MAX * 10; // minimum precision registered by double
    const type = DATA_TYPE.DOUBLE;
    const isOfType = helpers.isOfNumberType(type, value); // value is now infinity because javascript can't handle the boundary

    expect(isOfType).toBe(false);
  });
  it.skip('should check that a number is not of type double, under min', () => {
    const value = constants.PRECISION_DATA_VALUE.DOUBLE.MIN / 10; // minimum precision registered by double
    const type = DATA_TYPE.DOUBLE;
    const isOfType = helpers.isOfNumberType(type, value); // value is now 0 because javascript can't handle the boundary

    expect(isOfType).toBe(false);
  });
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
