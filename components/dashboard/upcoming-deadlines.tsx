"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertTriangle } from "lucide-react"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      title: "Solar Panel Installation - Module 3",
      type: "Assignment",
      dueDate: "2025-01-22",
      daysLeft: 3,
      priority: "high",
      course: "Solar Panel Installation",
    },
    {
      id: 2,
      title: "Electrical Safety Quiz",
      type: "Assessment",
      dueDate: "2025-01-25",
      daysLeft: 6,
      priority: "medium",
      course: "Electrical Fundamentals",
    },
    {
      id: 3,
      title: "System Design Project",
      type: "Project",
      dueDate: "2025-01-30",
      daysLeft: 11,
      priority: "low",
      course: "System Design & Sizing",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") {
      return <AlertTriangle className="w-3 h-3" />
    }
    return <Clock className="w-3 h-3" />
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-heading text-lg">Upcoming Deadlines</CardTitle>
          <Calendar className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="p-3 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-balance">{deadline.title}</h4>
                  <p className="text-xs text-muted-foreground">{deadline.course}</p>
                </div>
                <Badge className={`text-xs flex items-center gap-1 ${getPriorityColor(deadline.priority)}`}>
                  {getPriorityIcon(deadline.priority)}
                  {deadline.priority}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{deadline.type}</span>
                  <span>•</span>
                  <span>{deadline.daysLeft} days left</span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
          View All Deadlines
        </Button>
      </CardContent>
    </Card>
  )
}
