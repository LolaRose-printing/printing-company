export default function roundTwoDecimals(number, precision = 2) {
  const multipl = Math.pow(10, precision);
  return Math.round((number + Number.EPSILON) * multipl) / multipl;
}

export function roundThousandsWorks(number) {
  // 10^3, as we are counting with prices per thousand
  const divisionFactor = 3;
  return `${roundTwoDecimals(number / Math.pow(10, divisionFactor)).toFixed(2)}`;
}