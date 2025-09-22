"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Target, Sparkles } from "lucide-react"

interface Recommendation {
  course_id: string
  title: string
  category: string
  difficulty: string
  predicted_rating: number
  reason: string
}

interface SkillAssessment {
  predicted_skill: string
  confidence: Record<string, number>
  strengths: string[]
  areas_for_improvement: string[]
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [skillAssessment, setSkillAssessment] = useState<SkillAssessment | null>(null)
  const [loading, setLoading] = useState(false)

  const generateRecommendations = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current_user",
          userMetrics: {
            age: 28,
            time_available_per_week: 10,
            avg_completion_rate: 0.85,
            courses_completed: 5,
            total_time_spent: 120,
            avg_rating_given: 4.2,
          },
        }),
      })

      const data = await response.json()
      if (data.success) {
        setRecommendations(data.recommendations)
        setSkillAssessment(data.skillAssessment)
      }
    } catch (error) {
      console.error("Failed to get AI recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI-Powered Learning Assistant
          </CardTitle>
          <CardDescription>
            Get personalized course recommendations and skill assessments powered by machine learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={generateRecommendations} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Your Learning Profile...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Generate AI Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {skillAssessment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Skill Level Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Predicted Skill Level</span>
                <Badge variant="secondary">{skillAssessment.predicted_skill}</Badge>
              </div>
              <div className="space-y-2">
                {Object.entries(skillAssessment.confidence).map(([level, confidence]) => (
                  <div key={level} className="flex items-center gap-3">
                    <span className="w-20 text-sm">{level}</span>
                    <Progress value={confidence * 100} className="flex-1" />
                    <span className="text-sm text-muted-foreground">{(confidence * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                <div className="space-y-1">
                  {skillAssessment.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                <div className="space-y-1">
                  {skillAssessment.areas_for_improvement.map((area, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Personalized Course Recommendations
            </CardTitle>
            <CardDescription>Based on machine learning analysis of your learning patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={rec.course_id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{rec.difficulty}</Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{rec.predicted_rating.toFixed(1)}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < Math.floor(rec.predicted_rating) ? "text-yellow-400" : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{rec.category}</p>
                  <p className="text-sm">{rec.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
