/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: unknown): boolean {
  return !!item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.entries(source as object).forEach(([key, value])  => {
      if (isObject(value)) {
        if (!(key in (target as object))) {
          output[key] = value;
        } else {
          output[key] = deepMerge(target[key], value);
        }
      } else {
        output[key] = value;
      }
    });
  }

  return output;
}
