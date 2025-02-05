"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table"
import { Heart } from "lucide-react"
import supabase from "../app/src/supabaseClient"

export function RelatorioAceites() {
  const [data, setData] = useState<{ nome: string; data_cadastro: string; sn_participar: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPresenca() {
      try {
        const { data, error } = await supabase
          .from("presenca")
          .select("nome, data_cadastro, sn_participar")
          .order("data_cadastro", { ascending: false }) // Ordena por data mais recente

        if (error) throw error

        setData(data)
      } catch (err) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.")
        console.error("Erro ao buscar dados da presença:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPresenca()
  }, [])

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
      {/* Cabeçalho animado */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <Heart className="w-12 h-12 text-pink-400 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-pink-600">Relatório de Aceites</h1>
        <p className="text-purple-600 text-sm">Lista de confirmações de presença</p>
      </motion.div>

      {/* Mensagem de carregamento */}
      {loading && <p className="text-purple-500">Carregando...</p>}

      {/* Mensagem de erro */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Tabela responsiva */}
      {!loading && !error && data.length > 0 && (
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
          <Table className="w-full">
            <TableHeader className="bg-pink-300 text-white">
              <TableRow>
                <TableHead className="text-left p-3">Nome</TableHead>
                <TableHead className="text-center p-3">Data</TableHead>
                <TableHead className="text-center p-3">Resposta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="p-3 text-gray-800">{entry.nome}</TableCell>
                  <TableCell className="p-3 text-center text-gray-600">
                    {new Date(entry.data_cadastro).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className={`p-3 text-center font-bold ${entry.sn_participar === "Sim" ? "text-green-600" : "text-red-600"}`}>
                    {entry.sn_participar}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Caso não tenha registros */}
      {!loading && !error && data.length === 0 && <p className="text-gray-500">Nenhuma confirmação de presença até o momento.</p>}
    </div>
  )
}
