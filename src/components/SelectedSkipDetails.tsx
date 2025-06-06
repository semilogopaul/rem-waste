import { motion } from "framer-motion";

const encouragingMessages = [
  "Great choice! This skip is perfect for your needs! 🌟",
  "Excellent selection! You're making great progress! 🚀",
  "Fantastic pick! You're one step closer to your goal! 💪",
  "Wonderful choice! You've got great taste in skips! ✨",
  "Amazing selection! Let's keep the momentum going! 🎯",
];

interface SelectedSkipDetailsProps {
  size: number;
  price: number;
  days: number;
  onUnselect: () => void;
  onContinue: () => void;
}

export const SelectedSkipDetails = ({
  size,
  price,
  days,
  onUnselect,
  onContinue,
}: SelectedSkipDetailsProps) => {
  const randomMessage =
    encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-slate-800 border-t border-blue-500/20 shadow-2xl shadow-blue-500/10 z-50 hidden md:block"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <img
              src="/mascot.png"
              alt="SkipHire Mascot"
              className="w-16 h-16 object-contain"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white">
                  {size} Yard Skip
                </span>
                <button
                  onClick={onUnselect}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-blue-300">{randomMessage}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-blue-400 text-lg">
              £{price.toFixed(2)} for {days} days
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors"
            >
              Continue to Permit Check →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
