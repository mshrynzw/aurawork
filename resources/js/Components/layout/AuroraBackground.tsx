import React from 'react'

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* ぼかしグラデの"塊"を複数レイヤーで動かす */}
      {/* Aurora 1 */}
      <div
        className="aurora-blob absolute -top-1/3 -left-1/8 h-[90vmax] w-[70vmax] animate-aurora1"
        style={{
          background:
            'radial-gradient(45% 60% at 50% 50%, rgba(59,130,246,0.65) 0%, rgba(59,130,246,0.0) 60%), radial-gradient(40% 55% at 60% 40%, rgba(168,85,247,0.55) 0%, rgba(168,85,247,0.0) 60%)',
        }}
      />
      {/* Aurora 2 */}
      <div
        className="aurora-blob absolute -right-1/3 -top-1/3 h-[90vmax] w-[65vmax] animate-aurora2"
        style={{
          background:
            'radial-gradient(45% 60% at 50% 50%, rgba(20,184,166,0.6) 0%, rgba(20,184,166,0.0) 60%), radial-gradient(40% 55% at 40% 60%, rgba(59,130,246,0.5) 0%, rgba(59,130,246,0.0) 60%)',
        }}
      />
      {/* うっすらノイズ（バンディング対策） */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27><filter id=%27n%27 x=%270%27 y=%270%27 width=%27100%25%27 height=%27100%25%27><feTurbulence baseFrequency=%270.65%27 numOctaves=%273%27/></filter><rect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.15%27/></svg>")',
        }}
      />
    </div>
  )
}
