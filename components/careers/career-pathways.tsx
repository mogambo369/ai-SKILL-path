"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Clock, Users, ArrowRight, Star } from "lucide-react"

interface CareerPathwaysProps {
  searchQuery: string
  selectedCategory: string
  onCareerSelect: (careerId: string) => void
  selectedCareer: string | null
}

export function CareerPathways({ searchQuery, selectedCategory, onCareerSelect, selectedCareer }: CareerPathwaysProps) {
  // Mock career data
  const careers = [
    {
      id: "solar-technician",
      title: "Solar Technician",
      category: "Energy & Power",
      description: "Install, maintain, and repair solar panel systems for residential and commercial properties.",
      salaryRange: "₹3.5 - 6.8 LPA",
      growth: "+23%",
      openings: 1250,
      experience: "0-2 years",
      skills: ["Solar Installation", "Electrical Safety", "System Design", "Maintenance"],
      trending: true,
      difficulty: "Medium",
      timeToLearn: "4-6 months",
      image: "/solar-technician.png",
    },
    {
      id: "data-analyst",
      title: "Data Analyst",
      category: "Information Technology",
      description: "Analyze complex data sets to help organizations make informed business decisions.",
      salaryRange: "₹4.2 - 8.5 LPA",
      growth: "+18%",
      openings: 2100,
      experience: "0-3 years",
      skills: ["Python", "SQL", "Data Visualization", "Statistics"],
      trending: true,
      difficulty: "Medium",
      timeToLearn: "6-8 months",
      image: "/data-analyst-workspace.png",
    },
    {
      id: "digital-marketer",
      title: "Digital Marketing Specialist",
      category: "Information Technology",
      description: "Create and manage online marketing campaigns across various digital platforms.",
      salaryRange: "₹3.0 - 7.2 LPA",
      growth: "+15%",
      openings: 1800,
      experience: "0-2 years",
      skills: ["SEO", "Social Media", "Content Marketing", "Analytics"],
      trending: false,
      difficulty: "Easy",
      timeToLearn: "3-4 months",
      image: "/digital-marketing-strategy.png",
    },
    {
      id: "healthcare-assistant",
      title: "Healthcare Assistant",
      category: "Healthcare",
      description: "Provide basic patient care and support medical professionals in healthcare settings.",
      salaryRange: "₹2.8 - 4.5 LPA",
      growth: "+12%",
      openings: 950,
      experience: "0-1 years",
      skills: ["Patient Care", "Medical Support", "Health Monitoring", "Communication"],
      trending: false,
      difficulty: "Easy",
      timeToLearn: "2-3 months",
      image: "/healthcare-assistant.jpg",
    },
    {
      id: "welder",
      title: "Certified Welder",
      category: "Manufacturing",
      description: "Join metal parts using various welding techniques for construction and manufacturing.",
      salaryRange: "₹3.2 - 5.8 LPA",
      growth: "+8%",
      openings: 750,
      experience: "0-2 years",
      skills: ["TIG Welding", "MIG Welding", "Safety Protocols", "Blueprint Reading"],
      trending: false,
      difficulty: "Medium",
      timeToLearn: "4-5 months",
      image: "/welder.png",
    },
    {
      id: "app-developer",
      title: "Mobile App Developer",
      category: "Information Technology",
      description: "Design and develop mobile applications for iOS and Android platforms.",
      salaryRange: "₹5.5 - 12.0 LPA",
      growth: "+25%",
      openings: 1650,
      experience: "1-3 years",
      skills: ["Flutter", "React Native", "UI/UX Design", "API Integration"],
      trending: true,
      difficulty: "Hard",
      timeToLearn: "8-12 months",
      image: "/mobile-app-developer.jpg",
    },
  ]

  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = !selectedCategory || career.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-xl">{filteredCareers.length} Career Paths Found</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>Click any career to explore details</span>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredCareers.map((career) => (
          <Card
            key={career.id}
            className={`border-0 shadow-sm hover:shadow-md transition-all cursor-pointer ${
              selectedCareer === career.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onCareerSelect(career.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={career.image || "/placeholder.svg"}
                    alt={career.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      {career.trending && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{career.category}</p>
                    <p className="text-sm text-pretty">{career.description}</p>
                  </div>
                </div>
                <Badge className={`${getDifficultyColor(career.difficulty)}`}>{career.difficulty}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              {/* Career Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium">{career.salaryRange}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>{career.growth} growth</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>{career.openings.toLocaleString()} openings</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>{career.timeToLearn}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Experience: {career.experience}</span>
                <Button variant="outline" size="sm">
                  Explore Path
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
