import WriteStream from '../../src-ts/Streams/WriteStream';
import RWStream from '../../src-ts/Streams/RWStream';
import constants, { DATA_TYPE, ENDIAN } from '../../src-ts/constants';

describe('Constructor', () => {
  it('should create a WriteStream', () => {
    const writeStream = new WriteStream();

    expect(writeStream).toBeTruthy();
    expect(writeStream instanceof WriteStream).toBeTruthy();
    expect(writeStream instanceof RWStream).toBeTruthy();
    expect(writeStream.rawBuffer instanceof Buffer).toBeTruthy();
    expect(writeStream.rawBuffer.length).toBe(constants.DEFAULT_BUFFER_SIZE);
    expect(writeStream.offset).toBe(0);
    expect(writeStream.contentSize).toBe(0);
    expect(writeStream.endian).toBe(ENDIAN.BIG);
  });
});

describe('increment', () => {
  it('should increment the size when past the current size', () => {
    const writeStream = new WriteStream();

    writeStream.increment(4);
    expect(writeStream.offset).toBe(4);
    expect(writeStream.contentSize).toBe(4);
  });

  it('should decrement the current offset when a negative is passed', () => {
    const writeStream = new WriteStream();

    writeStream.increment(4);
    writeStream.increment(-2);
    expect(writeStream.offset).toBe(2);
    expect(writeStream.contentSize).toBe(4);
  });

  it('should not change anything when 0 is passed in', () => {
    const writeStream = new WriteStream();

    writeStream.increment(0);
    expect(writeStream.offset).toBe(0);
    expect(writeStream.contentSize).toBe(0);
  });

  it('should increment the current offset, but not alter the current size when incrementing less than the current size', () => {
    const writeStream = new WriteStream();

    writeStream.increment(4);
    writeStream.increment(-4);
    writeStream.increment(2);
    expect(writeStream.offset).toBe(2);
    expect(writeStream.contentSize).toBe(4);
  });

  it('should error when incrementing past the length of the rawBuffer', () => {
    const writeStream = new WriteStream();

    expect(() => {
      writeStream.increment(constants.DEFAULT_BUFFER_SIZE + 2);
    }).toThrowError();
  });
});

