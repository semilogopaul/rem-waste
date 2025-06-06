import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { motion } from "framer-motion";
import { modalVariants, mascotVariants } from "../ui/animations/skipSelector";
import type { MobileSkipDetailsProps } from "../types";

export const MobileSkipDetails = ({
  skip,
  isOpen,
  onClose,
}: Omit<MobileSkipDetailsProps, "onContinue">) => {
  if (!skip) return null;

  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);

  // Encouraging messages (same as desktop)
  const encouragingMessages = [
    "Great choice! This skip is perfect for your needs! 🌟",
    "Excellent selection! You're making great progress! 🚀",
    "Fantastic pick! You're one step closer to your goal! 💪",
    "Wonderful choice! You've got great taste in skips! ✨",
    "Amazing selection! Let's keep the momentum going! 🎯",
  ];
  const randomMessage = useMemo(
    () =>
      encouragingMessages[
        Math.floor(Math.random() * encouragingMessages.length)
      ],
    [skip?.id]
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
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
              <Dialog.Panel
                as={motion.div}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/20 px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full max-w-lg"
              >
                <div className="sm:flex sm:items-start">
                  <div className="w-full space-y-6">
                    <div className="relative">
                      <Dialog.Title className="text-2xl font-semibold text-white text-center mb-2">
                        {skip.size} Yard Skip
                      </Dialog.Title>
                      <motion.div
                        variants={mascotVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute -top-16 right-0 w-24 h-24"
                      >
                        <img
                          src="/mascot.png"
                          alt="Mascot"
                          className="object-contain w-full h-full mt-10"
                        />
                      </motion.div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">Hire Period:</span>
                        <span className="text-white font-semibold">
                          {skip.hire_period_days} Days
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">
                          Total Price (Inc. VAT):
                        </span>
                        <span className="text-white font-semibold">
                          £{totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm text-blue-400 text-center"
                    >
                      {randomMessage}
                    </motion.div>

                    <div className="flex flex-col gap-3">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {}}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25"
                      >
                        Continue to Permit Check
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className="w-full py-3 px-4 bg-transparent border border-gray-600 text-gray-300 rounded-xl font-medium hover:border-gray-500 hover:text-gray-200 transition-colors"
                      >
                        Choose Different Skip
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
