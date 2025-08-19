"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Users, ExternalLink, BarChart3, Check } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useComparison } from "@/contexts/comparison-context"
import Link from "next/link"
import type { College } from "@/types/college"

interface CollegeWithStats extends College {
  course_count?: number
  avg_placement_percentage?: number
  avg_package?: number
}

export default function CollegeSearch() {
  const [colleges, setColleges] = useState<CollegeWithStats[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [sortBy, setSortBy] = useState("ranking")

  const { addToComparison, removeFromComparison, isInComparison } = useComparison()

  useEffect(() => {
    fetchColleges()
  }, [searchTerm, typeFilter, stateFilter, sortBy])

  const fetchColleges = async () => {
    setLoading(true)
    try {
      let query = supabase.from("colleges").select(`
          *,
          courses(count),
          placements(placement_percentage, average_package)
        `)

      // Apply filters
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%`)
      }

      if (typeFilter !== "all") {
        query = query.eq("type", typeFilter)
      }

      if (stateFilter !== "all") {
        query = query.eq("state", stateFilter)
      }

      // Apply sorting
      switch (sortBy) {
        case "ranking":
          query = query.order("ranking_nirf", { ascending: true, nullsLast: true })
          break
        case "name":
          query = query.order("name", { ascending: true })
          break
        case "established":
          query = query.order("established_year", { ascending: false })
          break
        default:
          query = query.order("ranking_nirf", { ascending: true, nullsLast: true })
      }

      const { data, error } = await query.limit(20)

      if (error) {
        console.error("Error fetching colleges:", error)
        return
      }

      // Process the data to include stats
      const processedData =
        data?.map((college) => ({
          ...college,
          course_count: college.courses?.length || 0,
          avg_placement_percentage:
            college.placements?.length > 0
              ? college.placements.reduce((sum: number, p: any) => sum + (p.placement_percentage || 0), 0) /
                college.placements.length
              : 0,
          avg_package:
            college.placements?.length > 0
              ? college.placements.reduce((sum: number, p: any) => sum + (p.average_package || 0), 0) /
                college.placements.length
              : 0,
        })) || []

      setColleges(processedData)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const getUniqueStates = () => {
    const states = colleges.map((college) => college.state).filter(Boolean)
    return [...new Set(states)].sort()
  }

  const handleComparisonToggle = (college: CollegeWithStats) => {
    if (isInComparison(college.id)) {
      removeFromComparison(college.id)
    } else {
      addToComparison(college.id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search colleges, cities, or states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="College Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Both">Both</SelectItem>
            </SelectContent>
          </Select>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {getUniqueStates().map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">NIRF Ranking</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="established">Established Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <Card key={college.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{college.name}</CardTitle>
                    {college.ranking_nirf && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                        #{college.ranking_nirf}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {college.city}, {college.state}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      Est. {college.established_year}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {college.type}
                    </Badge>
                  </div>

                  {college.avg_placement_percentage > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {college.avg_placement_percentage.toFixed(1)}% Placement
                      </div>
                      {college.avg_package > 0 && (
                        <span className="text-emerald-600 font-medium">
                          ₹{(college.avg_package / 100000).toFixed(1)}L avg
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-500">{college.course_count} courses</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleComparisonToggle(college)}
                        className={`${
                          isInComparison(college.id)
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent"
                        }`}
                      >
                        {isInComparison(college.id) ? <Check className="h-3 w-3" /> : <BarChart3 className="h-3 w-3" />}
                      </Button>
                      <Link href={`/college/${college.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 bg-transparent"
                        >
                          View Details
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No colleges found matching your criteria</div>
            <p className="text-gray-400 mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
