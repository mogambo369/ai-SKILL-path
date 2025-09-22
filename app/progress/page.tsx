"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Trophy,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
  Circle,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  // Mock data
  const overallProgress = {
    completedCourses: 12,
    totalCourses: 18,
    skillsAcquired: 24,
    certificationsEarned: 8,
    studyHours: 156,
    currentStreak: 15,
  }

  const recentAchievements = [
    {
      id: 1,
      title: "Digital Marketing Specialist",
      type: "certification",
      date: "2025-01-15",
      icon: Award,
      color: "text-yellow-500",
    },
    {
      id: 2,
      title: "Completed React Fundamentals",
      type: "course",
      date: "2025-01-12",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      id: 3,
      title: "15-Day Learning Streak",
      type: "milestone",
      date: "2025-01-10",
      icon: Trophy,
      color: "text-green-500",
    },
  ]

  const learningPath = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      progress: 100,
      status: "completed",
      duration: "4 weeks",
      skills: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 2,
      title: "React Development",
      progress: 75,
      status: "in-progress",
      duration: "6 weeks",
      skills: ["React", "JSX", "State Management"],
    },
    {
      id: 3,
      title: "Full-Stack Development",
      progress: 0,
      status: "upcoming",
      duration: "8 weeks",
      skills: ["Node.js", "Express", "MongoDB"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link href="/dashboard" className="hover:text-foreground flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">Progress Tracker</span>
          </div>

          {/* Header Content */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-3xl text-balance">Your Learning Progress</h1>
              <p className="text-muted-foreground mt-2">
                Track your achievements, monitor your learning journey, and celebrate milestones
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Set Goals
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{overallProgress.completedCourses}</div>
              <div className="text-sm text-muted-foreground">Courses Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{overallProgress.skillsAcquired}</div>
              <div className="text-sm text-muted-foreground">Skills Acquired</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{overallProgress.certificationsEarned}</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{overallProgress.studyHours}</div>
              <div className="text-sm text-muted-foreground">Study Hours</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{overallProgress.currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">
                {Math.round((overallProgress.completedCourses / overallProgress.totalCourses) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Learning Path Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Learning Path Progress
                  </CardTitle>
                  <CardDescription>Your current learning journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {learningPath.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {course.status === "completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : course.status === "in-progress" ? (
                            <Circle className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="font-medium">{course.title}</span>
                        </div>
                        <Badge
                          variant={
                            course.status === "completed"
                              ? "default"
                              : course.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {course.status}
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.progress}% complete</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                  <CardDescription>Your latest accomplishments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                      <div className="flex-1">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {achievement.type} • {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
                <CardDescription>Detailed view of all your enrolled courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed course progress view coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Development</CardTitle>
                <CardDescription>Track your skill acquisition and proficiency levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Skills tracking dashboard coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Achievements</CardTitle>
                <CardDescription>Your complete achievement history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Achievement gallery coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
