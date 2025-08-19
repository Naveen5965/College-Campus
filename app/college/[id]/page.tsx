import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import CollegeHeader from "@/components/college-detail/college-header"
import CollegeOverview from "@/components/college-detail/college-overview"
import CoursesSection from "@/components/college-detail/courses-section"
import PlacementSection from "@/components/college-detail/placement-section"
import FeesSection from "@/components/college-detail/fees-section"
import FacilitiesSection from "@/components/college-detail/facilities-section"
import AdmissionSection from "@/components/college-detail/admission-section"
import ReviewsSection from "@/components/college-detail/reviews-section"
import type { College, Course, Placement, Fee, Facility, Admission, Review } from "@/types/college"

interface CollegeDetailData extends College {
  courses: Course[]
  placements: Placement[]
  fees: Fee[]
  facilities: Facility[]
  admissions: Admission[]
  reviews: Review[]
}

async function getCollegeDetails(id: string): Promise<CollegeDetailData | null> {
  const supabase = createServerClient()

  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from("colleges")
    .select(`
      *,
      courses(*),
      placements(*),
      fees(*),
      facilities(*),
      admissions(*),
      reviews(*)
    `)
    .eq("id", id)
    .single()

  if (error || !data) {
    return null
  }

  return data as CollegeDetailData
}

export default async function CollegeDetailPage({ params }: { params: { id: string } }) {
  const college = await getCollegeDetails(params.id)

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CollegeHeader college={college} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CollegeOverview college={college} />
            <CoursesSection courses={college.courses} />
            <PlacementSection placements={college.placements} />
            <FeesSection fees={college.fees} />
            <FacilitiesSection facilities={college.facilities} />
            <AdmissionSection admissions={college.admissions} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ReviewsSection reviews={college.reviews} collegeId={college.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
