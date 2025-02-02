import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aniversário Laurinha', 
  description: 'Convite de Aniversário da Laurinha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
