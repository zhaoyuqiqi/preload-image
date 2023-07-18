export function isOriginPath(url: string) {
  return /^http?s:\/\/.*/.test(url);
}

export function isPromise(p: any): p is Promise<any> {
  return typeof p === "object" && p !== null && typeof p.then === "function";
}
