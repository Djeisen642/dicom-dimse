import RWStream from './RWStream';
import constants, { DATA_TYPE, ENDIAN } from '../constants';
import DetailedError from '../DetailedError';
import helpers from '../helpers';

export default class WriteStream extends RWStream {

  /**
   * Buffer that stores data written to stream
   */
  rawBuffer = Buffer.alloc(constants.DEFAULT_BUFFER_SIZE);

  /**
   * Current offset within the buffer
   */
  offset = 0;

  /**
   * Current content size
   */
  contentSize = 0;

  /**
   * Increment the offset
   * Change the content size if the offset is greater than the current content size
   *
   * @param add - amount to add to the current offset
   */
  increment (add:number):void {
    this.offset += add;
    if (this.offset > this.rawBuffer.length) {
      throw new DetailedError('Offset is set greater than rawBuffer length', {
        add,
        offset: this.offset,
        rawBufferLength: this.rawBuffer.length
      });
    }
    if (this.offset > this.contentSize) {
      this.contentSize = this.offset;
    }
  }

  /**
   * Write data to buffer
   *
   * @param type - type of data to write
   * @param value - data to write
   */
  writeToBuffer (type:DATA_TYPE, value:number):void {
    if (!helpers.isOfNumberType(type, value)) {
      throw new DetailedError('Value does not correspond to data type', { type,
        value });
    }
    const length = helpers.calcLength(type, value);

    this.checkSize(length);

    this.getBufferWriteFunction(type)(value, this.offset);

    this.increment(length);
  }

  /**
   * Content size getter
   */
  size ():number {
    return this.contentSize;
  }


  /**
   * Check if current rawBuffer has enough space to write data
   *
   * @param length - length of data that will be written
   */
  private checkSize (length:number) {
    // If we have enough space, continue to write
    if (this.offset + length <= this.rawBuffer.length) {
      return;
    }

    // We need more size, copying old one to new buffer
    const oldLength = this.rawBuffer.length,
      newBuffer = Buffer.alloc(oldLength + length + (oldLength / 2));

    this.rawBuffer.copy(newBuffer, 0, 0, this.contentSize);
    this.rawBuffer = newBuffer;
  }

  /**
   * Given a data type, return the corresponding Buffer write function
   *
   * @param type - Data type for which to find the write function
   */
  private getBufferWriteFunction (type:DATA_TYPE) {
    if (type === DATA_TYPE.UINT8) {
      return this.rawBuffer.writeUInt8.bind(this.rawBuffer);
    }
    if (type === DATA_TYPE.INT8) {
      return this.rawBuffer.writeInt8.bind(this.rawBuffer);
    }
    switch(type) {
    case DATA_TYPE.UINT16 :
      return this.endian === ENDIAN.BIG
        ? this.rawBuffer.writeUInt16BE.bind(this.rawBuffer)
        : this.rawBuffer.writeUInt16LE.bind(this.rawBuffer);
    case DATA_TYPE.UINT32 :
      return this.endian === ENDIAN.BIG
        ? this.rawBuffer.writeUInt32BE.bind(this.rawBuffer)
        : this.rawBuffer.writeUInt32LE.bind(this.rawBuffer);
    case DATA_TYPE.INT16 :
      return this.endian === ENDIAN.BIG
        ? this.rawBuffer.writeInt16BE.bind(this.rawBuffer)
        : this.rawBuffer.writeInt16LE.bind(this.rawBuffer);
    case DATA_TYPE.INT32 :
      return this.endian === ENDIAN.BIG
        ? this.rawBuffer.writeInt32BE.bind(this.rawBuffer)
        : this.rawBuffer.writeInt32LE.bind(this.rawBuffer);
    case DATA_TYPE.FLOAT :
      return this.endian === ENDIAN.BIG
        ? this.rawBuffer.writeFloatBE.bind(this.rawBuffer)
        : this.rawBuffer.writeFloatLE.bind(this.rawBuffer);
    case DATA_TYPE.DOUBLE :
      return this.endian === ENDIAN.BIG
        ? this.rawBuffer.writeDoubleBE.bind(this.rawBuffer)
        : this.rawBuffer.writeDoubleLE.bind(this.rawBuffer);
    }
    throw new Error('Not implemented');
  }
}
