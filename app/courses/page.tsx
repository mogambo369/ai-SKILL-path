"use client"

import { useState } from "react"
import { CourseHeader } from "@/components/courses/course-header"
import { CourseFilters } from "@/components/courses/course-filters"
import { CourseGrid } from "@/components/courses/course-grid"
import { CoursePagination } from "@/components/courses/course-pagination"

export default function CoursesPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    provider: "",
    rating: "",
    nsqfLevel: "",
  })

  const [sortBy, setSortBy] = useState("relevance")
  const [currentPage, setCurrentPage] = useState(1)

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <CourseHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <CourseFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <CourseGrid filters={filters} sortBy={sortBy} onSortChange={handleSortChange} currentPage={currentPage} />

            <CoursePagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
