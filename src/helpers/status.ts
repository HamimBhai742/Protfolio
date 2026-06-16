export function formatStatusLabel(status?: string) {
  if (!status) return "";
  return status
    .replace(/[_-]+/g, " ")
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}