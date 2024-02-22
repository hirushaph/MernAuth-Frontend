export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Colombo",
  });

  return formattedDate;
}
