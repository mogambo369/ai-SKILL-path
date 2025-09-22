"use client"

import { useState } from "react"
import { CareerHeader } from "@/components/careers/career-header"
import { CareerSearch } from "@/components/careers/career-search"
import { CareerPathways } from "@/components/careers/career-pathways"
import { CareerDetails } from "@/components/careers/career-details"
import { SalaryInsights } from "@/components/careers/salary-insights"
import { SkillsInDemand } from "@/components/careers/skills-in-demand"

export default function CareersPage() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <CareerHeader />

      <div className="container mx-auto px-4 py-8">
        <CareerSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Career Pathways */}
          <div className="lg:col-span-2">
            <CareerPathways
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onCareerSelect={setSelectedCareer}
              selectedCareer={selectedCareer}
            />
          </div>

          {/* Right Column - Details and Insights */}
          <div className="space-y-6">
            {selectedCareer ? (
              <CareerDetails careerId={selectedCareer} />
            ) : (
              <>
                <SalaryInsights />
                <SkillsInDemand />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
