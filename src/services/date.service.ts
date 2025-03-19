export function jsonDateToReadbaleFormat(jsonDate: string) {
  // Parse the JSON date string into a Date object
  const date = new Date(jsonDate);

  // Convert to IST (UTC +5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
  const istDate = new Date(date.getTime() + istOffset);

  // Extract date, month, year, hours, minutes, and seconds
  const day = String(istDate.getUTCDate()).padStart(2, "0");
  const month = String(istDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = istDate.getUTCFullYear();
  let hours = istDate.getUTCHours();
  const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format the date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}: ${ampm}`;

  return `${formattedDate} ${formattedTime}`;
}
