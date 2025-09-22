"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Compass, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export function CareerHeader() {
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
          <span className="text-foreground">Career Explorer</span>
        </div>

        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl text-balance">Career Explorer</h1>
            <p className="text-muted-foreground mt-2">
              Discover career paths, salary insights, and skill requirements across industries
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Compass className="w-3 h-3" />
                500+ Career Paths
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Live Market Data
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Industry Insights
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Careers
            </Button>
            <Button>
              <Compass className="w-4 h-4 mr-2" />
              Find My Path
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
