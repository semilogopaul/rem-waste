import { motion } from "framer-motion";
import { TruckIcon, BeakerIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { Skip } from "../types";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onClick: () => void;
}

interface FeatureProps {
  icon: any;
  label: string;
  isAvailable: boolean;
}

const Feature = ({ icon: Icon, label, isAvailable }: FeatureProps) => (
  <div
    className={clsx(
      "flex items-center gap-2 text-sm",
      isAvailable ? "text-emerald-500" : "text-gray-400"
    )}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </div>
);

export const SkipCard = ({ skip, isSelected, onClick }: SkipCardProps) => {
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "relative rounded-xl transition-all duration-300",
        "border-2 overflow-hidden",
        isSelected
          ? "border-blue-500 bg-gradient-to-br from-blue-50/90 to-white shadow-xl shadow-blue-500/20"
          : "border-gray-200/50 bg-white/90 hover:border-blue-200 hover:shadow-lg"
      )}
    >
      <div className="relative">
        <img
          src={`https://placehold.co/800x400/0f172a/e2e8f0?text=${skip.size}+Yard+Skip`}
          alt={`${skip.size} Yard Skip`}
          className="w-full object-cover aspect-[2/1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
            {skip.hire_period_days} Days
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {skip.size} Yard Skip
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">
              £{totalPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">Inc. VAT</span>
          </div>
        </div>

        <div className="space-y-3">
          <Feature
            icon={TruckIcon}
            label={
              skip.allowed_on_road
                ? "Road Placement Available"
                : "No Road Placement"
            }
            isAvailable={skip.allowed_on_road}
          />
          <Feature
            icon={BeakerIcon}
            label={
              skip.allows_heavy_waste
                ? "Accepts Heavy Waste"
                : "Light Waste Only"
            }
            isAvailable={skip.allows_heavy_waste}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className={clsx(
            "w-full py-3 px-4 rounded-xl font-medium transition-colors",
            isSelected
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-blue-200 text-blue-600 hover:bg-blue-300"
          )}
        >
          {isSelected ? "✓ Selected" : "Select This Skip"}
        </motion.button>
      </div>
    </motion.div>
  );
};
