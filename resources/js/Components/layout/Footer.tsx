import React from 'react'

type FooterProps = {
  copyrightText?: string
}

export default function Footer({ copyrightText = 'mshrynzw' }: FooterProps) {
  return (
    <footer className="w-full px-4 py-6 text-center text-xs text-white/50">
      © {new Date().getFullYear()} {copyrightText}
    </footer>
  )
}
