
import CachePropType from './CachePropType';

export const CachePropNumber = new CachePropType('number', 0, null);
export const CachePropString = new CachePropType('string', '', null);
export const CachePropBoolean = new CachePropType('boolean', false, null);
export const CachePropObject = new CachePropType('object', {}, null);
export const CachePropSymbol = new CachePropType('symbol', Symbol(), null);
export const CachePropInteger = new CachePropType('integer', 0, CachePropNumber);
export const CachePropArray = new CachePropType('array', [], CachePropObject);
export const CachePropNullableString = new CachePropType('nullableString', null, CachePropString);
export const CachePropNullableNumber = new CachePropType('nullableNumber', null, CachePropNumber);
export const CachePropNullableInteger = new CachePropType('nullableInteger', null, CachePropInteger);
export const CachePropNullableObject = new CachePropType('nullableObject', null, CachePropObject);
export const CachePropNullableArray = new CachePropType('nullableArray', null, CachePropArray);

export default {
    'string': CachePropString,
    'number': CachePropNumber,
    'boolean': CachePropBoolean,
    'integer': CachePropInteger,
    'object': CachePropObject,
    'symbol': CachePropSymbol,
    'array': CachePropArray,
    'nullableString': CachePropNullableString,
    'nullableNumber': CachePropNullableNumber,
    'nullableInteger': CachePropNullableInteger,
    'nullableObject': CachePropNullableObject,
    'nullableArray': CachePropNullableArray
};
