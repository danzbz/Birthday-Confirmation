"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { Heart, MapPin, Calendar, Clock, ExternalLink } from "lucide-react"
import { FloatingCrown, FloralBorder } from "../components/decorative-elements"
import supabase from "../app/src/supabaseClient" // Ajuste para o caminho correto do seu supabaseClient

export function RsvpConfirmation() {
  const [guestName, setGuestName] = useState("") // Nome digitado pelo convidado
  const [confirmed, setConfirmed] = useState<boolean | null>(null)
  const [selectedValue, setSelectedValue] = useState<string>("")
  const [statusMessage, setStatusMessage] = useState<string>("")

  // Função para confirmar presença e salvar no banco de dados
  const handleConfirm = async () => {
    if (!guestName.trim() || !selectedValue) {
      setStatusMessage("Por favor, digite seu nome e selecione uma opção.")
      return
    }

    try {
      const { error } = await supabase
        .from("presenca")
        .insert([
          {
            nome: guestName.trim(), // Nome do convidado digitado
            sn_participar: selectedValue === "yes" ? "Sim" : "Não", // Confirmação
            data_cadastro: new Date().toISOString(), // Timestamp
          },
        ])

      if (error) {
        throw error
      }

      setConfirmed(selectedValue === "yes")
      setStatusMessage("Resposta registrada com sucesso!")
    } catch (error) {
      console.error("Erro ao registrar no Supabase:", error)
      setStatusMessage("Erro ao registrar sua resposta. Tente novamente.")
    }
  }

  const handleLocationClick = () => {
    window.open("https://maps.google.com", "_blank")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background com castelo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: `url(${encodeURI(
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-G5tUqAlZQL5V0UzuvdGJR2ReWxp5Oj.png"
          )})`,
        }}
      />

      {/* Gradiente de overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/90 to-purple-100/90" />

      <FloralBorder position="top" />
      <FloralBorder position="bottom" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen relative flex items-center justify-center p-4"
      >
        <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-200">
          <div className="text-center space-y-4 mt-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
              <Heart className="w-12 h-12 text-pink-400 mx-auto" />
            </motion.div>

            <h1 className="text-2xl font-bold text-pink-600">Olá !</h1>

            <p className="text-purple-600">Vamos celebrar o primeiro aninho da Laurinha!</p>

            <div className="grid grid-cols-1 gap-4 mt-6">
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-pink-50/80 hover:bg-pink-100/80 transition-colors backdrop-blur-sm border border-pink-200"
                onClick={handleLocationClick}
              >
                <MapPin className="w-5 h-5 text-pink-500" />
                <span className="text-pink-600">Ver Localização</span>
                <ExternalLink className="w-4 h-4 text-pink-400" />
              </motion.button>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-purple-50/80 backdrop-blur-sm border border-purple-200"
              >
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="text-purple-600">Sábado, 22 de Fevereiro</span>
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-pink-50/80 backdrop-blur-sm border border-pink-200"
              >
                <Clock className="w-5 h-5 text-pink-500" />
                <span className="text-pink-600">16:00</span>
              </motion.div>

              <motion.a
                href="https://wa.me/5515996319434"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-center gap-2 p-4 rounded-lg bg-green-50/80 hover:bg-green-100/80 transition-colors backdrop-blur-sm border border-green-200"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="text-green-600">Falar com a Mamãe</span>
              </motion.a>

            </div>
          </div>

          {/* Input para digitar o nome */}
          <div className="space-y-2">
            <Label htmlFor="guest-name" className="text-pink-600">
              Nome e acompanhantes:
            </Label>
            <input
              id="guest-name"
              type="text"
              placeholder="Digite seu nome e dos acompanhantes..."
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg text-pink-600 focus:outline-none focus:ring focus:ring-pink-400"
            />
          </div>

          {confirmed === null ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="space-y-6"
            >
              <RadioGroup className="space-y-4" value={selectedValue} onValueChange={setSelectedValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="text-pink-600 cursor-pointer">
                    Sim, estarei presente!
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="text-pink-600 cursor-pointer">
                    Infelizmente não poderei ir
                  </Label>
                </div>
              </RadioGroup>

              <Button
                onClick={handleConfirm}
                disabled={!guestName.trim() || !selectedValue}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-medium py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Presença
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4 py-4"
            >
              <p className="text-lg text-purple-600">
                {confirmed
                  ? "Que felicidade! Estamos ansiosos para comemorar esse momento especial ao seu lado!"
                  : "Sentiremos sua falta, mas agradecemos por nos avisar!"}
              </p>
              {statusMessage && <p className="text-sm text-gray-500">{statusMessage}</p>}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
