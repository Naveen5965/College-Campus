import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

export default function ComparisonHeader() {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Search
              </Button>
            </Link>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">College Comparison</span>
            </div>
          </div>

          <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Share Comparison
          </Button>
        </div>
      </div>
    </div>
  )
}
