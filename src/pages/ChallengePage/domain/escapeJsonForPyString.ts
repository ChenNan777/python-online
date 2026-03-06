export function escapeJsonForPyString(value: unknown): string {
  return JSON.stringify(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}
