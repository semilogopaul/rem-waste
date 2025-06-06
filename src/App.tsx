import { useState, useEffect, useCallback } from "react";
import { SkipSelector } from "./components/SkipSelector";
import { motion, AnimatePresence } from "framer-motion";
import { TutorialModal } from "./components/TutorialModal";
import { clsx } from "clsx";
import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { SelectedSkipDetails } from "./components/SelectedSkipDetails";
import { skipsData } from "./constants/skip-selector";
import { useSkipSelector } from "./hooks/useSkipSelector";
import { useMediaQuery } from "./hooks/useMediaQuery";

export function App() {
  const [step, setStep] = useState<"size" | "details">("size");
  const [showTutorial, setShowTutorial] = useState(true);
  const { selectedSize, handleSizeSelect } = useSkipSelector({});
  const isMobile = useMediaQuery("(max-width: 640px)");

  const steps = [
    { icon: MapPinIcon, title: "Postcode", active: true, completed: true },
    { icon: TrashIcon, title: "Waste Type", active: true, completed: true },
    { icon: TruckIcon, title: "Select Skip", active: true, completed: false },
    {
      icon: ClipboardDocumentCheckIcon,
      title: "Permit Check",
      active: false,
      completed: false,
    },
    {
      icon: CalendarDaysIcon,
      title: "Choose Date",
      active: false,
      completed: false,
    },
    { icon: CreditCardIcon, title: "Payment", active: false, completed: false },
  ];

  useEffect(() => {
    const hasSeen = localStorage.getItem("skipHireTutorialSeen");
    if (hasSeen) {
      setShowTutorial(false);
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("skipHireTutorialSeen", "true");
  };

  const handleContinue = useCallback(() => {
    setStep("details");
  }, []);

  const selectedSkipData = selectedSize
    ? skipsData.find((skip) => skip.size === selectedSize)
    : null;
  const handleUnselect = useCallback(() => {
    if (selectedSize !== null) {
      handleSizeSelect(selectedSize); // This will toggle it off since selectedSize is the current size
    }
  }, [selectedSize, handleSizeSelect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="min-h-screen flex flex-col">
        <header className="py-6 px-2 sm:px-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-4">
            {/* Removed mascot and title for a cleaner look */}
          </div>
          <div className="flex items-center justify-center gap-0 sm:gap-2">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-center">
                <div
                  className={clsx(
                    "flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2 rounded-full relative group",
                    s.active
                      ? s.completed
                        ? "bg-blue-600 text-white shadow"
                        : "bg-blue-600/20 text-blue-500"
                      : "bg-slate-800 text-slate-500"
                  )}
                  tabIndex={0}
                >
                  <s.icon className="w-5 h-5" />
                  {!isMobile && (
                    <span
                      className={clsx(
                        "ml-2 font-medium text-base",
                        s.active
                          ? s.completed
                            ? "text-white"
                            : "text-blue-400"
                          : "text-slate-400"
                      )}
                    >
                      {s.title}
                    </span>
                  )}
                  {isMobile && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-slate-900 text-xs text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none z-10 whitespace-nowrap shadow-lg border border-blue-500/20 transition-opacity duration-200">
                      {s.title}
                    </span>
                  )}
                </div>
                {i !== steps.length - 1 && (
                  <div
                    className={clsx(
                      "w-4 sm:w-8 h-0.5 mx-1",
                      s.completed ? "bg-blue-600" : "bg-slate-800"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </header>

        <main className="flex-1 container mx-auto py-8">
          <AnimatePresence mode="wait">
            {step === "size" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <SkipSelector
                  selectedSize={selectedSize}
                  onSizeSelect={handleSizeSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {selectedSkipData && (
          <SelectedSkipDetails
            size={selectedSkipData.size}
            price={
              selectedSkipData.price_before_vat *
              (1 + selectedSkipData.vat / 100)
            }
            days={selectedSkipData.hire_period_days}
            onUnselect={handleUnselect}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTutorial && <TutorialModal onClose={handleCloseTutorial} />}
      </AnimatePresence>
    </div>
  );
}
