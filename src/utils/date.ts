export function getCurrentDateFormatted(): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const currentDate: Date = new Date();
  return currentDate.toLocaleDateString("en-NG", options);
}
