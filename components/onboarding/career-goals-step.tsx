"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface CareerGoalsStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

const CAREER_FIELDS = [
  "Information Technology",
  "Healthcare",
  "Manufacturing",
  "Finance & Banking",
  "Education",
  "Retail & E-commerce",
  "Construction",
  "Automotive",
  "Agriculture",
  "Tourism & Hospitality",
  "Media & Entertainment",
  "Government",
  "Non-Profit",
]

const JOB_ROLES = [
  "Software Developer",
  "Data Analyst",
  "Digital Marketer",
  "Graphic Designer",
  "Project Manager",
  "Sales Executive",
  "Customer Service Representative",
  "Accountant",
  "Teacher",
  "Nurse",
  "Electrician",
  "Plumber",
  "Chef",
  "Photographer",
  "Content Writer",
  "Social Media Manager",
]

export function CareerGoalsStep({ data, onUpdate, onNext, onPrev }: CareerGoalsStepProps) {
  const [formData, setFormData] = useState({
    careerField: data.careerField || "",
    targetJobRole: data.targetJobRole || "",
    careerLevel: data.careerLevel || "",
    timeframe: data.timeframe || "",
    salaryExpectation: data.salaryExpectation || "",
    workLocation: data.workLocation || "",
    workType: data.workType || "",
    motivations: data.motivations || [],
    additionalGoals: data.additionalGoals || "",
    ...data,
  })

  const MOTIVATIONS = [
    "Higher salary",
    "Career advancement",
    "Job security",
    "Work-life balance",
    "Personal growth",
    "New challenges",
    "Industry change",
    "Skill development",
    "Entrepreneurship",
    "Remote work opportunities",
  ]

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData)
  }

  const toggleMotivation = (motivation: string) => {
    const newMotivations = formData.motivations.includes(motivation)
      ? formData.motivations.filter((m: string) => m !== motivation)
      : [...formData.motivations, motivation]
    handleChange("motivations", newMotivations)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl mb-2">Career Goals & Aspirations</h3>
        <p className="text-muted-foreground">
          Tell us about your career aspirations so we can create a personalized learning path that aligns with your
          goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="careerField">Preferred Career Field *</Label>
          <Select value={formData.careerField} onValueChange={(value) => handleChange("careerField", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a career field" />
            </SelectTrigger>
            <SelectContent>
              {CAREER_FIELDS.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetJobRole">Target Job Role</Label>
          <Select value={formData.targetJobRole} onValueChange={(value) => handleChange("targetJobRole", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a job role" />
            </SelectTrigger>
            <SelectContent>
              {JOB_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="careerLevel">Desired Career Level</Label>
          <Select value={formData.careerLevel} onValueChange={(value) => handleChange("careerLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select career level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframe">Timeline to Achieve Goal</Label>
          <Select value={formData.timeframe} onValueChange={(value) => handleChange("timeframe", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-months">Within 3 months</SelectItem>
              <SelectItem value="6-months">Within 6 months</SelectItem>
              <SelectItem value="1-year">Within 1 year</SelectItem>
              <SelectItem value="2-years">Within 2 years</SelectItem>
              <SelectItem value="3-years">Within 3+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salaryExpectation">Salary Expectation (Annual)</Label>
          <Select
            value={formData.salaryExpectation}
            onValueChange={(value) => handleChange("salaryExpectation", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="below-3">Below ₹3 LPA</SelectItem>
              <SelectItem value="3-5">₹3-5 LPA</SelectItem>
              <SelectItem value="5-8">₹5-8 LPA</SelectItem>
              <SelectItem value="8-12">₹8-12 LPA</SelectItem>
              <SelectItem value="12-20">₹12-20 LPA</SelectItem>
              <SelectItem value="above-20">Above ₹20 LPA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workLocation">Preferred Work Location</Label>
          <Input
            id="workLocation"
            value={formData.workLocation}
            onChange={(e) => handleChange("workLocation", e.target.value)}
            placeholder="e.g., Mumbai, Bangalore, Remote"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="workType">Work Type Preference</Label>
          <Select value={formData.workType} onValueChange={(value) => handleChange("workType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select work type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time Employment</SelectItem>
              <SelectItem value="part-time">Part-time Employment</SelectItem>
              <SelectItem value="freelance">Freelancing</SelectItem>
              <SelectItem value="contract">Contract Work</SelectItem>
              <SelectItem value="remote">Remote Work</SelectItem>
              <SelectItem value="hybrid">Hybrid Work</SelectItem>
              <SelectItem value="entrepreneurship">Start Own Business</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Career Motivations */}
      <div className="space-y-4">
        <Label className="text-base font-medium">What motivates your career goals? (Select all that apply)</Label>
        <div className="grid md:grid-cols-2 gap-3">
          {MOTIVATIONS.map((motivation) => (
            <div key={motivation} className="flex items-center space-x-2">
              <Checkbox
                id={motivation}
                checked={formData.motivations.includes(motivation)}
                onCheckedChange={() => toggleMotivation(motivation)}
              />
              <Label htmlFor={motivation} className="text-sm font-normal">
                {motivation}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Goals */}
      <div className="space-y-2">
        <Label htmlFor="additionalGoals">Additional Career Goals or Aspirations (Optional)</Label>
        <Textarea
          id="additionalGoals"
          value={formData.additionalGoals}
          onChange={(e) => handleChange("additionalGoals", e.target.value)}
          placeholder="Share any specific career goals, dream companies, or long-term aspirations..."
          rows={4}
        />
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} size="lg">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!formData.careerField} size="lg">
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
