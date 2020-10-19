import Field from './Field';
import { DATA_TYPE } from '../constants';

export default class BufferField extends Field <Buffer> {
  readonly bufferLength: number;
  readonly bufferStart: number;

  /**
   * Class Constructor
   * @param buffer - the buffer
   * @param start - the starting offset of the buffer
   * @param length - Length of the buffer
   */
  constructor (buffer: Buffer, start: number, length: number) {
    super(DATA_TYPE.BUFFER, buffer);
    this.bufferLength = length;
    this.bufferStart = start;
  }

  length (): number {
    return this.bufferLength;
  }
}
