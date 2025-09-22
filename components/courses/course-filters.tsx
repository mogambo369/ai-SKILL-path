"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw } from "lucide-react"

interface CourseFiltersProps {
  filters: any
  onFilterChange: (key: string, value: string) => void
}

export function CourseFilters({ filters, onFilterChange }: CourseFiltersProps) {
  const categories = [
    "Information Technology",
    "Healthcare",
    "Manufacturing",
    "Construction",
    "Automotive",
    "Agriculture",
    "Tourism & Hospitality",
    "Finance & Banking",
    "Retail",
    "Energy & Power",
  ]

  const providers = [
    "Skill India",
    "NSDC",
    "IIT Academy",
    "Coursera",
    "Udemy Business",
    "LinkedIn Learning",
    "edX",
    "FutureSkills Prime",
  ]

  const clearAllFilters = () => {
    Object.keys(filters).forEach((key) => {
      onFilterChange(key, "")
    })
  }

  const activeFiltersCount = Object.values(filters).filter((value) => value !== "").length

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters ({activeFiltersCount})</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null
                return (
                  <Badge key={key} variant="secondary" className="flex items-center gap-1">
                    {value as string}
                    <button onClick={() => onFilterChange(key, "")} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.category} onValueChange={(value) => onFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Level Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Skill Level</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.level} onValueChange={(value) => onFilterChange("level", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* NSQF Level */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">NSQF Level</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.nsqfLevel} onValueChange={(value) => onFilterChange("nsqfLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All NSQF levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All NSQF levels</SelectItem>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="4">Level 4</SelectItem>
              <SelectItem value="5">Level 5</SelectItem>
              <SelectItem value="6">Level 6</SelectItem>
              <SelectItem value="7">Level 7</SelectItem>
              <SelectItem value="8">Level 8</SelectItem>
              <SelectItem value="9">Level 9</SelectItem>
              <SelectItem value="10">Level 10</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Duration Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.duration} onValueChange={(value) => onFilterChange("duration", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any duration</SelectItem>
              <SelectItem value="0-2">0-2 weeks</SelectItem>
              <SelectItem value="2-4">2-4 weeks</SelectItem>
              <SelectItem value="1-3">1-3 months</SelectItem>
              <SelectItem value="3-6">3-6 months</SelectItem>
              <SelectItem value="6+">6+ months</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.price} onValueChange={(value) => onFilterChange("price", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any price</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="0-1000">₹0 - ₹1,000</SelectItem>
              <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
              <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
              <SelectItem value="10000+">₹10,000+</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Provider Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Provider</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.provider} onValueChange={(value) => onFilterChange("provider", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All providers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All providers</SelectItem>
              {providers.map((provider) => (
                <SelectItem key={provider} value={provider}>
                  {provider}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={filters.rating} onValueChange={(value) => onFilterChange("rating", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any rating</SelectItem>
              <SelectItem value="4.5">4.5+ stars</SelectItem>
              <SelectItem value="4.0">4.0+ stars</SelectItem>
              <SelectItem value="3.5">3.5+ stars</SelectItem>
              <SelectItem value="3.0">3.0+ stars</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
