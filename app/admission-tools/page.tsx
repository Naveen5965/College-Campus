import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, FileText, CheckCircle, Calendar, DollarSign, Bell, Upload } from "lucide-react"
import ApplicationTracker from "@/components/admission-tools/application-tracker"
import DocumentManager from "@/components/admission-tools/document-manager"
import EligibilityChecker from "@/components/admission-tools/eligibility-checker"
import AdmissionCalendar from "@/components/admission-tools/admission-calendar"
import ScholarshipFinder from "@/components/admission-tools/scholarship-finder"

export default function AdmissionToolsPage() {
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
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium">
                Home
              </a>
              <a href="/compare" className="text-gray-700 hover:text-emerald-600 font-medium">
                Compare
              </a>
              <a href="/admission-tools" className="text-emerald-600 font-medium">
                Admission Tools
              </a>
              <a href="/admin" className="text-gray-700 hover:text-emerald-600 font-medium">
                Admin
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Admission <span className="text-emerald-600">Tools</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive tools to streamline your college admission process from application to enrollment
          </p>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card className="text-center p-4 hover:shadow-md transition-shadow">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-sm">Application Tracker</h3>
            </Card>

            <Card className="text-center p-4 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Document Manager</h3>
            </Card>

            <Card className="text-center p-4 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Eligibility Checker</h3>
            </Card>

            <Card className="text-center p-4 hover:shadow-md transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-sm">Admission Calendar</h3>
            </Card>

            <Card className="text-center p-4 hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Scholarship Finder</h3>
            </Card>

            <Card className="text-center p-4 hover:shadow-md transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-sm">Deadline Alerts</h3>
            </Card>
          </div>

          {/* Main Tools Interface */}
          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="tracker">Application Tracker</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            </TabsList>

            <TabsContent value="tracker" className="mt-6">
              <ApplicationTracker />
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <DocumentManager />
            </TabsContent>

            <TabsContent value="eligibility" className="mt-6">
              <EligibilityChecker />
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <AdmissionCalendar />
            </TabsContent>

            <TabsContent value="scholarships" className="mt-6">
              <ScholarshipFinder />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
