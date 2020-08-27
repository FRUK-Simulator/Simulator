export function expand<T>(list: (() => T)[]): T[] {
  let ts = [];
  for (const t of list) {
    ts.push(t());
  }
  return ts;
}
