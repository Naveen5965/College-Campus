"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Download, Eye, Trash2, CheckCircle, AlertTriangle, Plus } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  category: "academic" | "identity" | "medical" | "financial" | "other"
  uploadDate: string
  size: string
  status: "verified" | "pending" | "rejected"
  expiryDate?: string
  isRequired: boolean
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "10th Grade Certificate",
    type: "PDF",
    category: "academic",
    uploadDate: "2024-01-15",
    size: "2.3 MB",
    status: "verified",
    isRequired: true,
  },
  {
    id: "2",
    name: "12th Grade Certificate",
    type: "PDF",
    category: "academic",
    uploadDate: "2024-01-16",
    size: "1.8 MB",
    status: "verified",
    isRequired: true,
  },
  {
    id: "3",
    name: "JEE Main Scorecard",
    type: "PDF",
    category: "academic",
    uploadDate: "2024-02-01",
    size: "1.2 MB",
    status: "pending",
    isRequired: true,
  },
  {
    id: "4",
    name: "Aadhar Card",
    type: "PDF",
    category: "identity",
    uploadDate: "2024-01-10",
    size: "0.8 MB",
    status: "verified",
    isRequired: true,
  },
  {
    id: "5",
    name: "Medical Certificate",
    type: "PDF",
    category: "medical",
    uploadDate: "2024-01-20",
    size: "1.5 MB",
    status: "rejected",
    expiryDate: "2024-12-31",
    isRequired: false,
  },
]

const categoryConfig = {
  academic: { color: "bg-blue-100 text-blue-800", label: "Academic" },
  identity: { color: "bg-purple-100 text-purple-800", label: "Identity" },
  medical: { color: "bg-green-100 text-green-800", label: "Medical" },
  financial: { color: "bg-yellow-100 text-yellow-800", label: "Financial" },
  other: { color: "bg-gray-100 text-gray-800", label: "Other" },
}

const statusConfig = {
  verified: { color: "bg-green-500", icon: CheckCircle, label: "Verified" },
  pending: { color: "bg-yellow-500", icon: AlertTriangle, label: "Pending" },
  rejected: { color: "bg-red-500", icon: AlertTriangle, label: "Rejected" },
}

export default function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocuments = documents.filter((doc) => {
    const matchesFilter = filter === "all" || doc.category === filter
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: Document["status"]) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const getCategoryBadge = (category: Document["category"]) => {
    const config = categoryConfig[category]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const requiredDocuments = [
    "10th Grade Certificate",
    "12th Grade Certificate",
    "JEE/NEET Scorecard",
    "Aadhar Card",
    "Passport Photo",
    "Caste Certificate (if applicable)",
    "Income Certificate",
    "Migration Certificate",
  ]

  const uploadedDocNames = documents.map((doc) => doc.name)
  const missingDocuments = requiredDocuments.filter(
    (doc) => !uploadedDocNames.some((uploaded) => uploaded.includes(doc.split(" ")[0])),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
          <p className="text-gray-600">Upload and manage your admission documents</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">
                  {documents.filter((d) => d.status === "verified").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {documents.filter((d) => d.status === "pending").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Missing</p>
                <p className="text-2xl font-bold text-red-600">{missingDocuments.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Missing Documents Alert */}
      {missingDocuments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Missing Required Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {missingDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                  <span className="text-sm">{doc}</span>
                  <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                    <Plus className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="identity">Identity</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{document.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getCategoryBadge(document.category)}
                      {document.isRequired && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {document.type} • {document.size} • Uploaded {new Date(document.uploadDate).toLocaleDateString()}
                      {document.expiryDate && (
                        <span className="ml-2">• Expires {new Date(document.expiryDate).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(document.status)}
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
