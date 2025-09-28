export function getFormattedDateValue(value: string) {
  const date = new Date(value);
  const dateValue: string = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
  return dateValue;
}
