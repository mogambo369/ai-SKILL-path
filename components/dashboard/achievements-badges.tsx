"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Zap, Target } from "lucide-react"

export function AchievementsBadges() {
  const achievements = [
    {
      id: 1,
      title: "First Course Complete",
      description: "Completed your first course",
      icon: Award,
      earned: true,
      date: "Dec 15, 2024",
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "7-day learning streak",
      icon: Zap,
      earned: true,
      date: "Jan 10, 2025",
    },
    {
      id: 3,
      title: "Skill Collector",
      description: "Gained 10+ new skills",
      icon: Star,
      earned: true,
      date: "Jan 15, 2025",
    },
    {
      id: 4,
      title: "Goal Achiever",
      description: "Reached 50% pathway completion",
      icon: Target,
      earned: false,
      progress: 68,
    },
  ]

  const recentBadges = achievements.filter((a) => a.earned).slice(0, 3)

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="font-heading text-lg">Recent Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBadges.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <achievement.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Achievement */}
        <div className="mt-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <Target className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">Next: Goal Achiever</h4>
              <p className="text-xs text-muted-foreground">18% more to unlock</p>
            </div>
            <Badge variant="outline" className="text-xs">
              68%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
