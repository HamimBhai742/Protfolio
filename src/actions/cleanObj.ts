/* eslint-disable @typescript-eslint/no-explicit-any */
export function cleanObj(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        v !== '' &&
        !(Array.isArray(v) && v.length === 1 && v[0] === '') &&
        v !== null
    )
  );
}
