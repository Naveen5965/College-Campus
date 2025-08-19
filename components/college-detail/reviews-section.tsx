import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare, CheckCircle, User } from "lucide-react"
import type { Review } from "@/types/college"

interface ReviewsSectionProps {
  reviews: Review[]
  collegeId: number
}

export default function ReviewsSection({ reviews, collegeId }: ReviewsSectionProps) {
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      reviews.length > 0 ? (reviews.filter((review) => review.rating === rating).length / reviews.length) * 100 : 0,
  }))

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-emerald-600" />
            Student Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= averageRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-gray-600">{reviews.length} reviews</div>
          </div>

          <div className="space-y-2 mb-6">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{review.student_name}</div>
                        <div className="text-xs text-gray-500">
                          {review.course} • Class of {review.graduation_year}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {review.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <Badge variant="outline" className="text-xs">
                        {review.rating}★
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{review.review_text}</p>

                  <div className="text-xs text-gray-400 mt-2">{new Date(review.created_at).toLocaleDateString()}</div>
                </div>
              ))}

              {reviews.length > 5 && (
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Reviews ({reviews.length})
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No reviews yet. Be the first to review this college!</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
