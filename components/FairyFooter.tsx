"use client"
import { motion } from "framer-motion"

export default function FairyFooter() {
  return (
    <footer className="mt-8 text-center text-sm text-sky-500 font-medium">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Made by S.K
      </motion.div>
    </footer>
  )
}
