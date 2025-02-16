export const handleParseArrayToLabelValueArray = (array: Array<number | string>): Array<{
  label: string | number;
  value: string | number;
}> => {
  if (!Array.isArray(array)) return [];
  return array?.map((_value: string | number) => {
    return { label: _value, value: _value };
  })
}