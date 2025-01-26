"use client"

import { useState } from "react"
import { Button } from "./components/ui/button"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { Textarea } from "./components/ui/textarea"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface RsvpFormProps {
  guestName: string
}

export function RsvpForm({ guestName }: RsvpFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const attendance = formData.get("attendance")

    // Here you would typically send this to your API
    console.log({
      guestName,
      attendance,
      message: formData.get("message"),
    })

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
      >
        <Sparkles className="h-6 w-6 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-xl text-pink-600 font-semibold mb-4">Obrigado pela confirmação!</h2>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg"
    >
      <div className="space-y-2">
        <Label className="text-lg font-medium text-purple-700">Você poderá comparecer?</Label>
        <RadioGroup name="attendance" className="flex flex-col gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="sim" required />
            <Label htmlFor="sim" className="text-pink-600">
              Sim, estarei lá!
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="nao" required />
            <Label htmlFor="nao" className="text-pink-600">
              Não poderei ir
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-lg font-medium text-purple-700">
          Mensagem (opcional)
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Deixe uma mensagem especial..."
          className="border-pink-200"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white"
      >
        Confirmar Presença
      </Button>
    </motion.form>
  )
}

