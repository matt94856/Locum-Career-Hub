export function round100(value: number): number {
  return Math.round(value / 100) * 100;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function bandFromShifts(
  marketLow: number,
  marketHigh: number,
  parts: Array<{ low: number; high: number }>,
  floor: number,
  ceiling: number,
) {
  const dailyLow = round100(clamp(marketLow + parts.reduce((sum, part) => sum + part.low, 0), floor, ceiling - 200));
  const dailyHigh = round100(
    clamp(Math.max(marketHigh + parts.reduce((sum, part) => sum + part.high, 0), dailyLow + 200), dailyLow + 200, ceiling),
  );
  return { dailyLow, dailyHigh };
}
