import helpers from '../helpers';
import { DATA_TYPE } from '../constants';

export default class Field <FieldValue> {
  readonly type: number;
  readonly value: FieldValue;

  /**
   * Class constructor
   *
   * @param type - Type of Field
   * @param value - Value to store in Field
   */
  constructor (type: DATA_TYPE, value: FieldValue) {
    if (!DATA_TYPE[type]) {
      throw new Error('Type should be of type DATA_TYPE');
    }
    if (value === null || typeof value === 'undefined') {
      throw new Error('Value should be defined');
    }
    this.type = type;
    this.value = value;
  }

  /**
   * Get field length
   * May be overridden
   */
  length (): number {
    if (typeof this.value !== 'string' && typeof this.value !== 'number') {
      throw new Error('Not implemented');
    }

    return helpers.calcLength(this.type, this.value);
  }

  /**
   * Default field is not numeric
   * Override this
   */
  // eslint-disable-next-line class-methods-use-this
  isNumeric (): boolean {
    return false;
  }

  // Write () {
  //
  // }
}
