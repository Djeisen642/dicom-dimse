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

  it('should error when given the negative uint8 data to the big endian stream', () => {
    const value = -1;
    const type = DATA_TYPE.UINT8;
    const writeStream = new WriteStream();

    expect(() => {
      writeStream.writeToBuffer(type, value);
    }).toThrowError();
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

  it('should write the given buffer to the stream, uint32, BE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, int8, BE', () => {
    const value = constants.MAX_DATA_VALUE.INT8;
    const type = DATA_TYPE.INT8;
    const length = 1;
    const writeStream = new WriteStream();

    writeStream.writeToBuffer(type, value);
    expect(writeStream.offset).toBe(length);
    expect(writeStream.contentSize).toBe(length);
    expect(writeStream.rawBuffer[0]).toBe(value);
  });

  it('should write the given buffer to the stream, -int8, BE', () => {
    const value = constants.MIN_DATA_VALUE.INT8;
    const type = DATA_TYPE.INT8;
    const writeStream = new WriteStream();

    writeStream.writeToBuffer(type, value);
    expect(writeStream.offset).toBe(1);
    expect(writeStream.contentSize).toBe(1);
    expect(writeStream.rawBuffer[0]).toBe(Math.pow(2, 8) + value);
  });

  it('should write the given buffer to the stream, int16, BE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, int32, BE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, float, BE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, double, BE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, uint8, BE', () => {
    const value = 255;
    const type = DATA_TYPE.UINT8;
    const writeStream = new WriteStream();

    writeStream.writeToBuffer(type, value);
    expect(writeStream.offset).toBe(1);
    expect(writeStream.contentSize).toBe(1);
    expect(writeStream.rawBuffer[0]).toBe(value);
  });

  it('should write the given buffer to the stream, uint16, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, uint32, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, int8, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, int16, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, int32, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, float, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should write the given buffer to the stream, double, LE', () => {
    expect(false).toBeTruthy();
  });

  it('should error if the given type is not implemented', () => {
    expect(false).toBeTruthy();
  });

  it('should allocate more space to the rawBuffer', () => {
    expect(false).toBeTruthy();
  });

  it.skip('should handle out of memory issues', () => {
    expect(false).toBeTruthy();
  });
});

