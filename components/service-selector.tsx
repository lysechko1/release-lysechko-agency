"use client"
import type React from "react"
import { InteractiveButton } from "./interactive-button"

interface ServiceSelectorProps {
  options: { key: string; label: string }[]
  selectedServices: string[]
  onSelect: (services: string[]) => void
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ options, selectedServices, onSelect }) => {
  const handleToggle = (serviceKey: string) => {
    if (selectedServices.includes(serviceKey)) {
      onSelect(selectedServices.filter((s) => s !== serviceKey))
    } else {
      onSelect([...selectedServices, serviceKey])
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {options.map((option) => (
        <InteractiveButton
          key={option.key}
          onClick={() => handleToggle(option.key)}
          isActive={selectedServices.includes(option.key)}
          className="h-auto py-3"
        >
          {option.label}
        </InteractiveButton>
      ))}
    </div>
  )
}
