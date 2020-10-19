import BufferField from '../../src-ts/Fields/BufferField';
import { DATA_TYPE } from '../../src-ts/constants';

describe('BufferField', () => {
  it('should create a BufferField', () => {
    const buf = Buffer.from('string');
    const start = 0;
    const length = buf.length;
    const bufferField = new BufferField(buf, start, length);

    expect(bufferField).toBeTruthy();
    expect(bufferField.type).toBe(DATA_TYPE.BUFFER);
    expect(bufferField.value).toBe(buf);
    expect(bufferField.bufferStart).toBe(start);
    expect(bufferField.bufferLength).toBe(length);
  });

  it('should return length', () => {
    const buf = Buffer.from('string');
    const start = 0;
    const length = buf.length;
    const bufferField = new BufferField(buf, start, length);

    expect(bufferField).toBeTruthy();
    expect(bufferField.length()).toBe(length);
  });
});
