"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Clock, Award } from "lucide-react"

export function ProgressOverview() {
  // Mock data - in real app, this would come from API
  const stats = {
    overallProgress: 68,
    coursesCompleted: 3,
    totalCourses: 7,
    skillsGained: 12,
    hoursLearned: 45,
    currentStreak: 7,
    nextMilestone: "Solar Installation Certification",
    estimatedCompletion: "2 months",
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl lg:text-3xl text-balance">Welcome back, Rajesh! 👋</h1>
            <p className="text-muted-foreground mt-2">
              You're making great progress on your journey to become a Solar Technician. Keep it up!
            </p>
          </div>
          <div className="hidden md:block">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {stats.currentStreak} day streak 🔥
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overallProgress}%</div>
            <Progress value={stats.overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats.coursesCompleted} of {stats.totalCourses} courses completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Gained</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.skillsGained}</div>
            <p className="text-xs text-muted-foreground mt-2">New skills acquired this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoursLearned}h</div>
            <p className="text-xs text-muted-foreground mt-2">Total learning time this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold text-balance">{stats.nextMilestone}</div>
            <p className="text-xs text-muted-foreground mt-2">Est. completion: {stats.estimatedCompletion}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
