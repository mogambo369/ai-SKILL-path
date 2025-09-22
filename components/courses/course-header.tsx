"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function CourseHeader() {
  return (
    <div className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link href="/dashboard" className="hover:text-foreground flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground">Course Catalog</span>
        </div>

        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-balance">Course Catalog</h1>
            <p className="text-muted-foreground mt-2">
              Discover NSQF-aligned courses and certifications to advance your career
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                2,450+ Courses
              </Badge>
              <Badge variant="outline">NSQF Aligned</Badge>
              <Badge variant="outline">Industry Certified</Badge>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search courses, skills, providers..." className="pl-10 w-80" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
