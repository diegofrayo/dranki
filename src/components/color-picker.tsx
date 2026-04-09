"use client"

import { cn } from "@/lib/utils"

const DECK_COLORS = [
  "#58CC02", // Green (primary)
  "#1CB0F6", // Blue
  "#FF9600", // Orange
  "#FF4B4B", // Red
  "#A560E8", // Purple
  "#2B70C9", // Dark blue
]

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {DECK_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={cn(
            "w-10 h-10 rounded-full transition-all duration-200",
            value === color 
              ? "ring-2 ring-offset-2 ring-foreground scale-110" 
              : "hover:scale-105"
          )}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={`Select color ${color}`}
          aria-pressed={value === color}
        />
      ))}
    </div>
  )
}
