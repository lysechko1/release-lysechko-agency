"use client"
import type React from "react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils" // Assuming cn is available

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  isActive?: boolean
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ children, className, isActive, ...props }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)

    // Scale the movement to be subtle, adjust multiplier for desired effect
    setTransform({ x: x * 0.1, y: y * 0.1 })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  return (
    <button
      ref={buttonRef}
      className={cn(
        "group relative overflow-hidden rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
        "flex items-center justify-center", // Center content
        "border border-gray-200 bg-white text-gray-800 hover:border-amber-400 hover:text-amber-600",
        isActive && "border-amber-500 bg-amber-50 text-amber-800", // Active state styling
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span
        className="relative z-10 transition-transform duration-100 ease-out"
        style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
      >
        {children}
      </span>
      {/* Subtle background glow/effect on hover */}
      <div className="absolute inset-0 bg-amber-100 opacity-0 transition-opacity duration-200 group-hover:opacity-10"></div>
    </button>
  )
}
