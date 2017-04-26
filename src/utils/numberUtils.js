export function insertDecimal(number, points = 2) {
  return Number(Math.round(number + 'e' + points) + 'e-' + points).toFixed(points);
}