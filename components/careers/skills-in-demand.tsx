"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap } from "lucide-react"

export function SkillsInDemand() {
  const skills = [
    { name: "Solar Installation", demand: 95, growth: "+28%" },
    { name: "Data Analysis", demand: 88, growth: "+22%" },
    { name: "Digital Marketing", demand: 82, growth: "+18%" },
    { name: "Mobile Development", demand: 90, growth: "+25%" },
    { name: "Healthcare Support", demand: 75, growth: "+15%" },
    { name: "Welding", demand: 70, growth: "+8%" },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Zap className="w-4 h-4 mr-2 text-primary" />
          Skills in High Demand
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{skill.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {skill.growth}
                </Badge>
              </div>
              <Progress value={skill.demand} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">{skill.demand}% demand score</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
