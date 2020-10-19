import Field from '../../src-ts/Fields/Field';
import { DATA_TYPE } from '../../src-ts/constants';

describe('Field', () => {
  it('should create a Field', () => {
    const type = DATA_TYPE.ASCII;
    const value = 'string';
    const field = new Field(type, value);

    expect(field).toBeTruthy();
    expect(field.type).toBe(type);
    expect(field.value).toBe(value);
  });

  it('should throw an error, incorrect input first arg', () => {
    expect(() => {
      new Field(-1, 'string');
    }).toThrow(Error);
  });

  it('should throw an error, incorrect second arg', () => {
    expect(() => {
      const type = DATA_TYPE.ASCII;
      const value = undefined;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      new Field(type, value);
    }).toThrow(Error);
  });

  it('should return the field length, ascii', () => {
    const type = DATA_TYPE.ASCII;
    const value = 'string';
    const expected = value.length; // Each character is a byte

    const field = new Field(type, value);
    const actual = field.length();

    expect(actual).toBe(expected);
  });

  it('should return the field length, hex', () => {
    const type = DATA_TYPE.HEX;
    const value = 'FFAABB';
    const expected = 3; // 3 hex bytes

    const field = new Field(type, value);
    const actual = field.length();

    expect(actual).toBe(expected);
  });

  it('should default to non-numeric', () => {
    const type = DATA_TYPE.ASCII;
    const value = 'string';
    const expected = false;

    const field = new Field(type, value);
    const actual = field.isNumeric();

    expect(actual).toBe(expected);
  });
});
