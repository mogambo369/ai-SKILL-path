"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, MessageCircle, FileText, Calendar, Award } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      icon: BookOpen,
      label: "Continue Learning",
      description: "Resume your current course",
      action: "continue",
    },
    {
      icon: Search,
      label: "Explore Courses",
      description: "Find new learning opportunities",
      action: "explore",
    },
    {
      icon: MessageCircle,
      label: "Ask AI Mentor",
      description: "Get personalized guidance",
      action: "mentor",
    },
    {
      icon: FileText,
      label: "View Certificates",
      description: "Download your achievements",
      action: "certificates",
    },
    {
      icon: Calendar,
      label: "Schedule Study",
      description: "Plan your learning time",
      action: "schedule",
    },
    {
      icon: Award,
      label: "Skill Assessment",
      description: "Test your knowledge",
      action: "assessment",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:border-primary/20 bg-transparent"
            >
              <action.icon className="w-5 h-5 text-primary" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs text-muted-foreground text-balance">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
