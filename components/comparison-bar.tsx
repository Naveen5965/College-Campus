"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, BarChart3 } from "lucide-react"
import { useComparison } from "@/contexts/comparison-context"
import Link from "next/link"

export default function ComparisonBar() {
  const { selectedColleges, removeFromComparison, clearComparison } = useComparison()

  if (selectedColleges.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="font-medium text-gray-900">Compare Colleges</span>
              <Badge variant="secondary" className="ml-2 bg-emerald-100 text-emerald-800">
                {selectedColleges.length}
              </Badge>
            </div>

            <div className="flex gap-2">
              {selectedColleges.map((collegeId) => (
                <div key={collegeId} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                  <span>College {collegeId}</span>
                  <button
                    onClick={() => removeFromComparison(collegeId)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={clearComparison} className="text-gray-600">
              Clear All
            </Button>
            <Link href={`/compare?ids=${selectedColleges.join(",")}`}>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Compare Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
