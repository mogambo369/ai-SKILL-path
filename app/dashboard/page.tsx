import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LearningPathway } from "@/components/dashboard/learning-pathway"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { RecommendedCourses } from "@/components/dashboard/recommended-courses"
import { CareerInsights } from "@/components/dashboard/career-insights"
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines"
import { AchievementsBadges } from "@/components/dashboard/achievements-badges"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AIRecommendations } from "@/components/ai/ai-recommendations"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section & Quick Stats */}
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <ProgressOverview />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <AIRecommendations />
        </Suspense>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
              <LearningPathway />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-80 w-full" />}>
              <RecommendedCourses />
            </Suspense>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Suspense fallback={<Skeleton className="h-48 w-full" />}>
              <QuickActions />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <UpcomingDeadlines />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-48 w-full" />}>
              <AchievementsBadges />
            </Suspense>
          </div>
        </div>

        {/* Bottom Section */}
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <CareerInsights />
        </Suspense>
      </div>
    </div>
  )
}
