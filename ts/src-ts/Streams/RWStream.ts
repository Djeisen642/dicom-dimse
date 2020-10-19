import { ENDIAN } from '../constants';

export default class RWStream {
  endian: ENDIAN = ENDIAN.BIG;

  setEndian (endian: ENDIAN):void {
    if (!(endian in ENDIAN)) {
      throw new Error('Invalid endian value passed in');
    }
    this.endian = endian;
  }
}
