import type { ComponentType } from "react";
import type { SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type FilterType = "all" | "road" | "heavy";

export interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export interface SkipSelectorProps {
  selectedSize: number | null;
  onSizeSelect: (size: number) => void;
}

export interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onClick: () => void;
}

export interface MobileSkipDetailsProps {
  skip: Skip | null;
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}
