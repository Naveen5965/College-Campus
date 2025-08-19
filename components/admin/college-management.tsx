"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, MapPin, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import AddCollegeForm from "./add-college-form"
import type { College } from "@/types/college"

export default function CollegeManagement() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    fetchColleges()
  }, [searchTerm])

  const fetchColleges = async () => {
    setLoading(true)
    try {
      let query = supabase.from("colleges").select("*").order("name", { ascending: true })

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,state.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query.limit(50)

      if (error) {
        console.error("Error fetching colleges:", error)
        return
      }

      setColleges(data || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (collegeId: number) => {
    if (!confirm("Are you sure you want to delete this college? This action cannot be undone.")) {
      return
    }

    try {
      const { error } = await supabase.from("colleges").delete().eq("id", collegeId)

      if (error) {
        console.error("Error deleting college:", error)
        alert("Failed to delete college")
        return
      }

      setColleges(colleges.filter((college) => college.id !== collegeId))
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to delete college")
    }
  }

  const handleCollegeAdded = (newCollege: College) => {
    setColleges([newCollege, ...colleges])
    setIsAddDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>College Management</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add College
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New College</DialogTitle>
              </DialogHeader>
              <AddCollegeForm onSuccess={handleCollegeAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Colleges Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Established</TableHead>
                  <TableHead>NIRF Ranking</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading colleges...
                    </TableCell>
                  </TableRow>
                ) : colleges.length > 0 ? (
                  colleges.map((college) => (
                    <TableRow key={college.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{college.name}</div>
                          <div className="text-sm text-gray-500">ID: {college.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {college.city}, {college.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{college.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {college.established_year}
                        </div>
                      </TableCell>
                      <TableCell>
                        {college.ranking_nirf ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                            #{college.ranking_nirf}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">Not Ranked</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(college.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No colleges found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
