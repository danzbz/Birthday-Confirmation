"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"

export function FloatingCrown() {
  return (
    <motion.div
      className="absolute top-4 w-full flex justify-center"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <Crown className="w-12 h-12 text-yellow-400" />
    </motion.div>
  )
}

export function FloralBorder({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      className={`absolute left-0 right-0 h-32 pointer-events-none
        ${position === "top" ? "top-0 rotate-180" : "bottom-0"}`}
    >
      <div className="absolute inset-0 flex justify-around items-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="w-16 h-16"
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-full h-full bg-contain bg-no-repeat bg-center opacity-70"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d1b3ff' stroke-width='2'%3E%3Cpath d='M12 2L8 6l4 4-4 4 4 4-4 4 8-8-8-8z'/%3E%3C/svg%3E")`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

