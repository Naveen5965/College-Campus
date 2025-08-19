"use client"

import { Button } from "@/components/ui/button"
import { BarChart3, Check } from "lucide-react"
import { useComparison } from "@/contexts/comparison-context"

interface ComparisonButtonProps {
  collegeId: number
}

export default function ComparisonButton({ collegeId }: ComparisonButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()

  const handleToggle = () => {
    if (isInComparison(collegeId)) {
      removeFromComparison(collegeId)
    } else {
      addToComparison(collegeId)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleToggle}
      className={`${
        isInComparison(collegeId)
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
      }`}
    >
      {isInComparison(collegeId) ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Added to Compare
        </>
      ) : (
        <>
          <BarChart3 className="h-4 w-4 mr-2" />
          Compare
        </>
      )}
    </Button>
  )
}
