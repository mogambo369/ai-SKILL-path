"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Target,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
  Zap,
  Star,
  Calendar,
  PlayCircle,
  PauseCircle,
  CheckCircle,
} from "lucide-react"

interface LearnerProgress {
  learnerId: string
  courseId: string
  courseName: string
  totalModules: number
  completedModules: number
  currentModule: string
  progressPercentage: number
  timeSpent: number
  lastActivity: string
  status: "not-started" | "in-progress" | "completed" | "paused"
  score?: number
  certificateEarned: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: "course" | "skill" | "streak" | "time" | "social"
  rarity: "common" | "rare" | "epic" | "legendary"
  pointsAwarded: number
  unlockedAt: string
}

interface LearnerStats {
  totalPoints: number
  level: number
  streak: number
  coursesCompleted: number
  certificatesEarned: number
  timeSpent: number
  achievements: Achievement[]
  nextLevelPoints: number
}

export default function ProgressTracker() {
  const [progress, setProgress] = useState<LearnerProgress[]>([])
  const [stats, setStats] = useState<LearnerStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const learnerId = "learner-123" // Mock learner ID

  useEffect(() => {
    fetchProgressData()
  }, [])

  const fetchProgressData = async () => {
    setLoading(true)
    try {
      // Fetch progress
      const progressResponse = await fetch(`/api/progress?learnerId=${learnerId}&type=progress`)
      const progressData = await progressResponse.json()

      // Fetch stats
      const statsResponse = await fetch(`/api/progress?learnerId=${learnerId}&type=stats`)
      const statsData = await statsResponse.json()

      // Fetch achievements
      const achievementsResponse = await fetch(`/api/progress?learnerId=${learnerId}&type=achievements`)
      const achievementsData = await achievementsResponse.json()

      if (progressData.success) setProgress(progressData.progress)
      if (statsData.success) setStats(statsData.stats)
      if (achievementsData.success) setAchievements(achievementsData.achievements)
    } catch (error) {
      console.error("Failed to fetch progress data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <PlayCircle className="h-4 w-4 text-blue-500" />
      case "paused":
        return <PauseCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level</CardTitle>
              <Trophy className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.level}</div>
              <p className="text-xs opacity-80">
                {stats.totalPoints} / {stats.nextLevelPoints} XP
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-primary text-secondary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Zap className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak}</div>
              <p className="text-xs opacity-80">days in a row</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-secondary text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
              <p className="text-xs opacity-80">courses finished</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4 to-muted-foreground text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTime(stats.timeSpent)}</div>
              <p className="text-xs opacity-80">total learning</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Progress Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Level Progress */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Level Progress
                </CardTitle>
                <CardDescription>Your journey to the next level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Level {stats.level}</span>
                    <span className="text-muted-foreground">
                      {stats.totalPoints} / {stats.nextLevelPoints} XP
                    </span>
                  </div>
                  <Progress value={(stats.totalPoints / stats.nextLevelPoints) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {stats.nextLevelPoints - stats.totalPoints} XP needed for next level
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progress.slice(0, 3).map((course) => (
                  <div key={course.courseId} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(course.status)}
                      <div>
                        <h4 className="font-medium">{course.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.completedModules} / {course.totalModules} modules completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{course.progressPercentage}%</div>
                      <div className="text-xs text-muted-foreground">{formatTime(course.timeSpent)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{achievement.icon}</div>
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{achievement.pointsAwarded} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="space-y-4">
            {progress.map((course) => (
              <Card key={course.courseId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(course.status)}
                      {course.courseName}
                    </CardTitle>
                    <Badge variant={course.status === "completed" ? "default" : "secondary"}>{course.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {course.completedModules} / {course.totalModules} modules ({course.progressPercentage}%)
                        </span>
                      </div>
                      <Progress value={course.progressPercentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{formatTime(course.timeSpent)}</span>
                      </div>
                      {course.score && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{course.score}% avg</span>
                        </div>
                      )}
                      {course.certificateEarned && (
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-500" />
                          <span>Certified</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(course.lastActivity).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {course.status === "in-progress" && <Button size="sm">Continue Learning</Button>}
                      {course.status === "completed" && course.certificateEarned && (
                        <Button size="sm" variant="outline">
                          Download Certificate
                        </Button>
                      )}
                      {course.status === "paused" && <Button size="sm">Resume Course</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
