"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  show: boolean;
  type: "success" | "error";
  message: string;
  onClose?: () => void;
}

export default function Toast({ show, type, message, onClose }: ToastProps) {
  const color = type === "success" ? "bg-emerald-500" : "bg-rose-500";

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`fixed bottom-5 right-5 z-50 max-w-sm rounded-lg px-4 py-3 text-white shadow-lg ${color}`}
          role="status"
          aria-live="polite"
          onClick={onClose}
        >
          <div className="font-semibold">
            {type === "success" ? "Success" : "Error"}
          </div>
          <div className="text-sm">{message}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
