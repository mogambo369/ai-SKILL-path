"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Users, BookOpen, Clock, Star, IndianRupee } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  skills: string[]
  duration: number
  rating: number
  enrollments: number
  provider: string
  recommendationScore?: number
}

interface SkillGap {
  skill: string
  currentLevel: number
  requiredLevel: number
  gap: number
  priority: "high" | "medium" | "low"
  marketDemand: number
  averageSalary: number
}

// Mock learner profile
const mockLearnerProfile = {
  id: "learner-123",
  academicHistory: ["12th Science", "ITI Electrical"],
  skills: ["basic electrical", "computer basics"],
  aspirations: ["solar technician", "renewable energy"],
  location: "Maharashtra",
  preferredLanguage: "Hindi",
  learningPace: "medium" as const,
  completedCourses: [],
  ratings: {},
}

export default function RecommendationEngine() {
  const [recommendations, setRecommendations] = useState<Course[]>([])
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("recommendations")

  const fetchRecommendations = async (type = "hybrid") => {
    setLoading(true)
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learnerProfile: mockLearnerProfile,
          recommendationType: type,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setRecommendations(data.recommendations)
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSkillGapAnalysis = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/skill-gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          learnerProfile: {
            id: mockLearnerProfile.id,
            currentSkills: mockLearnerProfile.skills,
            location: mockLearnerProfile.location,
          },
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSkillGaps(data.analysis.criticalGaps)
      }
    } catch (error) {
      console.error("Failed to fetch skill gap analysis:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
    fetchSkillGapAnalysis()
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6" />
            AI-Powered Career GPS
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Personalized recommendations powered by machine learning and market intelligence
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommendations">Course Recommendations</TabsTrigger>
          <TabsTrigger value="skill-gaps">Skill Gap Analysis</TabsTrigger>
          <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          {/* Recommendation Type Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="outline" onClick={() => fetchRecommendations("hybrid")} disabled={loading}>
              <Brain className="h-4 w-4 mr-2" />
              AI Hybrid
            </Button>
            <Button variant="outline" onClick={() => fetchRecommendations("content-based")} disabled={loading}>
              <BookOpen className="h-4 w-4 mr-2" />
              Content-Based
            </Button>
            <Button variant="outline" onClick={() => fetchRecommendations("collaborative")} disabled={loading}>
              <Users className="h-4 w-4 mr-2" />
              Collaborative
            </Button>
            <Button variant="outline" onClick={() => fetchRecommendations("market-driven")} disabled={loading}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Market-Driven
            </Button>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Generating recommendations...</p>
              </div>
            ) : (
              recommendations.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      {course.recommendationScore && (
                        <Badge variant="secondary">{Math.round(course.recommendationScore * 100)}% match</Badge>
                      )}
                    </div>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {course.duration}h
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.enrollments}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{course.provider}</span>
                        <Button size="sm">Enroll Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="skill-gaps" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {skillGaps.map((gap) => (
              <Card key={gap.skill}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg capitalize">{gap.skill}</CardTitle>
                    <Badge className={getPriorityColor(gap.priority)}>{gap.priority} priority</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level</span>
                        <span>{gap.currentLevel}%</span>
                      </div>
                      <Progress value={gap.currentLevel} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Required Level</span>
                        <span>{gap.requiredLevel}%</span>
                      </div>
                      <Progress value={gap.requiredLevel} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span>Market Demand: {gap.marketDemand}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-green-600" />
                        <span>Avg Salary: ₹{gap.averageSalary.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      View Recommended Courses
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning-path" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Learning Path</CardTitle>
              <CardDescription>AI-generated pathway to become a Solar Technician based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-semibold">Target Role: Solar Technician</h3>
                    <p className="text-sm text-muted-foreground">Estimated completion: 6 months</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">₹35,000</div>
                    <div className="text-sm text-muted-foreground">Average salary</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Electrical Systems Fundamentals", duration: "40h", status: "recommended" },
                    { title: "Solar Panel Installation", duration: "60h", status: "upcoming" },
                    { title: "Safety Protocols & Standards", duration: "20h", status: "upcoming" },
                    { title: "System Maintenance", duration: "45h", status: "upcoming" },
                    { title: "NSQF Certification", duration: "8h", status: "final" },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.duration}</p>
                      </div>
                      <Badge variant={step.status === "recommended" ? "default" : "secondary"}>{step.status}</Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full">Start Learning Path</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
