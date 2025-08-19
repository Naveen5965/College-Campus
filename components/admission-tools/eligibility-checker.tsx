"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react"

interface EligibilityResult {
  collegeName: string
  course: string
  eligible: boolean
  score: number
  requirements: {
    criteria: string
    required: string
    student: string
    met: boolean
  }[]
  additionalInfo?: string
}

export default function EligibilityChecker() {
  const [formData, setFormData] = useState({
    examType: "",
    examScore: "",
    category: "",
    state: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    course: "",
  })

  const [results, setResults] = useState<EligibilityResult[]>([])
  const [isChecking, setIsChecking] = useState(false)

  const mockResults: EligibilityResult[] = [
    {
      collegeName: "IIT Delhi",
      course: "Computer Science Engineering",
      eligible: true,
      score: 85,
      requirements: [
        { criteria: "JEE Advanced Score", required: "180+", student: "245", met: true },
        { criteria: "12th Percentage", required: "75%+", student: "88%", met: true },
        { criteria: "Age Limit", required: "≤25 years", student: "18 years", met: true },
        { criteria: "Attempts", required: "≤2", student: "1", met: true },
      ],
      additionalInfo: "Strong candidate for admission",
    },
    {
      collegeName: "NIT Trichy",
      course: "Computer Science Engineering",
      eligible: true,
      score: 92,
      requirements: [
        { criteria: "JEE Main Score", required: "200+", student: "245", met: true },
        { criteria: "12th Percentage", required: "75%+", student: "88%", met: true },
        { criteria: "State Quota", required: "Tamil Nadu", student: "Delhi", met: false },
        { criteria: "Category", required: "General/OBC", student: "General", met: true },
      ],
      additionalInfo: "Eligible for All India Quota",
    },
    {
      collegeName: "BITS Pilani",
      course: "Computer Science Engineering",
      eligible: false,
      score: 45,
      requirements: [
        { criteria: "BITSAT Score", required: "300+", student: "245", met: false },
        { criteria: "12th Percentage", required: "80%+", student: "88%", met: true },
        { criteria: "Physics Marks", required: "60%+", student: "85%", met: true },
        { criteria: "Chemistry Marks", required: "60%+", student: "82%", met: true },
      ],
      additionalInfo: "Consider retaking BITSAT for better score",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)

    // Simulate API call
    setTimeout(() => {
      setResults(mockResults)
      setIsChecking(false)
    }, 2000)
  }

  const getEligibilityBadge = (eligible: boolean, score: number) => {
    if (eligible && score >= 80) {
      return (
        <Badge className="bg-green-500 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Highly Eligible
        </Badge>
      )
    } else if (eligible) {
      return (
        <Badge className="bg-blue-500 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Eligible
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-red-500 text-white">
          <XCircle className="h-3 w-3 mr-1" />
          Not Eligible
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Eligibility Checker</h2>
        <p className="text-gray-600">Check your eligibility for various colleges and courses</p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
          <CardDescription>Provide your academic details to check eligibility</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="examType">Entrance Exam</Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) => setFormData({ ...formData, examType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jee-main">JEE Main</SelectItem>
                    <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="bitsat">BITSAT</SelectItem>
                    <SelectItem value="comedk">COMEDK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="examScore">Exam Score/Rank</Label>
                <Input
                  id="examScore"
                  placeholder="Enter your score or rank"
                  value={formData.examScore}
                  onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                    <SelectItem value="ews">EWS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="state">Home State</Label>
                <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tenthPercentage">10th Percentage</Label>
                <Input
                  id="tenthPercentage"
                  placeholder="Enter 10th percentage"
                  value={formData.tenthPercentage}
                  onChange={(e) => setFormData({ ...formData, tenthPercentage: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="twelfthPercentage">12th Percentage</Label>
                <Input
                  id="twelfthPercentage"
                  placeholder="Enter 12th percentage"
                  value={formData.twelfthPercentage}
                  onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="course">Preferred Course</Label>
              <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cse">Computer Science Engineering</SelectItem>
                  <SelectItem value="ece">Electronics & Communication</SelectItem>
                  <SelectItem value="me">Mechanical Engineering</SelectItem>
                  <SelectItem value="ce">Civil Engineering</SelectItem>
                  <SelectItem value="mbbs">MBBS</SelectItem>
                  <SelectItem value="bds">BDS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isChecking}>
              {isChecking ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Checking Eligibility...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Check Eligibility
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Eligibility Results</h3>

          {results.map((result, index) => (
            <Card key={index} className={`border-l-4 ${result.eligible ? "border-l-green-500" : "border-l-red-500"}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{result.collegeName}</CardTitle>
                    <CardDescription>{result.course}</CardDescription>
                  </div>
                  {getEligibilityBadge(result.eligible, result.score)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Requirements Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Criteria</th>
                        <th className="text-left py-2">Required</th>
                        <th className="text-left py-2">Your Score</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.requirements.map((req, reqIndex) => (
                        <tr key={reqIndex} className="border-b">
                          <td className="py-2">{req.criteria}</td>
                          <td className="py-2">{req.required}</td>
                          <td className="py-2">{req.student}</td>
                          <td className="py-2">
                            {req.met ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Additional Info */}
                {result.additionalInfo && (
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{result.additionalInfo}</p>
                    </div>
                  </div>
                )}

                {/* Match Score */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Match Score</span>
                    <span className="text-lg font-bold text-emerald-600">{result.score}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
