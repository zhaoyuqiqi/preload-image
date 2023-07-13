export function isOriginPath(url: string) {
  return /^http?s:\/\/.*/.test(url);
}
