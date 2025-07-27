import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'DESSTAR Chess - Online Chess Game',
  description: 'Play chess online! Create or join rooms and enjoy real-time chess matches.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="icon" href="/assets/images/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/images/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/images/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
} 