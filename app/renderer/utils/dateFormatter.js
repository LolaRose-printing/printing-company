export default function format(date) {
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: 'numeric' });
  const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date);
  return `${day}. ${month}. ${year}`;
}
