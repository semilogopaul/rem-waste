import { useState } from "react";
import type { FilterType } from "../types";

export const useFilter = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  return {
    filter,
    setFilter,
  };
};