describe('writeToBuffer', () => {
  describe('general errors', () => {
    it('should error when given data does not match type', () => {
      const value = constants.MIN_DATA_VALUE.UINT8 - 1;
      const type = DATA_TYPE.UINT8;
      const writeStream = new WriteStream();

      expect(() => {
        writeStream.writeToBuffer(type, value);
      }).toThrowError();
    });

    it('should error if the given type is not implemented', () => {
      const value = 1;
      const type = DATA_TYPE.ASCII;
      const writeStream = new WriteStream();

      expect(() => {
        writeStream.writeToBuffer(type, value);
      }).toThrowError();
    });
  });

  describe('big endian', () => {
    it('should write the given uint8 data to the big endian stream', () => {
      const value = constants.MAX_DATA_VALUE.UINT8;
      const type = DATA_TYPE.UINT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given 0 uint8 data to the big endian stream', () => {
      const value = constants.MIN_DATA_VALUE.UINT8;
      const type = DATA_TYPE.UINT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given uint16 data to the big endian stream', () => {
      const value = constants.MAX_DATA_VALUE.UINT16;
      const type = DATA_TYPE.UINT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
    });

    it('should write the given 0 uint16 data to the big endian stream', () => {
      const value = constants.MIN_DATA_VALUE.UINT16;
      const type = DATA_TYPE.UINT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given uint32 data to the big endian stream', () => {
      const value = constants.MAX_DATA_VALUE.UINT32;
      const type = DATA_TYPE.UINT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
    });

    it('should write the given 0 uint32 data to the big endian stream', () => {
      const value = constants.MIN_DATA_VALUE.UINT32;
      const type = DATA_TYPE.UINT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given int8 data to the big endian stream', () => {
      const value = constants.MAX_DATA_VALUE.INT8;
      const type = DATA_TYPE.INT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given min int8 data to the big endian stream', () => {
      const value = constants.MIN_DATA_VALUE.INT8;
      const type = DATA_TYPE.INT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(256 + value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given int16 data to the big endian stream', () => {
      const value = constants.MAX_DATA_VALUE.INT16;
      const type = DATA_TYPE.INT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(255);
    });

    it('should write the given min int16 data to the big endian stream', () => {
      const value = constants.MIN_DATA_VALUE.INT16;
      const type = DATA_TYPE.INT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given int32 data to the big endian stream', () => {
      const value = constants.MAX_DATA_VALUE.INT32;
      const type = DATA_TYPE.INT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
    });

    it('should write the given min int32 data to the big endian stream', () => {
      const value = constants.MIN_DATA_VALUE.INT32;
      const type = DATA_TYPE.INT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given float data to the big endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.FLOAT.MAX;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
    });

    it('should write the given min float data to the big endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.FLOAT.MIN;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given negative float data to the big endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.FLOAT.MAX;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
    });

    it('should write the given negative min float data to the big endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.FLOAT.MIN;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given 0 float data to the big endian stream', () => {
      const value = 0;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given double data to the big endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.DOUBLE.MAX;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(239);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
      expect(writeStream.rawBuffer[4]).toBe(255);
      expect(writeStream.rawBuffer[5]).toBe(255);
      expect(writeStream.rawBuffer[6]).toBe(255);
      expect(writeStream.rawBuffer[7]).toBe(255);
    });

    it('should write the given min double data to the big endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.DOUBLE.MIN;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
      expect(writeStream.rawBuffer[4]).toBe(0);
      expect(writeStream.rawBuffer[5]).toBe(0);
      expect(writeStream.rawBuffer[6]).toBe(0);
      expect(writeStream.rawBuffer[7]).toBe(1);
    });

    it('should write the given negative double data to the big endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.DOUBLE.MAX;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(239);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
      expect(writeStream.rawBuffer[4]).toBe(255);
      expect(writeStream.rawBuffer[5]).toBe(255);
      expect(writeStream.rawBuffer[6]).toBe(255);
      expect(writeStream.rawBuffer[7]).toBe(255);
    });

    it('should write the given negative min double data to the big endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.DOUBLE.MIN;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
      expect(writeStream.rawBuffer[4]).toBe(0);
      expect(writeStream.rawBuffer[5]).toBe(0);
      expect(writeStream.rawBuffer[6]).toBe(0);
      expect(writeStream.rawBuffer[7]).toBe(1);
    });

    it('should write the given min double data to the big endian stream', () => {
      const value = 0;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
      expect(writeStream.rawBuffer[4]).toBe(0);
      expect(writeStream.rawBuffer[5]).toBe(0);
      expect(writeStream.rawBuffer[6]).toBe(0);
      expect(writeStream.rawBuffer[7]).toBe(0);
    });
  });

  describe('little endian', () => {
    it('should write the given uint8 data to the little endian stream', () => {
      const value = constants.MAX_DATA_VALUE.UINT8;
      const type = DATA_TYPE.UINT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given 0 uint8 data to the little endian stream', () => {
      const value = constants.MIN_DATA_VALUE.UINT8;
      const type = DATA_TYPE.UINT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given uint16 data to the little endian stream', () => {
      const value = constants.MAX_DATA_VALUE.UINT16;
      const type = DATA_TYPE.UINT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
    });

    it('should write the given 0 uint16 data to the little endian stream', () => {
      const value = constants.MIN_DATA_VALUE.UINT16;
      const type = DATA_TYPE.UINT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given uint32 data to the little endian stream', () => {
      const value = constants.MAX_DATA_VALUE.UINT32;
      const type = DATA_TYPE.UINT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
    });

    it('should write the given 0 uint32 data to the little endian stream', () => {
      const value = constants.MIN_DATA_VALUE.UINT32;
      const type = DATA_TYPE.UINT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given int8 data to the little endian stream', () => {
      const value = constants.MAX_DATA_VALUE.INT8;
      const type = DATA_TYPE.INT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given min int8 data to the little endian stream', () => {
      const value = constants.MIN_DATA_VALUE.INT8;
      const type = DATA_TYPE.INT8;
      const length = 1;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(256 + value);
      expect(writeStream.rawBuffer[1]).toBe(0);
    });

    it('should write the given int16 data to the little endian stream', () => {
      const value = constants.MAX_DATA_VALUE.INT16;
      const type = DATA_TYPE.INT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(constants.MAX_DATA_VALUE.INT8);
    });

    it('should write the given min int16 data to the little endian stream', () => {
      const value = constants.MIN_DATA_VALUE.INT16;
      const type = DATA_TYPE.INT16;
      const length = 2;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
    });

    it('should write the given int32 data to the little endian stream', () => {
      const value = constants.MAX_DATA_VALUE.INT32;
      const type = DATA_TYPE.INT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(constants.MAX_DATA_VALUE.INT8);
    });

    it('should write the given min int32 data to the little endian stream', () => {
      const value = constants.MIN_DATA_VALUE.INT32;
      const type = DATA_TYPE.INT32;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
    });

    it('should write the given float data to the little endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.FLOAT.MAX;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[3]).toBe(constants.MAX_DATA_VALUE.INT8);
    });

    it('should write the given min float data to the little endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.FLOAT.MIN;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given negative float data to the little endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.FLOAT.MAX;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(constants.MAX_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[3]).toBe(255);
    });

    it('should write the given negative min float data to the little endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.FLOAT.MIN;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
      expect(writeStream.rawBuffer[3]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
    });

    it('should write the given 0 float data to the little endian stream', () => {
      const value = 0;
      const type = DATA_TYPE.FLOAT;
      const length = 4;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
    });

    it('should write the given double data to the little endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.DOUBLE.MAX;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
      expect(writeStream.rawBuffer[4]).toBe(255);
      expect(writeStream.rawBuffer[5]).toBe(255);
      expect(writeStream.rawBuffer[6]).toBe(239);
      expect(writeStream.rawBuffer[7]).toBe(constants.MAX_DATA_VALUE.INT8);
    });

    it('should write the given min double data to the little endian stream', () => {
      const value = constants.PRECISION_DATA_VALUE.DOUBLE.MIN;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(1);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
      expect(writeStream.rawBuffer[4]).toBe(0);
      expect(writeStream.rawBuffer[5]).toBe(0);
      expect(writeStream.rawBuffer[6]).toBe(0);
      expect(writeStream.rawBuffer[7]).toBe(0);
    });

    it('should write the given negative double data to the little endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.DOUBLE.MAX;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(255);
      expect(writeStream.rawBuffer[1]).toBe(255);
      expect(writeStream.rawBuffer[2]).toBe(255);
      expect(writeStream.rawBuffer[3]).toBe(255);
      expect(writeStream.rawBuffer[4]).toBe(255);
      expect(writeStream.rawBuffer[5]).toBe(255);
      expect(writeStream.rawBuffer[6]).toBe(239);
      expect(writeStream.rawBuffer[7]).toBe(255);
    });

    it('should write the given negative min double data to the little endian stream', () => {
      const value = -constants.PRECISION_DATA_VALUE.DOUBLE.MIN;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(1);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
      expect(writeStream.rawBuffer[4]).toBe(0);
      expect(writeStream.rawBuffer[5]).toBe(0);
      expect(writeStream.rawBuffer[6]).toBe(0);
      expect(writeStream.rawBuffer[7]).toBe(256 + constants.MIN_DATA_VALUE.INT8);
    });

    it('should write the given 0 double data to the little endian stream', () => {
      const value = 0;
      const type = DATA_TYPE.DOUBLE;
      const length = 8;
      const writeStream = new WriteStream();

      writeStream.setEndian(ENDIAN.LITTLE);

      writeStream.writeToBuffer(type, value);

      expect(writeStream.offset).toBe(length);
      expect(writeStream.contentSize).toBe(length);
      expect(writeStream.rawBuffer[0]).toBe(0);
      expect(writeStream.rawBuffer[1]).toBe(0);
      expect(writeStream.rawBuffer[2]).toBe(0);
      expect(writeStream.rawBuffer[3]).toBe(0);
      expect(writeStream.rawBuffer[4]).toBe(0);
      expect(writeStream.rawBuffer[5]).toBe(0);
      expect(writeStream.rawBuffer[6]).toBe(0);
      expect(writeStream.rawBuffer[7]).toBe(0);
    });
  });

  it('should allocate more space to the rawBuffer', () => {
    const value = 1;
    const type = DATA_TYPE.UINT8;
    const writeStream = new WriteStream();

    for (let i = 0; i < constants.DEFAULT_BUFFER_SIZE; i++) {
      writeStream.writeToBuffer(type, value);
    }
    expect(writeStream.offset).toBe(constants.DEFAULT_BUFFER_SIZE);
    expect(writeStream.contentSize).toBe(constants.DEFAULT_BUFFER_SIZE);
    expect(writeStream.rawBuffer.length).toBe(constants.DEFAULT_BUFFER_SIZE);

    writeStream.writeToBuffer(type, value);

    expect(writeStream.offset).toBe(constants.DEFAULT_BUFFER_SIZE + 1);
    expect(writeStream.contentSize).toBe(constants.DEFAULT_BUFFER_SIZE + 1);
    expect(writeStream.rawBuffer.length).toBeGreaterThan(constants.DEFAULT_BUFFER_SIZE);
  });

  it.skip('should handle out of memory issues', () => {
    expect(false).toBeTruthy();
  });
});

describe('size', () => {
  it('should return 0 size', () => {
    const writeStream = new WriteStream();

    const size = writeStream.size();

    expect(size).toBe(0);
  });

  it('should return changed size', () => {
    const writeStream = new WriteStream();

    writeStream.writeToBuffer(DATA_TYPE.UINT8, 1);

    const size = writeStream.size();

    expect(size).toBe(1);
  });
});
