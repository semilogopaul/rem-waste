import type { Skip, FilterType } from "../types";

export const filterSkips = (skips: Skip[], filter: FilterType): Skip[] => {
  return skips.filter((skip) => {
    if (filter === "road") return skip.allowed_on_road;
    if (filter === "heavy") return skip.allows_heavy_waste;
    return true;
  });
};
