import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CreditCard } from "lucide-react"
import type { Fee } from "@/types/college"

interface FeesSectionProps {
  fees: Fee[]
}

export default function FeesSection({ fees }: FeesSectionProps) {
  const groupedFees = fees.reduce(
    (acc, fee) => {
      const key = `${fee.academic_year}-${fee.course_id}`
      if (!acc[key]) {
        acc[key] = {
          academic_year: fee.academic_year,
          course_id: fee.course_id,
          fees: [],
        }
      }
      acc[key].fees.push(fee)
      return acc
    },
    {} as Record<string, { academic_year: string; course_id: number; fees: Fee[] }>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
          Fee Structure
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.values(groupedFees).length > 0 ? (
          <div className="space-y-6">
            {Object.values(groupedFees).map((group, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-900">Academic Year {group.academic_year}</h3>
                  <Badge variant="outline">Course ID: {group.course_id}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.fees.map((fee) => (
                    <div key={fee.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{fee.fee_type}</div>
                          <div className="text-2xl font-bold text-emerald-600">
                            {fee.currency} {fee.amount.toLocaleString()}
                          </div>
                        </div>
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total Annual Fee</span>
                    <span className="text-xl font-bold text-emerald-600">
                      ₹ {group.fees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No fee information available</div>
        )}
      </CardContent>
    </Card>
  )
}
