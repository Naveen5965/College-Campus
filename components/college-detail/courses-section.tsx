import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users } from "lucide-react"
import type { Course } from "@/types/college"

interface CoursesSectionProps {
  courses: Course[]
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  const groupedCourses = courses.reduce(
    (acc, course) => {
      if (!acc[course.course_type]) {
        acc[course.course_type] = []
      }
      acc[course.course_type].push(course)
      return acc
    },
    {} as Record<string, Course[]>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-emerald-600" />
          Courses Offered
        </CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(groupedCourses).map(([courseType, typeCourses]) => (
          <div key={courseType} className="mb-6 last:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{courseType}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {typeCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{course.course_name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {course.course_type}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration: {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Total Seats: {course.seats_total}
                    </div>
                    {course.seats_available > 0 && (
                      <div className="text-green-600 font-medium">{course.seats_available} seats available</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {courses.length === 0 && <div className="text-center py-8 text-gray-500">No course information available</div>}
      </CardContent>
    </Card>
  )
}
