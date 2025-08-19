import { createServerClient } from "@/lib/supabase/server"
import ComparisonTable from "@/components/compare/comparison-table"
import ComparisonHeader from "@/components/compare/comparison-header"
import type { College, Course, Placement, Fee } from "@/types/college"

interface CollegeComparisonData extends College {
  courses: Course[]
  placements: Placement[]
  fees: Fee[]
  avg_placement_percentage: number
  avg_package: number
  total_annual_fee: number
}

async function getCollegesForComparison(ids: string[]): Promise<CollegeComparisonData[]> {
  const supabase = createServerClient()

  if (!supabase || ids.length === 0) {
    return []
  }

  const { data, error } = await supabase
    .from("colleges")
    .select(`
      *,
      courses(*),
      placements(*),
      fees(*)
    `)
    .in("id", ids)

  if (error || !data) {
    return []
  }

  // Process the data to include calculated fields
  return data.map((college) => ({
    ...college,
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
    total_annual_fee:
      college.fees?.length > 0 ? college.fees.reduce((sum: number, f: any) => sum + (f.amount || 0), 0) : 0,
  })) as CollegeComparisonData[]
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { ids?: string }
}) {
  const collegeIds = searchParams.ids ? searchParams.ids.split(",").filter(Boolean) : []
  const colleges = await getCollegesForComparison(collegeIds)

  return (
    <div className="min-h-screen bg-gray-50">
      <ComparisonHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {colleges.length > 0 ? (
          <ComparisonTable colleges={colleges} />
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-xl mb-4">No colleges selected for comparison</div>
            <p className="text-gray-400 mb-8">Add colleges from the search page to start comparing</p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Browse Colleges
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
