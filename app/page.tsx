import CollegeSearch from "@/components/college-search"
import { Button } from "@/components/ui/button"
import { GraduationCap, Search, BarChart3, Users, FileText } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CollegeCompass</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 font-medium">
                Home
              </Link>
              <Link href="/compare" className="text-gray-700 hover:text-emerald-600 font-medium">
                Compare
              </Link>
              <Link href="/admission-tools" className="text-gray-700 hover:text-emerald-600 font-medium">
                Admission Tools
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-emerald-600 font-medium">
                Admin
              </Link>
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <form action="/auth/signout" method="post">
                    <Button variant="outline" size="sm">
                      Sign Out
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="text-emerald-600"> Engineering & Medical</span>
            <br />
            College
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive analysis of colleges with detailed information about admissions, placements, fees, and
            facilities to help you make the right choice for your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              <Search className="h-5 w-5 mr-2" />
              Explore Colleges
            </Button>
            <Link href="/compare">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 bg-transparent"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Compare Colleges
              </Button>
            </Link>
            <Link href="/admission-tools">
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 bg-transparent"
              >
                <FileText className="h-5 w-5 mr-2" />
                Admission Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CollegeCompass?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get comprehensive insights to make informed decisions about your college admission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Advanced filtering by location, type, ranking, and more to find colleges that match your preferences
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Comprehensive data on placements, packages, fees, facilities, and admission requirements
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Reviews</h3>
              <p className="text-gray-600">
                Real reviews and ratings from current students and alumni to get authentic insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* College Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Colleges</h2>
            <p className="text-lg text-gray-600">
              Search and filter through hundreds of engineering and medical colleges
            </p>
          </div>

          <CollegeSearch />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-emerald-400" />
                <span className="ml-2 text-xl font-bold">CollegeCompass</span>
              </div>
              <p className="text-gray-400">
                Your trusted guide for engineering and medical college admissions in India.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Search Colleges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Compare Colleges
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Rankings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Admission Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Placement Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Fee Structure
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Admission Process
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Student Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@collegecompass.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CollegeCompass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
