// "use client"

// import { motion, AnimatePresence } from "framer-motion"
// import { useEffect, useState } from "react"
// import { Sparkles } from "lucide-react"

// interface AnimatedCastleProps {
//   onAnimationComplete: () => void
// }

// export function AnimatedCastle({ onAnimationComplete }: AnimatedCastleProps) {
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false)
//     }, 5000)

//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <AnimatePresence onExitComplete={onAnimationComplete}>
//       {isVisible && (
//         <motion.div
//           className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.div className="relative max-w-md w-full">
//             <motion.img
//               src="https://imgur.com/rpqjB80.png"
//               alt="Castelo de Aniversário"
//               className="w-full"
//               initial={{ scale: 0.8 }}
//               animate={{ scale: 1 }}
//               transition={{ duration: 1 }}
//             /> 

//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute"
//                 initial={{
//                   x: Math.random() * 200 - 100,
//                   y: Math.random() * 200 - 100,
//                   opacity: 0,
//                 }}
//                 animate={{
//                   x: Math.random() * 200 - 100,
//                   y: Math.random() * 200 - 100,
//                   opacity: [0, 1, 0],
//                   scale: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: 1,
//                   delay: Math.random() * 2,
//                 }}
//                 style={{
//                   top: `${Math.random() * 100}%`,
//                   left: `${Math.random() * 100}%`,
//                 }}
//               >
//                 <Sparkles className="text-yellow-400 w-4 h-4" />
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface AnimatedCastleProps {
  onAnimationComplete: () => void
}

export function AnimatedCastle({ onAnimationComplete }: AnimatedCastleProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Atualiza as dimensões da janela no lado do cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
 
      updateSize()
      window.addEventListener("resize", updateSize)
 
      return () => window.removeEventListener("resize", updateSize)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {isVisible && (
        <motion.div
          className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-purple-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Estrelas em toda a tela */}
          {windowSize.width > 0 &&
            [...Array(50)].map((_, i) => (
              <motion.div
                key={`screen-star-${i}`}
                className="absolute pointer-events-none"
                initial={{
                  x: Math.random() * windowSize.width - windowSize.width / 2,
                  y: Math.random() * windowSize.height - windowSize.height / 2,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * windowSize.width - windowSize.width / 2,
                  y: Math.random() * windowSize.height - windowSize.height / 2,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 6, // Movimento mais lento
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Sparkles className="text-yellow-400 w-6 h-6" />
              </motion.div>
            ))}

          {/* Imagem do castelo */}
          <motion.div className="relative max-w-md w-full">
            <motion.img
              src="https://imgur.com/rpqjB80.png"
              alt="Castelo de Aniversário"
              className="w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Estrelas sobre a imagem */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`castle-star-${i}`}
                className="absolute pointer-events-none"
                initial={{
                  x: Math.random() * 200 - 100, // Movimento mais contido sobre a imagem
                  y: Math.random() * 200 - 100,
                  opacity: 0,
                }}
                animate={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 5, // Movimento um pouco mais rápido que o fundo
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 1.5,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Sparkles className="text-yellow-400 w-4 h-4" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
