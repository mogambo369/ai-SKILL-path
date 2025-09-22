"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, MapPin, ArrowRight, CheckCircle, Clock } from "lucide-react"

interface CareerDetailsProps {
  careerId: string
}

export function CareerDetails({ careerId }: CareerDetailsProps) {
  // Mock detailed career data
  const careerDetails = {
    "solar-technician": {
      title: "Solar Technician",
      description:
        "Solar technicians install, maintain, and repair solar panel systems for residential and commercial properties. They work with electrical systems, perform site assessments, and ensure optimal system performance.",
      salaryRange: "₹3.5 - 6.8 LPA",
      averageSalary: "₹5.1 LPA",
      growth: "+23%",
      openings: 1250,
      topLocations: ["Mumbai", "Pune", "Bangalore", "Chennai", "Hyderabad"],
      companies: ["Tata Power Solar", "Adani Solar", "Vikram Solar", "Waaree Energies"],
      requiredSkills: [
        { name: "Solar Installation", level: 90 },
        { name: "Electrical Safety", level: 95 },
        { name: "System Design", level: 75 },
        { name: "Maintenance", level: 85 },
        { name: "Blueprint Reading", level: 70 },
      ],
      learningPath: [
        { title: "Electrical Fundamentals", duration: "2 weeks", completed: true },
        { title: "Solar Energy Basics", duration: "3 weeks", completed: true },
        { title: "Solar Panel Installation", duration: "4 weeks", completed: false, current: true },
        { title: "System Design & Sizing", duration: "3 weeks", completed: false },
        { title: "Maintenance & Troubleshooting", duration: "2 weeks", completed: false },
        { title: "Solar Technician Certification", duration: "1 week", completed: false },
      ],
      jobOutlook:
        "Excellent - Solar energy adoption is rapidly increasing in India with government support and environmental awareness.",
      workEnvironment:
        "Mix of indoor and outdoor work, including rooftops and solar farms. Physical demands include lifting equipment and working at heights.",
    },
  }

  const career = careerDetails[careerId as keyof typeof careerDetails]

  if (!career) {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Select a career to view detailed information</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Career Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl">{career.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-pretty">{career.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <div>
                <div className="font-medium text-sm">{career.averageSalary}</div>
                <div className="text-xs text-muted-foreground">Average Salary</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <div>
                <div className="font-medium text-sm">{career.growth}</div>
                <div className="text-xs text-muted-foreground">Job Growth</div>
              </div>
            </div>
          </div>

          <Button className="w-full">
            Start Learning Path
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Required Skills */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Required Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {career.requiredSkills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Your Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {career.learningPath.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : step.current ? (
                    <Clock className="w-5 h-5 text-primary" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${step.current ? "text-primary" : ""}`}>{step.title}</span>
                    <span className="text-xs text-muted-foreground">{step.duration}</span>
                  </div>
                  {step.current && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Currently Learning
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Locations */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Top Hiring Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {career.topLocations.map((location, index) => (
              <div key={location} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span className="text-sm">{location}</span>
                <Badge variant="outline" className="text-xs">
                  #{index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
