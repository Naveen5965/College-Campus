"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Calendar, Users, ExternalLink } from "lucide-react"

interface Scholarship {
  id: string
  name: string
  provider: string
  amount: string
  type: "merit" | "need" | "minority" | "sports" | "research" | "government"
  eligibility: string[]
  deadline: string
  description: string
  applicationLink: string
  requirements: string[]
  benefits: string[]
  renewable: boolean
  applicants: number
}

const mockScholarships: Scholarship[] = [
  {
    id: "1",
    name: "National Merit Scholarship",
    provider: "Government of India",
    amount: "₹50,000/year",
    type: "merit",
    eligibility: ["12th > 90%", "Family income < ₹8 LPA", "Indian citizen"],
    deadline: "2024-04-30",
    description: "Merit-based scholarship for outstanding students pursuing engineering or medical courses",
    applicationLink: "https://scholarships.gov.in",
    requirements: ["Academic transcripts", "Income certificate", "Caste certificate (if applicable)"],
    benefits: ["Tuition fee coverage", "Monthly stipend", "Book allowance"],
    renewable: true,
    applicants: 15000,
  },
  {
    id: "2",
    name: "INSPIRE Scholarship",
    provider: "Department of Science & Technology",
    amount: "₹80,000/year",
    type: "merit",
    eligibility: ["Top 1% in 12th boards", "Pursuing BSc/MSc/Integrated courses"],
    deadline: "2024-05-15",
    description: "Scholarship to inspire students to pursue careers in science and research",
    applicationLink: "https://inspire-dst.gov.in",
    requirements: ["12th marksheet", "Admission proof", "Bank details"],
    benefits: ["Annual scholarship", "Summer research fellowship", "Mentorship"],
    renewable: true,
    applicants: 8000,
  },
  {
    id: "3",
    name: "Minority Community Scholarship",
    provider: "Ministry of Minority Affairs",
    amount: "₹30,000/year",
    type: "minority",
    eligibility: ["Minority community student", "Family income < ₹2.5 LPA", "Merit > 50%"],
    deadline: "2024-03-31",
    description: "Financial assistance for students from minority communities",
    applicationLink: "https://minorityaffairs.gov.in",
    requirements: ["Community certificate", "Income certificate", "Academic records"],
    benefits: ["Tuition assistance", "Maintenance allowance"],
    renewable: true,
    applicants: 25000,
  },
  {
    id: "4",
    name: "Sports Excellence Scholarship",
    provider: "Sports Authority of India",
    amount: "₹1,00,000/year",
    type: "sports",
    eligibility: ["National/State level sports achievement", "Pursuing any degree"],
    deadline: "2024-06-30",
    description: "Support for student-athletes to balance academics and sports",
    applicationLink: "https://sai.gov.in",
    requirements: ["Sports certificates", "Academic transcripts", "Coach recommendation"],
    benefits: ["Full scholarship", "Sports equipment", "Training support"],
    renewable: true,
    applicants: 3000,
  },
  {
    id: "5",
    name: "Research Innovation Grant",
    provider: "AICTE",
    amount: "₹2,00,000",
    type: "research",
    eligibility: ["Engineering students", "Innovative project proposal", "Faculty mentor"],
    deadline: "2024-07-15",
    description: "One-time grant for innovative research projects by engineering students",
    applicationLink: "https://aicte-india.org",
    requirements: ["Project proposal", "Faculty endorsement", "Budget plan"],
    benefits: ["Research funding", "Publication support", "Patent assistance"],
    renewable: false,
    applicants: 5000,
  },
]

const typeConfig = {
  merit: { color: "bg-blue-100 text-blue-800", label: "Merit-Based" },
  need: { color: "bg-green-100 text-green-800", label: "Need-Based" },
  minority: { color: "bg-purple-100 text-purple-800", label: "Minority" },
  sports: { color: "bg-orange-100 text-orange-800", label: "Sports" },
  research: { color: "bg-red-100 text-red-800", label: "Research" },
  government: { color: "bg-gray-100 text-gray-800", label: "Government" },
}

export default function ScholarshipFinder() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [amountFilter, setAmountFilter] = useState<string>("all")

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || scholarship.type === typeFilter

    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "high" && scholarship.amount.includes("1,00,000")) ||
      (amountFilter === "medium" && (scholarship.amount.includes("50,000") || scholarship.amount.includes("80,000"))) ||
      (amountFilter === "low" && scholarship.amount.includes("30,000"))

    return matchesSearch && matchesType && matchesAmount
  })

  const getTypeBadge = (type: Scholarship["type"]) => {
    const config = typeConfig[type]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Scholarship Finder</h2>
        <p className="text-gray-600">Discover scholarships and financial aid opportunities</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Scholarships</p>
                <p className="text-2xl font-bold">{scholarships.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Merit-Based</p>
                <p className="text-2xl font-bold text-blue-600">
                  {scholarships.filter((s) => s.type === "merit").length}
                </p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 text-xs">Merit</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Closing Soon</p>
                <p className="text-2xl font-bold text-red-600">
                  {scholarships.filter((s) => getDaysUntilDeadline(s.deadline) <= 30).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {scholarships.filter((s) => s.amount.includes("1,00,000") || s.amount.includes("2,00,000")).length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="merit">Merit-Based</SelectItem>
            <SelectItem value="need">Need-Based</SelectItem>
            <SelectItem value="minority">Minority</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="research">Research</SelectItem>
          </SelectContent>
        </Select>

        <Select value={amountFilter} onValueChange={setAmountFilter}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Filter by amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Amounts</SelectItem>
            <SelectItem value="high">₹1,00,000+</SelectItem>
            <SelectItem value="medium">₹50,000 - ₹1,00,000</SelectItem>
            <SelectItem value="low">Under ₹50,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Scholarships List */}
      <div className="space-y-6">
        {filteredScholarships.map((scholarship) => {
          const daysLeft = getDaysUntilDeadline(scholarship.deadline)
          const isUrgent = daysLeft <= 30 && daysLeft >= 0

          return (
            <Card
              key={scholarship.id}
              className={`hover:shadow-md transition-shadow ${isUrgent ? "border-red-200" : ""}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{scholarship.name}</CardTitle>
                    <CardDescription className="text-base">{scholarship.provider}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getTypeBadge(scholarship.type)}
                    {isUrgent && (
                      <Badge className="bg-red-500 text-white">
                        <Calendar className="h-3 w-3 mr-1" />
                        {daysLeft} days left
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">{scholarship.description}</p>

                {/* Key Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm text-gray-500">Amount</span>
                    <p className="font-semibold text-green-600 text-lg">{scholarship.amount}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Deadline</span>
                    <p className="font-semibold">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Applicants</span>
                    <p className="font-semibold flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {scholarship.applicants.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.eligibility.map((criteria, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {criteria}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-semibold mb-2">Required Documents</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {scholarship.requirements.map((req, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-2">Benefits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {scholarship.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {scholarship.renewable && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        Renewable
                      </Badge>
                    )}
                  </div>

                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No scholarships found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent"
            onClick={() => {
              setSearchTerm("")
              setTypeFilter("all")
              setAmountFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
