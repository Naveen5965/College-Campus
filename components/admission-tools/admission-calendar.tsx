"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, AlertTriangle, Bell, Plus } from "lucide-react"

interface AdmissionEvent {
  id: string
  title: string
  college: string
  date: string
  endDate?: string
  type: "application" | "exam" | "result" | "counseling" | "deadline" | "interview"
  priority: "high" | "medium" | "low"
  description: string
  status: "upcoming" | "ongoing" | "completed"
  reminderSet: boolean
}

const mockEvents: AdmissionEvent[] = [
  {
    id: "1",
    title: "JEE Main Application Deadline",
    college: "NTA",
    date: "2024-03-15",
    type: "deadline",
    priority: "high",
    description: "Last date to apply for JEE Main 2024",
    status: "upcoming",
    reminderSet: true,
  },
  {
    id: "2",
    title: "NEET Exam Date",
    college: "NTA",
    date: "2024-05-05",
    type: "exam",
    priority: "high",
    description: "NEET UG 2024 examination",
    status: "upcoming",
    reminderSet: true,
  },
  {
    id: "3",
    title: "IIT Delhi Interview",
    college: "IIT Delhi",
    date: "2024-04-20",
    type: "interview",
    priority: "high",
    description: "Personal interview for M.Tech admission",
    status: "upcoming",
    reminderSet: false,
  },
  {
    id: "4",
    title: "BITSAT Registration Opens",
    college: "BITS Pilani",
    date: "2024-03-01",
    endDate: "2024-03-31",
    type: "application",
    priority: "medium",
    description: "Registration window for BITSAT 2024",
    status: "ongoing",
    reminderSet: true,
  },
  {
    id: "5",
    title: "JEE Advanced Results",
    college: "IIT",
    date: "2024-06-15",
    type: "result",
    priority: "high",
    description: "JEE Advanced 2024 results declaration",
    status: "upcoming",
    reminderSet: true,
  },
  {
    id: "6",
    title: "JOSAA Counseling Round 1",
    college: "JOSAA",
    date: "2024-06-20",
    endDate: "2024-06-25",
    type: "counseling",
    priority: "high",
    description: "First round of JOSAA counseling",
    status: "upcoming",
    reminderSet: false,
  },
]

const typeConfig = {
  application: { color: "bg-blue-500", label: "Application" },
  exam: { color: "bg-red-500", label: "Exam" },
  result: { color: "bg-green-500", label: "Result" },
  counseling: { color: "bg-purple-500", label: "Counseling" },
  deadline: { color: "bg-orange-500", label: "Deadline" },
  interview: { color: "bg-pink-500", label: "Interview" },
}

const priorityConfig = {
  high: { color: "bg-red-100 text-red-800", label: "High Priority" },
  medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium Priority" },
  low: { color: "bg-green-100 text-green-800", label: "Low Priority" },
}

export default function AdmissionCalendar() {
  const [events, setEvents] = useState<AdmissionEvent[]>(mockEvents)
  const [filter, setFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true
    if (filter === "upcoming") return event.status === "upcoming"
    if (filter === "ongoing") return event.status === "ongoing"
    return event.type === filter
  })

  const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getTypeBadge = (type: AdmissionEvent["type"]) => {
    const config = typeConfig[type]
    return <Badge className={`${config.color} text-white`}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: AdmissionEvent["priority"]) => {
    const config = priorityConfig[priority]
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getDaysUntilEvent = (date: string) => {
    const today = new Date()
    const eventDate = new Date(date)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const toggleReminder = (eventId: string) => {
    setEvents(events.map((event) => (event.id === eventId ? { ...event, reminderSet: !event.reminderSet } : event)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admission Calendar</h2>
          <p className="text-gray-600">Track important admission dates and deadlines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}>
            <Calendar className="h-4 w-4 mr-2" />
            {viewMode === "list" ? "Calendar View" : "List View"}
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold">{events.filter((e) => e.status === "upcoming").length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">
                  {events.filter((e) => e.priority === "high" && e.status === "upcoming").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-green-600">
                  {
                    events.filter((e) => {
                      const days = getDaysUntilEvent(e.date)
                      return days >= 0 && days <= 7
                    }).length
                  }
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reminders Set</p>
                <p className="text-2xl font-bold text-purple-600">{events.filter((e) => e.reminderSet).length}</p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter events" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="application">Applications</SelectItem>
            <SelectItem value="exam">Exams</SelectItem>
            <SelectItem value="result">Results</SelectItem>
            <SelectItem value="counseling">Counseling</SelectItem>
            <SelectItem value="deadline">Deadlines</SelectItem>
            <SelectItem value="interview">Interviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {sortedEvents.map((event) => {
          const daysUntil = getDaysUntilEvent(event.date)
          const isUrgent = daysUntil <= 7 && daysUntil >= 0

          return (
            <Card
              key={event.id}
              className={`hover:shadow-md transition-shadow ${isUrgent ? "border-red-200 bg-red-50" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      {getTypeBadge(event.type)}
                      {getPriorityBadge(event.priority)}
                      {isUrgent && (
                        <Badge className="bg-red-500 text-white">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{event.college}</p>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                      </div>

                      {daysUntil >= 0 && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days left`}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleReminder(event.id)}
                      className={event.reminderSet ? "text-purple-600 border-purple-200" : ""}
                    >
                      <Bell className={`h-4 w-4 mr-1 ${event.reminderSet ? "fill-current" : ""}`} />
                      {event.reminderSet ? "Reminder Set" : "Set Reminder"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
