"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Users, Award, TrendingUp, Heart, Share2 } from "lucide-react"

interface CourseGridProps {
  filters: any
  sortBy: string
  onSortChange: (value: string) => void
  currentPage: number
}

export function CourseGrid({ filters, sortBy, onSortChange, currentPage }: CourseGridProps) {
  // Mock course data - in real app, this would be filtered based on props
  const courses = [
    {
      id: 1,
      title: "Solar Panel Installation & Maintenance",
      provider: "Solar Institute of India",
      rating: 4.8,
      reviewCount: 1250,
      students: 5420,
      duration: "6 weeks",
      level: "Intermediate",
      price: 2999,
      originalPrice: 4999,
      image: "/placeholder-2xen9.png",
      category: "Energy & Power",
      nsqfLevel: 4,
      tags: ["High Demand", "NSQF Aligned", "Certification"],
      description:
        "Master the complete process of solar panel installation, from site assessment to system commissioning.",
      skills: ["Solar Installation", "Electrical Safety", "System Design"],
      instructor: "Dr. Rajesh Kumar",
      language: "Hindi, English",
      certificate: true,
      jobPlacement: 85,
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      provider: "Digital Skills Academy",
      rating: 4.7,
      reviewCount: 890,
      students: 3200,
      duration: "4 weeks",
      level: "Beginner",
      price: 1999,
      originalPrice: 3499,
      image: "/placeholder-fholn.png",
      category: "Information Technology",
      nsqfLevel: 3,
      tags: ["Popular", "Career Boost", "Remote Work"],
      description: "Learn essential digital marketing skills including SEO, social media, and content marketing.",
      skills: ["SEO", "Social Media Marketing", "Content Strategy"],
      instructor: "Priya Sharma",
      language: "English",
      certificate: true,
      jobPlacement: 78,
    },
    {
      id: 3,
      title: "Welding Technology & Safety",
      provider: "Manufacturing Skills Council",
      rating: 4.9,
      reviewCount: 650,
      students: 2100,
      duration: "8 weeks",
      level: "Intermediate",
      price: 3499,
      originalPrice: 5999,
      image: "/placeholder-mwbck.png",
      category: "Manufacturing",
      nsqfLevel: 4,
      tags: ["High Salary", "NSQF Aligned", "Hands-on"],
      description: "Comprehensive welding course covering TIG, MIG, and arc welding with safety protocols.",
      skills: ["TIG Welding", "MIG Welding", "Safety Protocols"],
      instructor: "Amit Singh",
      language: "Hindi, English",
      certificate: true,
      jobPlacement: 92,
    },
    {
      id: 4,
      title: "Healthcare Assistant Training",
      provider: "Healthcare Sector Skill Council",
      rating: 4.6,
      reviewCount: 420,
      students: 1800,
      duration: "12 weeks",
      level: "Beginner",
      price: 4999,
      originalPrice: 7999,
      image: "/placeholder-o5oit.png",
      category: "Healthcare",
      nsqfLevel: 3,
      tags: ["Essential Service", "Job Guarantee", "NSQF Aligned"],
      description: "Train to become a certified healthcare assistant with patient care and medical support skills.",
      skills: ["Patient Care", "Medical Support", "Health Monitoring"],
      instructor: "Dr. Meera Patel",
      language: "Hindi, English, Tamil",
      certificate: true,
      jobPlacement: 88,
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      provider: "Tech Skills Institute",
      rating: 4.8,
      reviewCount: 1100,
      students: 4500,
      duration: "10 weeks",
      level: "Advanced",
      price: 5999,
      originalPrice: 9999,
      image: "/mobile-app-development-flutter.jpg",
      category: "Information Technology",
      nsqfLevel: 6,
      tags: ["High Demand", "Remote Work", "Tech Career"],
      description: "Build cross-platform mobile applications using Flutter framework and Dart programming.",
      skills: ["Flutter", "Dart", "Mobile Development"],
      instructor: "Arjun Reddy",
      language: "English",
      certificate: true,
      jobPlacement: 82,
    },
    {
      id: 6,
      title: "Organic Farming & Sustainable Agriculture",
      provider: "Agriculture Skill Council",
      rating: 4.5,
      reviewCount: 320,
      students: 1200,
      duration: "6 weeks",
      level: "Beginner",
      price: 1499,
      originalPrice: 2999,
      image: "/organic-farming-agriculture.jpg",
      category: "Agriculture",
      nsqfLevel: 3,
      tags: ["Sustainable", "Rural Development", "Government Support"],
      description: "Learn modern organic farming techniques and sustainable agricultural practices.",
      skills: ["Organic Farming", "Crop Management", "Soil Health"],
      instructor: "Ramesh Chandra",
      language: "Hindi, English",
      certificate: true,
      jobPlacement: 70,
    },
  ]

  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (courseId: number) => {
    setFavorites((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg">{courses.length.toLocaleString()} courses found</h2>
          <p className="text-sm text-muted-foreground">
            Showing results {(currentPage - 1) * 12 + 1}-{Math.min(currentPage * 12, courses.length)} of{" "}
            {courses.length}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="border-0 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3 flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                  onClick={() => toggleFavorite(course.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(course.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>
                <Button variant="secondary" size="sm" className="w-8 h-8 p-0 bg-white/90 hover:bg-white">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
              {course.originalPrice > course.price && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {course.category}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  NSQF Level {course.nsqfLevel}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg text-balance group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground">{course.provider}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-pretty">{course.description}</p>

              {/* Course Meta */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.reviewCount.toLocaleString()})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4" />
                  <span>{course.jobPlacement}% job placement</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {course.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {course.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag === "High Demand" && <TrendingUp className="w-3 h-3 mr-1" />}
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="font-bold text-lg">{formatPrice(course.price)}</span>
                  {course.originalPrice > course.price && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
                <Button size="sm">Enroll Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
