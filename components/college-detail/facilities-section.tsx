import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Wifi, Car, Utensils, Home, BookOpen, Activity } from "lucide-react"
import type { Facility } from "@/types/college"

interface FacilitiesSectionProps {
  facilities: Facility[]
}

const facilityIcons: Record<string, any> = {
  Academic: BookOpen,
  Hostel: Home,
  Transport: Car,
  Cafeteria: Utensils,
  Sports: Activity,
  IT: Wifi,
  Library: BookOpen,
  Laboratory: Building,
}

export default function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  const groupedFacilities = facilities.reduce(
    (acc, facility) => {
      if (!acc[facility.facility_type]) {
        acc[facility.facility_type] = []
      }
      acc[facility.facility_type].push(facility)
      return acc
    },
    {} as Record<string, Facility[]>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2 text-emerald-600" />
          Facilities & Infrastructure
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedFacilities).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedFacilities).map(([facilityType, typeFacilities]) => {
              const IconComponent = facilityIcons[facilityType] || Building

              return (
                <div key={facilityType}>
                  <div className="flex items-center mb-3">
                    <IconComponent className="h-5 w-5 mr-2 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{facilityType}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {typeFacilities.map((facility) => (
                      <div key={facility.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{facility.facility_name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {facility.facility_type}
                          </Badge>
                        </div>

                        {facility.description && <p className="text-sm text-gray-600">{facility.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No facility information available</div>
        )}
      </CardContent>
    </Card>
  )
}
