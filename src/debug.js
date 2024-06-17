export function debug(message, ...optionalParams) {
  const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${message}`, ...optionalParams);
}
