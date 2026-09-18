/**
 * Deterministic shuffle. The lesson player renders on the server first, so a random
 * order would cause a hydration mismatch — seeding from the block id keeps the order
 * stable while still not matching the authored (correct) order.
 */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  const next = () => {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;
    return Math.abs(hash) / 2147483647;
  };

  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(next() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap]!, copy[index]!];
  }

  // A shuffle that returns the original order teaches nothing, so nudge it.
  if (copy.length > 1 && copy.every((item, index) => item === items[index])) {
    [copy[0], copy[copy.length - 1]] = [copy[copy.length - 1]!, copy[0]!];
  }
  return copy;
}
