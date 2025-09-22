"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Clock, ArrowRight, Zap } from "lucide-react"

export function LearningPathway() {
  // Mock pathway data
  const pathway = [
    {
      id: 1,
      title: "Electrical Fundamentals",
      description: "Basic electrical concepts and safety",
      status: "completed",
      progress: 100,
      duration: "2 weeks",
      type: "course",
      skills: ["Electrical Safety", "Circuit Analysis", "Ohm's Law"],
    },
    {
      id: 2,
      title: "Solar Energy Basics",
      description: "Introduction to photovoltaic systems",
      status: "completed",
      progress: 100,
      duration: "3 weeks",
      type: "course",
      skills: ["Solar Physics", "PV Systems", "Energy Conversion"],
    },
    {
      id: 3,
      title: "Solar Panel Installation",
      description: "Hands-on installation techniques",
      status: "in-progress",
      progress: 65,
      duration: "4 weeks",
      type: "practical",
      skills: ["Installation", "Mounting Systems", "Wiring"],
    },
    {
      id: 4,
      title: "System Design & Sizing",
      description: "Design solar systems for different applications",
      status: "upcoming",
      progress: 0,
      duration: "3 weeks",
      type: "course",
      skills: ["System Design", "Load Analysis", "Component Selection"],
    },
    {
      id: 5,
      title: "Maintenance & Troubleshooting",
      description: "Maintain and repair solar installations",
      status: "upcoming",
      progress: 0,
      duration: "2 weeks",
      type: "practical",
      skills: ["Maintenance", "Troubleshooting", "Performance Analysis"],
    },
    {
      id: 6,
      title: "Solar Technician Certification",
      description: "NSQF Level 4 Solar Technician Certificate",
      status: "upcoming",
      progress: 0,
      duration: "1 week",
      type: "certification",
      skills: ["Certification", "Assessment", "Industry Recognition"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-primary" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-800"
      case "practical":
        return "bg-green-100 text-green-800"
      case "certification":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading text-xl">My Personalized Learning Pathway</CardTitle>
            <p className="text-muted-foreground mt-1">AI-curated path to become a Solar Technician</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            AI Optimized
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pathway.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < pathway.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />}

              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">{getStatusIcon(step.status)}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <Badge className={`text-xs ${getTypeColor(step.type)}`}>{step.type}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{step.duration}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3">{step.description}</p>

                  {/* Progress Bar */}
                  {step.status === "in-progress" && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{step.progress}%</span>
                      </div>
                      <Progress value={step.progress} className="h-2" />
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {step.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center space-x-2">
                    {step.status === "completed" && (
                      <Button variant="outline" size="sm" disabled>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </Button>
                    )}
                    {step.status === "in-progress" && (
                      <Button size="sm">
                        Continue Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    {step.status === "upcoming" && (
                      <Button variant="outline" size="sm" disabled>
                        Coming Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pathway Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Based on your profile and market demand, this pathway will help you achieve your career goals.
              </p>
            </div>
            <Button variant="outline">Customize Path</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
