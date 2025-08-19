"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, DollarSign, BookOpen, TrendingUp, X, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { College, Course, Placement, Fee } from "@/types/college"

interface CollegeComparisonData extends College {
  courses: Course[]
  placements: Placement[]
  fees: Fee[]
  avg_placement_percentage: number
  avg_package: number
  total_annual_fee: number
}

interface ComparisonTableProps {
  colleges: CollegeComparisonData[]
}

export default function ComparisonTable({ colleges }: ComparisonTableProps) {
  const router = useRouter()

  const removeCollege = (collegeId: number) => {
    const currentIds = new URLSearchParams(window.location.search).get("ids")?.split(",") || []
    const newIds = currentIds.filter((id) => id !== collegeId.toString())

    if (newIds.length > 0) {
      router.push(`/compare?ids=${newIds.join(",")}`)
    } else {
      router.push("/compare")
    }
  }

  const comparisonRows = [
    {
      label: "Basic Information",
      items: [
        {
          label: "Location",
          getValue: (college: CollegeComparisonData) => `${college.city}, ${college.state}`,
          icon: MapPin,
        },
        {
          label: "Established",
          getValue: (college: CollegeComparisonData) => college.established_year.toString(),
          icon: Calendar,
        },
        {
          label: "Type",
          getValue: (college: CollegeComparisonData) => college.type,
          icon: BookOpen,
        },
        {
          label: "NIRF Ranking",
          getValue: (college: CollegeComparisonData) =>
            college.ranking_nirf ? `#${college.ranking_nirf}` : "Not Ranked",
          icon: TrendingUp,
        },
      ],
    },
    {
      label: "Academics",
      items: [
        {
          label: "Total Courses",
          getValue: (college: CollegeComparisonData) => college.courses.length.toString(),
          icon: BookOpen,
        },
        {
          label: "Engineering Courses",
          getValue: (college: CollegeComparisonData) =>
            college.courses.filter((c) => c.course_type === "Engineering").length.toString(),
          icon: BookOpen,
        },
        {
          label: "Medical Courses",
          getValue: (college: CollegeComparisonData) =>
            college.courses.filter((c) => c.course_type === "Medical").length.toString(),
          icon: BookOpen,
        },
      ],
    },
    {
      label: "Placements",
      items: [
        {
          label: "Placement Rate",
          getValue: (college: CollegeComparisonData) => `${college.avg_placement_percentage.toFixed(1)}%`,
          icon: Users,
          compare: true,
        },
        {
          label: "Average Package",
          getValue: (college: CollegeComparisonData) => `₹${(college.avg_package / 100000).toFixed(1)}L`,
          icon: DollarSign,
          compare: true,
        },
        {
          label: "Highest Package",
          getValue: (college: CollegeComparisonData) => {
            const highest = Math.max(...college.placements.map((p) => p.highest_package || 0))
            return highest > 0 ? `₹${(highest / 100000).toFixed(1)}L` : "N/A"
          },
          icon: TrendingUp,
          compare: true,
        },
      ],
    },
    {
      label: "Fees",
      items: [
        {
          label: "Annual Fee",
          getValue: (college: CollegeComparisonData) => `₹${college.total_annual_fee.toLocaleString()}`,
          icon: DollarSign,
          compare: true,
          reverse: true, // Lower is better for fees
        },
      ],
    },
  ]

  const getBestValue = (
    colleges: CollegeComparisonData[],
    getValue: (college: CollegeComparisonData) => string,
    reverse = false,
  ) => {
    const values = colleges.map((college) => {
      const value = getValue(college)
      const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ""))
      return { college: college.id, value: numericValue }
    })

    const best = reverse
      ? values.reduce((min, current) => (current.value < min.value ? current : min))
      : values.reduce((max, current) => (current.value > max.value ? current : max))

    return best.college
  }

  return (
    <div className="space-y-8">
      {/* College Headers */}
      <div className="grid gap-6" style={{ gridTemplateColumns: `300px repeat(${colleges.length}, 1fr)` }}>
        <div></div>
        {colleges.map((college) => (
          <Card key={college.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={() => removeCollege(college.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{college.name}</CardTitle>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                {college.city}, {college.state}
              </div>
              {college.ranking_nirf && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 w-fit">
                  #{college.ranking_nirf}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <Link href={`/college/${college.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                >
                  View Details
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Comparison Rows */}
      {comparisonRows.map((section) => (
        <Card key={section.label}>
          <CardHeader>
            <CardTitle className="text-lg">{section.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.items.map((item) => {
                const bestCollegeId = item.compare ? getBestValue(colleges, item.getValue, item.reverse) : null

                return (
                  <div
                    key={item.label}
                    className="grid gap-6 items-center"
                    style={{ gridTemplateColumns: `300px repeat(${colleges.length}, 1fr)` }}
                  >
                    <div className="flex items-center font-medium text-gray-900">
                      <item.icon className="h-4 w-4 mr-2 text-gray-500" />
                      {item.label}
                    </div>
                    {colleges.map((college) => {
                      const value = item.getValue(college)
                      const isBest = bestCollegeId === college.id

                      return (
                        <div
                          key={college.id}
                          className={`text-center p-3 rounded-lg ${
                            isBest
                              ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
                              : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {value}
                          {isBest && item.compare && <div className="text-xs text-emerald-600 mt-1">Best</div>}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add More Colleges */}
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-gray-500 mb-4">Want to compare more colleges?</div>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Add More Colleges</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
