export default function midnightDay(date) {
  const final = new Date(date);
  final.setHours(0, 0, 0, 0);
  return final;
}