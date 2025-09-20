export const formatToThreeDecimal = (value: number): string => {
  return value.toFixed(3);
};

export const formatToThreeDecimalPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};
