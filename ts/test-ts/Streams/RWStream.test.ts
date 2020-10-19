import RWStream from '../../src-ts/Streams/RWStream';
import { ENDIAN } from '../../src-ts/constants';

describe('Constructor', () => {
  it('should create an RWStream with a default endianness', () => {
    const rwStream = new RWStream();

    expect(rwStream).toBeTruthy();
  });
});

describe('setEndian', () => {
  it('should set endianness, BIG', () => {
    const rwStream = new RWStream();
    const endian = ENDIAN.BIG;

    rwStream.setEndian(endian);
    expect(rwStream.endian).toBe(endian);
  });

  it('should set endianness, LITTLE', () => {
    const rwStream = new RWStream();
    const endian = ENDIAN.LITTLE;

    rwStream.setEndian(endian);
    expect(rwStream.endian).toBe(endian);
  });

  it('should error when an invalid endianness is entered', () => {
    const rwStream = new RWStream();
    const endian = 5;

    expect(() => {
      rwStream.setEndian(endian);
    }).toThrowError();
  });
});
