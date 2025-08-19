"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface ComparisonContextType {
  selectedColleges: number[]
  addToComparison: (collegeId: number) => void
  removeFromComparison: (collegeId: number) => void
  clearComparison: () => void
  isInComparison: (collegeId: number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedColleges, setSelectedColleges] = useState<number[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("college-comparison")
    if (saved) {
      try {
        setSelectedColleges(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading comparison data:", error)
      }
    }
  }, [])

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem("college-comparison", JSON.stringify(selectedColleges))
  }, [selectedColleges])

  const addToComparison = (collegeId: number) => {
    setSelectedColleges((prev) => {
      if (prev.includes(collegeId)) return prev
      if (prev.length >= 4) {
        // Limit to 4 colleges for comparison
        return [...prev.slice(1), collegeId]
      }
      return [...prev, collegeId]
    })
  }

  const removeFromComparison = (collegeId: number) => {
    setSelectedColleges((prev) => prev.filter((id) => id !== collegeId))
  }

  const clearComparison = () => {
    setSelectedColleges([])
  }

  const isInComparison = (collegeId: number) => {
    return selectedColleges.includes(collegeId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        selectedColleges,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
