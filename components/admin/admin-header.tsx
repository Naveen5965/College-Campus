import { Button } from "@/components/ui/button"
import { GraduationCap, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"

export default function AdminHeader() {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CollegeCompass</span>
            </Link>
            <div className="ml-4 px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
              Admin Panel
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                View Site
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Admin User</span>
            </div>

            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
