import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Building2 } from "lucide-react"
import type { Placement } from "@/types/college"

interface PlacementSectionProps {
  placements: Placement[]
}

export default function PlacementSection({ placements }: PlacementSectionProps) {
  const latestPlacement = placements.sort((a, b) => b.academic_year.localeCompare(a.academic_year))[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
          Placement Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        {latestPlacement ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">{latestPlacement.placement_percentage}%</div>
                <div className="text-sm text-gray-600">Placement Rate</div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ₹{(latestPlacement.average_package / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-gray-600">Average Package</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  ₹{(latestPlacement.highest_package / 100000).toFixed(1)}L
                </div>
                <div className="text-sm text-gray-600">Highest Package</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{latestPlacement.students_placed}</div>
                <div className="text-sm text-gray-600">Students Placed</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Top Recruiters ({latestPlacement.academic_year})
              </h3>
              <div className="flex flex-wrap gap-2">
                {latestPlacement.top_recruiters.map((recruiter, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    <Building2 className="h-3 w-3 mr-1" />
                    {recruiter}
                  </Badge>
                ))}
              </div>
            </div>

            {placements.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Historical Data</h3>
                <div className="space-y-2">
                  {placements.slice(1, 4).map((placement) => (
                    <div
                      key={placement.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-600">{placement.academic_year}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-emerald-600">{placement.placement_percentage}% placed</span>
                        <span className="text-blue-600">₹{(placement.average_package / 100000).toFixed(1)}L avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No placement data available</div>
        )}
      </CardContent>
    </Card>
  )
}
