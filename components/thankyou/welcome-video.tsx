"use client"

import { useRef, useState } from "react"
import { VolumeX } from "lucide-react"

// Standalone 16:9 welcome video with a big center UNMUTE button. The clip
// autoplays muted; tapping the button unmutes AND restarts it from the start.
export function WelcomeVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function unmuteAndRestart() {
    const v = ref.current
    if (!v) return
    v.muted = false
    v.currentTime = 0
    setMuted(false)
    void v.play().catch(() => {})
  }

  // Keep the overlay in sync if the viewer toggles mute via the native controls.
  function handleVolumeChange() {
    const v = ref.current
    if (!v) return
    setMuted(v.muted || v.volume === 0)
  }

  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
      <video
        ref={ref}
        src={src}
        controls
        autoPlay
        muted
        playsInline
        preload="metadata"
        onVolumeChange={handleVolumeChange}
        className="w-full block"
        style={{ aspectRatio: "16/9", objectFit: "cover" }}
      />
      {muted && (
        <button
          type="button"
          onClick={unmuteAndRestart}
          aria-label="Unmute and restart video"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/30 transition-colors hover:bg-black/40"
        >
          <span className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white/95 shadow-xl ring-1 ring-black/5 transition-transform hover:scale-105">
            <VolumeX className="h-9 w-9 md:h-11 md:w-11 text-gray-900" />
          </span>
          <span className="rounded-full bg-black/70 px-4 py-1.5 text-sm font-semibold text-white">
            Tap to unmute
          </span>
        </button>
      )}
    </div>
  )
}
