import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const tutorialSteps = [
  {
    title: "Hi, I'm Trashy, Welcome to SkipHire!",
    description: "Let me guide you through our skip selection process.",
    tip: "I'm here to help you find the perfect skip for your needs.",
  },
  {
    title: "Choose Your Skip Size",
    description: "Browse through our range of skip sizes from 4 to 40 yards.",
    tip: "We provide the best skips!",
  },
  {
    title: "Filter Options",
    description: "Use our filters to find skips that match your requirements.",
    tip: "Looking for road placement or heavy waste? We've got you covered!",
  },
];

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal = ({ onClose }: TutorialModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/20 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-300 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <motion.div
                    className="flex flex-col items-center w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentStep}
                  >
                    <div className="mx-auto w-24 h-24 mb-4">
                      <img
                        src="/mascot.png"
                        alt="SkipHire Mascot"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold text-white mb-2"
                    >
                      {tutorialSteps[currentStep].title}
                    </Dialog.Title>

                    <p className="text-gray-300 mb-4">
                      {tutorialSteps[currentStep].description}
                    </p>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl w-full backdrop-blur-sm">
                      <p className="text-blue-300 text-sm">
                        💡 Tip: {tutorialSteps[currentStep].tip}
                      </p>
                    </div>

                    <div className="mt-8 flex justify-between w-full">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-300 transition-colors"
                        onClick={onClose}
                      >
                        Skip tutorial
                      </button>
                      <button
                        type="button"
                        className="rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-500 transition-colors"
                        onClick={handleNext}
                      >
                        {currentStep === tutorialSteps.length - 1
                          ? "Get Started"
                          : "Next"}
                      </button>
                    </div>

                    <div className="flex justify-center gap-2 mt-6">
                      {tutorialSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentStep
                              ? "bg-blue-500"
                              : "bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
