"use client"

import { useState } from "react"
import { AnimatedCastle } from "../components/animated-castle"
import { RsvpConfirmation } from "../components/rsvp-confirmation"

interface PageProps {
  searchParams: {
    convidado?: string // Alterado para "convidado"
  }
}

export default function Page({ searchParams }: PageProps) {
  const [showRsvp, setShowRsvp] = useState(false)

  return (
    <main>
      {!showRsvp ? (
        <AnimatedCastle onAnimationComplete={() => setShowRsvp(true)} />
      ) : (
        <RsvpConfirmation guestName={searchParams.convidado} />
      )}
    </main>
  )
}
