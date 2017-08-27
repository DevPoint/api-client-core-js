
import PropType from './PropType';

export const PropUndefined = new PropType('undefined', undefined, null);
export const PropNumber = new PropType('number', 0, PropUndefined);
export const PropString = new PropType('string', 0, PropUndefined);
export const PropBoolean = new PropType('boolean', 0, PropUndefined);
export const PropObject = new PropType('object', {}, PropUndefined);
export const PropSymbol = new PropType('symbol', Symbol(), PropUndefined);
export const PropString = new PropType('string', 0, PropUndefined);
export const PropInteger = new PropType('integer', 0, PropNumber);
export const PropArray = new PropType('array', [], PropObject);
export const PropNullableString = new PropType('nullableString', null, PropString);
export const PropNullableNumber = new PropType('nullableNumber', null, PropNumber);
export const PropNullableInteger = new PropType('nullableInteger', null, PropInteger);
export const PropNullableObject = new PropType('nullableArray', null, PropObject);
export const PropNullableArray = new PropType('nullableArray', null, PropArray);

export default {
    'undefined': PropUndefined,
    'string': PropString,
    'number': PropNumber,
    'boolean': PropBoolean,
    'integer': PropInteger,
    'object': PropObject,
    'symbol': PropSymbol,
    'array': PropArray,
    'nullableString': PropNullableString,
    'nullableNumber': PropNullableNumber,
    'nullableInteger': PropNullableInteger,
    'nullableObject': PropNullableObject,
    'nullableArray': PropNullableArray
};
