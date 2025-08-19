import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Award, CheckCircle } from "lucide-react"
import type { College } from "@/types/college"

interface CollegeOverviewProps {
  college: College
}

export default function CollegeOverview({ college }: CollegeOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="h-5 w-5 mr-2 text-emerald-600" />
          College Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">{college.established_year}</div>
            <div className="text-sm text-gray-600">Established</div>
          </div>

          {college.ranking_nirf && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">#{college.ranking_nirf}</div>
              <div className="text-sm text-gray-600">NIRF Ranking</div>
            </div>
          )}

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{college.type}</div>
            <div className="text-sm text-gray-600">College Type</div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">About the College</h3>
          <p className="text-gray-600 leading-relaxed">
            {college.name} is a prestigious {college.type.toLowerCase()} institution established in{" "}
            {college.established_year}
            and located in {college.city}, {college.state}. The college is known for its excellent academic programs,
            state-of-the-art facilities, and strong industry connections that ensure excellent placement opportunities
            for students.
          </p>

          {college.affiliation && (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">Affiliated to {college.affiliation}</span>
            </div>
          )}

          {college.approval && (
            <div className="flex items-center">
              <Award className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-gray-600">Approved by {college.approval}</span>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">Industry-aligned curriculum</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">Experienced faculty</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">Modern infrastructure</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-gray-600">Strong placement record</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
