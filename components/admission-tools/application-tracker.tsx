"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface Application {
  id: string
  collegeName: string
  course: string
  applicationDate: string
  deadline: string
  status: "draft" | "submitted" | "under-review" | "accepted" | "rejected" | "waitlisted"
  progress: number
  documents: string[]
  fees: number
  notes: string
}

const mockApplications: Application[] = [
  {
    id: "1",
    collegeName: "IIT Delhi",
    course: "Computer Science Engineering",
    applicationDate: "2024-01-15",
    deadline: "2024-03-15",
    status: "submitted",
    progress: 75,
    documents: ["10th Certificate", "12th Certificate", "JEE Score"],
    fees: 2500,
    notes: "Waiting for entrance exam results",
  },
  {
    id: "2",
    collegeName: "AIIMS Delhi",
    course: "MBBS",
    applicationDate: "2024-01-20",
    deadline: "2024-03-20",
    status: "under-review",
    progress: 90,
    documents: ["10th Certificate", "12th Certificate", "NEET Score", "Medical Certificate"],
    fees: 1500,
    notes: "Document verification completed",
  },
  {
    id: "3",
    collegeName: "NIT Trichy",
    course: "Mechanical Engineering",
    applicationDate: "2024-02-01",
    deadline: "2024-03-25",
    status: "accepted",
    progress: 100,
    documents: ["10th Certificate", "12th Certificate", "JEE Score"],
    fees: 2000,
    notes: "Admission confirmed, fee payment pending",
  },
]

const statusConfig = {
  draft: { color: "bg-gray-500", icon: Edit, label: "Draft" },
  submitted: { color: "bg-blue-500", icon: Clock, label: "Submitted" },
  "under-review": { color: "bg-yellow-500", icon: AlertCircle, label: "Under Review" },
  accepted: { color: "bg-green-500", icon: CheckCircle, label: "Accepted" },
  rejected: { color: "bg-red-500", icon: XCircle, label: "Rejected" },
  waitlisted: { color: "bg-orange-500", icon: Clock, label: "Waitlisted" },
}

export default function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "all" || app.status === filter
    const matchesSearch =
      app.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: Application["status"]) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
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
      {/* Header with Add Application */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Application Tracker</h2>
          <p className="text-gray-600">Track your college applications and their progress</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search colleges or courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="waitlisted">Waitlisted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredApplications.map((application) => {
          const daysLeft = getDaysUntilDeadline(application.deadline)
          return (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{application.collegeName}</CardTitle>
                    <CardDescription>{application.course}</CardDescription>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Application Progress</span>
                    <span>{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Applied:</span>
                    <p className="font-medium">{new Date(application.applicationDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>
                    <p className={`font-medium ${daysLeft < 7 ? "text-red-600" : "text-gray-900"}`}>
                      {new Date(application.deadline).toLocaleDateString()}
                      {daysLeft > 0 && <span className="text-xs ml-1">({daysLeft} days left)</span>}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Application Fee:</span>
                    <p className="font-medium">₹{application.fees.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Documents:</span>
                    <p className="font-medium">{application.documents.length} uploaded</p>
                  </div>
                </div>

                {/* Notes */}
                {application.notes && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{application.notes}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No applications found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
