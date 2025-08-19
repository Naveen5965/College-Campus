import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Phone, Mail, ExternalLink, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ComparisonButton from "@/components/comparison-button"
import type { College } from "@/types/college"

interface CollegeHeaderProps {
  college: College
}

export default function CollegeHeader({ college }: CollegeHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{college.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {college.city}, {college.state}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Established {college.established_year}
                  </div>
                  {college.affiliation && <div>Affiliated to {college.affiliation}</div>}
                </div>
              </div>

              {college.ranking_nirf && (
                <div className="text-center">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 text-lg px-3 py-1">
                    #{college.ranking_nirf}
                  </Badge>
                  <div className="text-xs text-gray-500 mt-1">NIRF Ranking</div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                {college.type}
              </Badge>
              {college.approval && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {college.approval} Approved
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {college.contact_phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {college.contact_phone}
                </div>
              )}
              {college.contact_email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-1" />
                  {college.contact_email}
                </div>
              )}
              {college.website_url && (
                <a
                  href={college.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-emerald-600 hover:text-emerald-700"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Star className="h-4 w-4 mr-2" />
              Add to Favorites
            </Button>
            <ComparisonButton collegeId={college.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
