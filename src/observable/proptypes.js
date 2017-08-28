
import PropType from './ObservablePropType';

export const ObservablePropNumber = new PropType('number', 0, null);
export const ObservablePropString = new PropType('string', '', null);
export const ObservablePropBoolean = new PropType('boolean', false, null);
export const ObservablePropObject = new PropType('object', {}, null);
export const ObservablePropSymbol = new PropType('symbol', Symbol(), null);
export const ObservablePropInteger = new PropType('integer', 0, ObservablePropNumber);
export const ObservablePropArray = new PropType('array', [], ObservablePropObject);
export const ObservablePropNullableString = new PropType('nullableString', null, ObservablePropString);
export const ObservablePropNullableNumber = new PropType('nullableNumber', null, ObservablePropNumber);
export const ObservablePropNullableInteger = new PropType('nullableInteger', null, ObservablePropInteger);
export const ObservablePropNullableObject = new PropType('nullableObject', null, ObservablePropObject);
export const ObservablePropNullableArray = new PropType('nullableArray', null, ObservablePropArray);

export default {
    'string': ObservablePropString,
    'number': ObservablePropNumber,
    'boolean': ObservablePropBoolean,
    'integer': ObservablePropInteger,
    'object': ObservablePropObject,
    'symbol': ObservablePropSymbol,
    'array': ObservablePropArray,
    'nullableString': ObservablePropNullableString,
    'nullableNumber': ObservablePropNullableNumber,
    'nullableInteger': ObservablePropNullableInteger,
    'nullableObject': ObservablePropNullableObject,
    'nullableArray': ObservablePropNullableArray
};
