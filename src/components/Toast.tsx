"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheck } from "react-icons/fa";

interface ToastProps {
  show: boolean;
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}

export default function Toast({ show, type, message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-5 right-5 z-50 rounded-lg bg-white px-4 py-3 shadow-lg border border-slate-200"
          role="status"
          aria-live="polite"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            {type === "success" && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                <FaCheck className="h-3 w-3 text-white" />
              </div>
            )}
            <span className="text-xs text-slate-600">{message}</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
