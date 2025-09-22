"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, BookOpen, TrendingUp, MapPin, Award, Search, Filter, MoreHorizontal, Eye, Edit } from "lucide-react"

// Mock data for analytics
const skillGapData = [
  { skill: "Solar Installation", demand: 85, supply: 45, gap: 40 },
  { skill: "Digital Marketing", demand: 78, supply: 62, gap: 16 },
  { skill: "Welding", demand: 72, supply: 58, gap: 14 },
  { skill: "Data Analysis", demand: 68, supply: 35, gap: 33 },
  { skill: "Plumbing", demand: 65, supply: 52, gap: 13 },
]

const enrollmentTrends = [
  { month: "Jan", enrollments: 1200, completions: 980 },
  { month: "Feb", enrollments: 1350, completions: 1100 },
  { month: "Mar", enrollments: 1580, completions: 1280 },
  { month: "Apr", enrollments: 1720, completions: 1450 },
  { month: "May", enrollments: 1890, completions: 1620 },
  { month: "Jun", enrollments: 2100, completions: 1850 },
]

const regionalData = [
  { region: "Maharashtra", learners: 2500, color: "#2563eb" },
  { region: "Karnataka", learners: 2200, color: "#3b82f6" },
  { region: "Tamil Nadu", learners: 1900, color: "#1d4ed8" },
  { region: "Gujarat", learners: 1600, color: "#1e40af" },
  { region: "Others", learners: 3800, color: "#1f2937" },
]

const users = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "Learner",
    status: "Active",
    courses: 3,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@institute.edu",
    role: "Trainer",
    status: "Active",
    courses: 12,
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Mumbai Skills Center",
    email: "admin@mumbai.skills",
    role: "Institution",
    status: "Active",
    courses: 45,
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "Amit Patel",
    email: "amit@example.com",
    role: "Learner",
    status: "Inactive",
    courses: 1,
    lastActive: "1 week ago",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Monitor platform performance and manage users across India's vocational training ecosystem
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs opacity-80">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-primary text-secondary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs opacity-80">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-secondary text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-xs opacity-80">+3.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4 to-muted-foreground text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certifications</CardTitle>
              <Award className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9,234</div>
              <p className="text-xs opacity-80">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="analytics">Analytics View</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            {/* Skill Gap Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Skill Gap Analysis
                </CardTitle>
                <CardDescription>Identify high-demand skills with supply shortages across regions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillGapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="demand" fill="hsl(var(--primary))" name="Demand" />
                    <Bar dataKey="supply" fill="hsl(var(--secondary))" name="Supply" />
                    <Bar dataKey="gap" fill="hsl(var(--chart-4))" name="Gap" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enrollment Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                  <CardDescription>Monthly enrollment and completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={enrollmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="enrollments" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="completions" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Regional Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Regional Distribution
                  </CardTitle>
                  <CardDescription>Learner distribution across Indian states</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={regionalData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="learners"
                        label={({ region, percent }) => `${region} ${(percent * 100).toFixed(0)}%`}
                      >
                        {regionalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Management Header */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage learners, trainers, and institutional accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>

                {/* Users Table */}
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-medium">User</th>
                          <th className="text-left p-4 font-medium">Role</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Courses</th>
                          <th className="text-left p-4 font-medium">Last Active</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-t hover:bg-muted/30">
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant={user.role === "Institution" ? "default" : "secondary"}>{user.role}</Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-4">{user.courses}</td>
                            <td className="p-4 text-sm text-muted-foreground">{user.lastActive}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
