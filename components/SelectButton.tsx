"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SelectButtonProps {
  label: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export default function SelectButton({ label, icon, isSelected, onClick }: SelectButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`p-4 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-2 ${
        isSelected
          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-300/50"
          : "bg-white text-sky-600 border-2 border-sky-100 hover:border-sky-300"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-sm">{label}</span>
    </motion.button>
  );
}
