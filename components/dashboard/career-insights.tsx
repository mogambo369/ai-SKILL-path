"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin, DollarSign, Users, Briefcase, ArrowRight } from "lucide-react"

export function CareerInsights() {
  const insights = {
    targetRole: "Solar Technician",
    averageSalary: "₹4.5 - 6.8 LPA",
    jobGrowth: "+23%",
    openPositions: 1250,
    topLocations: ["Mumbai", "Pune", "Bangalore", "Chennai"],
    inDemandSkills: ["Solar Installation", "Electrical Safety", "System Design", "Maintenance"],
    companies: ["Tata Power Solar", "Adani Solar", "Vikram Solar", "Waaree Energies"],
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-heading text-xl">Career Market Insights</CardTitle>
            <p className="text-muted-foreground mt-1">Real-time data for Solar Technician roles in India</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Live Data
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Salary Range */}
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <DollarSign className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="font-semibold text-lg">{insights.averageSalary}</div>
            <div className="text-sm text-muted-foreground">Average Salary</div>
          </div>

          {/* Job Growth */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-lg text-green-600">{insights.jobGrowth}</div>
            <div className="text-sm text-muted-foreground">Job Growth (YoY)</div>
          </div>

          {/* Open Positions */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-lg text-blue-600">{insights.openPositions.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Open Positions</div>
          </div>

          {/* Companies Hiring */}
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-lg text-purple-600">{insights.companies.length}+</div>
            <div className="text-sm text-muted-foreground">Top Companies</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Top Locations */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              Top Hiring Locations
            </h4>
            <div className="space-y-2">
              {insights.topLocations.map((location, index) => (
                <div key={location} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-sm">{location}</span>
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* In-Demand Skills */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-primary" />
              Most In-Demand Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {insights.inDemandSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div className="mt-8">
          <h4 className="font-semibold mb-4 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-primary" />
            Companies Actively Hiring
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {insights.companies.map((company) => (
              <div key={company} className="p-3 border border-border rounded-lg text-center">
                <div className="font-medium text-sm">{company}</div>
                <div className="text-xs text-muted-foreground mt-1">Multiple openings</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Ready to Apply?</h4>
              <p className="text-sm text-muted-foreground">
                You're 68% ready for Solar Technician roles. Complete your pathway to increase your chances.
              </p>
            </div>
            <Button>
              Explore Jobs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
