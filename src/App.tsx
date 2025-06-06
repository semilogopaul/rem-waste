import { useState, useEffect } from "react";
import { SkipSelector } from "./components/SkipSelector";
import { motion, AnimatePresence } from "framer-motion";
import { TutorialModal } from "./components/TutorialModal";
import clsx from "clsx";
import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

import { SelectedSkipDetails } from "./components/SelectedSkipDetails";
import { MobileSkipDetails } from "./components/MobileSkipDetails";

export function App() {
  const [selectedSize, setSelectedSize] = useState<number>();
  const [step] = useState<"size" | "details">("size");
  const [showTutorial, setShowTutorial] = useState(true);

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

  const handleSizeSelect = (size: number) => {
    setSelectedSize(selectedSize === size ? undefined : size);
  };

  const handleContinue = () => {
    // Handle continuation to next step
    console.log("Continuing to next step...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {showTutorial && <TutorialModal onClose={handleCloseTutorial} />}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <div className="mb-12">
          <nav className="flex justify-between items-center gap-4 overflow-x-auto py-4 scrollbar-hide">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className={`flex items-center ${
                  idx !== steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2",
                      step.completed
                        ? "bg-blue-600 border-blue-600 text-white"
                        : step.active
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-600 text-gray-600"
                    )}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={clsx(
                      "text-sm whitespace-nowrap",
                      step.active ? "text-blue-500" : "text-gray-500"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {idx !== steps.length - 1 && (
                  <div
                    className={clsx(
                      "h-px flex-1 mx-2 mt--8",
                      step.completed ? "bg-blue-600" : "bg-gray-600"
                    )}
                  />
                )}
              </div>
            ))}
          </nav>
        </div>

        <main>
          <AnimatePresence mode="wait">
            {step === "size" && (
              <motion.div
                key="size-selector"
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
        {selectedSize && (
          <SelectedSkipDetails
            size={selectedSize}
            price={278} // This should come from the selected skip data
            days={14}
            onUnselect={() => setSelectedSize(undefined)}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
