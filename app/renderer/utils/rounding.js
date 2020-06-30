export default function roundTwoDecimals(number, precision = 2) {
  const multipl = Math.pow(10, precision)
  return Math.round((number + Number.EPSILON) * multipl) / multipl
}