"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, TrendingUp } from "lucide-react"

export function RecommendedCourses() {
  // Mock recommended courses data
  const courses = [
    {
      id: 1,
      title: "Advanced Solar System Design",
      provider: "Solar Institute of India",
      rating: 4.8,
      students: 1250,
      duration: "6 weeks",
      level: "Intermediate",
      price: "₹2,999",
      image: "/placeholder-wn5dt.png",
      tags: ["High Demand", "NSQF Aligned"],
      description:
        "Master advanced techniques for designing efficient solar power systems for residential and commercial applications.",
    },
    {
      id: 2,
      title: "Electrical Safety & Compliance",
      provider: "National Safety Council",
      rating: 4.9,
      students: 890,
      duration: "3 weeks",
      level: "Beginner",
      price: "₹1,499",
      image: "/placeholder-zdpnp.png",
      tags: ["Certification", "Safety"],
      description: "Essential safety protocols and compliance requirements for electrical work in solar installations.",
    },
    {
      id: 3,
      title: "Battery Storage Systems",
      provider: "Energy Storage Academy",
      rating: 4.7,
      students: 650,
      duration: "4 weeks",
      level: "Intermediate",
      price: "₹3,499",
      image: "/placeholder-pghne.png",
      tags: ["Emerging Tech", "High Salary"],
      description: "Learn to design and install battery storage solutions for solar power systems.",
    },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading text-xl">Recommended for You</CardTitle>
            <p className="text-muted-foreground mt-1">
              AI-selected courses based on your learning path and market trends
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex space-x-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Course Image */}
              <div className="flex-shrink-0">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-32 h-20 object-cover rounded-md"
                />
              </div>

              {/* Course Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-balance">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.provider}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{course.price}</div>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 text-pretty">{course.description}</p>

                {/* Course Meta */}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Tags and Action */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag === "High Demand" && <TrendingUp className="w-3 h-3 mr-1" />}
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm">Enroll Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">AI Insight</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Solar technicians with battery storage skills earn 25% more on average. Consider adding this
                specialization to your pathway.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
