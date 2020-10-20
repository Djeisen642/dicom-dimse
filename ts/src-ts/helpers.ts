import constants, { DATA_TYPE } from './constants';
import DetailedError from './DetailedError';

export default {

  /**
   * Check if type of data is a string type
   *
   * @param type - type of data
   */
  isString (type: DATA_TYPE): boolean {
    return [DATA_TYPE.ASCII, DATA_TYPE.HEX].includes(type);
  },

  /**
   * Check if value is of the given type
   *
   * @param type - type of data that value should be
   * @param value - value to check
   * @throws DetailedError if given type has not been implemented
   */
  isOfNumberType (type:DATA_TYPE, value:number):boolean {
    switch (type) {
    case DATA_TYPE.UINT8 :
      return value >= constants.MIN_DATA_VALUE.UINT8 &&
        value <= constants.MAX_DATA_VALUE.UINT8;
    case DATA_TYPE.UINT16 :
      return value >= constants.MIN_DATA_VALUE.UINT16 &&
        value <= constants.MAX_DATA_VALUE.UINT16;
    case DATA_TYPE.UINT32 :
      return value >= constants.MIN_DATA_VALUE.UINT32 &&
        value <= constants.MAX_DATA_VALUE.UINT32;
    case DATA_TYPE.INT8 :
      return value >= constants.MIN_DATA_VALUE.INT8 &&
        value <= constants.MAX_DATA_VALUE.INT8;
    case DATA_TYPE.INT16 :
      return value >= constants.MIN_DATA_VALUE.INT16 &&
        value <= constants.MAX_DATA_VALUE.INT16;
    case DATA_TYPE.INT32 :
      return value >= constants.MIN_DATA_VALUE.INT32 &&
        value <= constants.MAX_DATA_VALUE.INT32;
    case DATA_TYPE.FLOAT : {
      const valueToCheck = Math.abs(value);

      return valueToCheck === 0 || valueToCheck >= constants.PRECISION_DATA_VALUE.FLOAT.MIN &&
        valueToCheck <= constants.PRECISION_DATA_VALUE.FLOAT.MAX;
    }
    case DATA_TYPE.DOUBLE : {
      const valueToCheck = Math.abs(value);

      return valueToCheck === 0 || valueToCheck >= constants.PRECISION_DATA_VALUE.DOUBLE.MIN &&
        valueToCheck <= constants.PRECISION_DATA_VALUE.DOUBLE.MAX;
    }
    default :
      throw new DetailedError('Not implemented', { type });
    }
  },

  /**
   * Return the length of a type of data
   *
   * @param type - type of data that should be
   * @param value - value to check
   */
  calcLength (type:DATA_TYPE, value: string|number): number {
    let size = NaN;

    switch (type) {
    case DATA_TYPE.HEX :
      if (typeof value !== 'string') {
        throw new DetailedError('Invalid type given to hex calcLength', { value });
      }
      size = Buffer.byteLength(value, 'hex');
      break;
    case DATA_TYPE.ASCII :
      if (typeof value !== 'string') {
        throw new DetailedError('Invalid type given to hex calcLength', { value });
      }
      size = Buffer.byteLength(value, 'ascii');
      break;
    case DATA_TYPE.UINT8 :
      size = 1;
      break;
    case DATA_TYPE.UINT16 :
      size = 2;
      break;
    case DATA_TYPE.UINT32 :
      size = 4;
      break;
    case DATA_TYPE.INT8 :
      size = 1;
      break;
    case DATA_TYPE.INT16 :
      size = 2;
      break;
    case DATA_TYPE.INT32 :
      size = 4;
      break;
    case DATA_TYPE.FLOAT :
      size = 4;
      break;
    case DATA_TYPE.DOUBLE :
      size = 8;
      break;
    default :
      throw new DetailedError('Not implemented', { type });
    }

    return size;
  },

  /**
   * Given a data type that can be encoded, return the corresponding encoding
   *
   * @param type - Data type to check
   * @throws Error if a hex or ascii type are not given
   */
  getEncoding (type: DATA_TYPE): string {
    if (!this.isString(type)) {
      throw new DetailedError('Non-string types do not have an encoding', { type });
    }
    if (type === DATA_TYPE.HEX) {
      return 'hex';
    }
    if (type === DATA_TYPE.ASCII) {
      return 'ascii';
    }

    throw new Error(''); // Should not get here
  }
};
