"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign } from "lucide-react"

export function SalaryInsights() {
  const salaryData = [
    { role: "Solar Technician", salary: "₹5.1 LPA", growth: "+23%" },
    { role: "Data Analyst", salary: "₹6.3 LPA", growth: "+18%" },
    { role: "Digital Marketer", salary: "₹5.1 LPA", growth: "+15%" },
    { role: "App Developer", salary: "₹8.7 LPA", growth: "+25%" },
    { role: "Healthcare Assistant", salary: "₹3.6 LPA", growth: "+12%" },
  ]

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <DollarSign className="w-4 h-4 mr-2 text-green-600" />
          Salary Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {salaryData.map((item) => (
            <div key={item.role} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">{item.role}</div>
                <div className="text-xs text-muted-foreground">Average Salary</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">{item.salary}</div>
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.growth}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
