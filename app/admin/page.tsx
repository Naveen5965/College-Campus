import { createServerClient } from "@/lib/supabase/server"
import AdminHeader from "@/components/admin/admin-header"
import AdminStats from "@/components/admin/admin-stats"
import CollegeManagement from "@/components/admin/college-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Building, Users, DollarSign } from "lucide-react"

async function getAdminStats() {
  const supabase = createServerClient()

  if (!supabase) {
    return {
      totalColleges: 0,
      totalCourses: 0,
      totalReviews: 0,
      avgPlacementRate: 0,
    }
  }

  const [collegesResult, coursesResult, reviewsResult, placementsResult] = await Promise.all([
    supabase.from("colleges").select("id", { count: "exact" }),
    supabase.from("courses").select("id", { count: "exact" }),
    supabase.from("reviews").select("id", { count: "exact" }),
    supabase.from("placements").select("placement_percentage"),
  ])

  const avgPlacementRate =
    placementsResult.data && placementsResult.data.length > 0
      ? placementsResult.data.reduce((sum, p) => sum + (p.placement_percentage || 0), 0) / placementsResult.data.length
      : 0

  return {
    totalColleges: collegesResult.count || 0,
    totalCourses: coursesResult.count || 0,
    totalReviews: reviewsResult.count || 0,
    avgPlacementRate: Math.round(avgPlacementRate * 10) / 10,
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Colleges</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalColleges}</div>
              <p className="text-xs text-muted-foreground">Active institutions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Available programs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Student Reviews</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalReviews}</div>
              <p className="text-xs text-muted-foreground">User feedback</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Placement Rate</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgPlacementRate}%</div>
              <p className="text-xs text-muted-foreground">Across all colleges</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="colleges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="colleges">Colleges</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="colleges">
            <CollegeManagement />
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Course management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placements">
            <Card>
              <CardHeader>
                <CardTitle>Placement Data Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Placement data management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Review Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Review moderation interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AdminStats />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
