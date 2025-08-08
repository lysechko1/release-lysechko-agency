"use client"
import type React from "react"
import { InteractiveButton } from "./interactive-button"

interface BudgetSelectorProps {
  options: { key: string; label: string }[]
  selectedBudget: string | null
  onSelect: (budget: string) => void
}

export const BudgetSelector: React.FC<BudgetSelectorProps> = ({ options, selectedBudget, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
      {options.map((option) => (
        <InteractiveButton
          key={option.key}
          onClick={() => onSelect(option.key)}
          isActive={selectedBudget === option.key}
          className="h-auto py-3"
        >
          {option.label}
        </InteractiveButton>
      ))}
    </div>
  )
}
