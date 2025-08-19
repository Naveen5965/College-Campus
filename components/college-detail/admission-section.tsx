import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, FileText } from "lucide-react"
import type { Admission } from "@/types/college"

interface AdmissionSectionProps {
  admissions: Admission[]
}

export default function AdmissionSection({ admissions }: AdmissionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-emerald-600" />
          Admission Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        {admissions.length > 0 ? (
          <div className="space-y-6">
            {admissions.map((admission) => (
              <div key={admission.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-gray-900">Course ID: {admission.course_id}</h3>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {admission.entrance_exam}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Cutoff Score</span>
                    </div>
                    <div className="text-lg font-bold text-emerald-600">{admission.cutoff_score}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Application Deadline</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {new Date(admission.application_deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Eligibility Criteria</h4>
                    <p className="text-gray-600 text-sm">{admission.eligibility_criteria}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Admission Process</h4>
                    <p className="text-gray-600 text-sm">{admission.admission_process}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No admission information available</div>
        )}
      </CardContent>
    </Card>
  )
}
