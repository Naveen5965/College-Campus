"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { supabase } from "@/lib/supabase/client"

export default function AdminStats() {
  const [collegesByState, setCollegesByState] = useState<any[]>([])
  const [collegesByType, setCollegesByType] = useState<any[]>([])
  const [placementTrends, setPlacementTrends] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    setLoading(true)
    try {
      // Fetch colleges by state
      const { data: stateData } = await supabase.from("colleges").select("state").order("state")

      if (stateData) {
        const stateCount = stateData.reduce((acc: any, college) => {
          acc[college.state] = (acc[college.state] || 0) + 1
          return acc
        }, {})

        setCollegesByState(
          Object.entries(stateCount)
            .map(([state, count]) => ({ state, count }))
            .sort((a: any, b: any) => b.count - a.count)
            .slice(0, 10),
        )
      }

      // Fetch colleges by type
      const { data: typeData } = await supabase.from("colleges").select("type")

      if (typeData) {
        const typeCount = typeData.reduce((acc: any, college) => {
          acc[college.type] = (acc[college.type] || 0) + 1
          return acc
        }, {})

        setCollegesByType(Object.entries(typeCount).map(([type, count]) => ({ type, count })))
      }

      // Fetch placement trends
      const { data: placementData } = await supabase
        .from("placements")
        .select("academic_year, placement_percentage, average_package")
        .order("academic_year")

      if (placementData) {
        const yearlyData = placementData.reduce((acc: any, placement) => {
          const year = placement.academic_year
          if (!acc[year]) {
            acc[year] = {
              year,
              totalPlacement: 0,
              totalPackage: 0,
              count: 0,
            }
          }
          acc[year].totalPlacement += placement.placement_percentage || 0
          acc[year].totalPackage += placement.average_package || 0
          acc[year].count += 1
          return acc
        }, {})

        setPlacementTrends(
          Object.values(yearlyData).map((data: any) => ({
            year: data.year,
            avgPlacement: Math.round(data.totalPlacement / data.count),
            avgPackage: Math.round(data.totalPackage / data.count / 100000), // Convert to lakhs
          })),
        )
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Colleges by State */}
      <Card>
        <CardHeader>
          <CardTitle>Colleges by State (Top 10)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={collegesByState}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Colleges by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Colleges by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={collegesByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {collegesByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Placement Trends */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Placement Trends Over Years</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={placementTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="avgPlacement" fill="#10b981" name="Avg Placement %" />
              <Bar yAxisId="right" dataKey="avgPackage" fill="#3b82f6" name="Avg Package (L)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
