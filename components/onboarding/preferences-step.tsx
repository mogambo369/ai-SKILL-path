"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface PreferencesStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function PreferencesStep({ data, onUpdate, onNext, onPrev }: PreferencesStepProps) {
  const [formData, setFormData] = useState({
    learningPace: data.learningPace || "",
    timeCommitment: data.timeCommitment || [10],
    learningStyle: data.learningStyle || [],
    devicePreference: data.devicePreference || [],
    schedulePreference: data.schedulePreference || "",
    supportLevel: data.supportLevel || "",
    budgetRange: data.budgetRange || "",
    notifications: data.notifications || true,
    ...data,
  })

  const LEARNING_STYLES = [
    "Visual (videos, diagrams, infographics)",
    "Auditory (podcasts, lectures, discussions)",
    "Reading/Writing (articles, notes, assignments)",
    "Kinesthetic (hands-on practice, projects)",
    "Interactive (quizzes, games, simulations)",
  ]

  const DEVICE_PREFERENCES = ["Smartphone", "Tablet", "Laptop", "Desktop Computer"]

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData)
  }

  const toggleArrayItem = (field: string, item: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    const newArray = currentArray.includes(item)
      ? currentArray.filter((i: string) => i !== item)
      : [...currentArray, item]
    handleChange(field, newArray)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl mb-2">Learning Preferences</h3>
        <p className="text-muted-foreground">
          Help us customize your learning experience by sharing your preferences and constraints.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="learningPace">Preferred Learning Pace</Label>
          <Select value={formData.learningPace} onValueChange={(value) => handleChange("learningPace", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your learning pace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self-paced">Self-paced (flexible timing)</SelectItem>
              <SelectItem value="structured">Structured (fixed schedule)</SelectItem>
              <SelectItem value="intensive">Intensive (fast-track)</SelectItem>
              <SelectItem value="part-time">Part-time (evenings/weekends)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schedulePreference">Schedule Preference</Label>
          <Select
            value={formData.schedulePreference}
            onValueChange={(value) => handleChange("schedulePreference", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="When do you prefer to learn?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
              <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
              <SelectItem value="night">Night (10 PM - 12 AM)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supportLevel">Support Level Needed</Label>
          <Select value={formData.supportLevel} onValueChange={(value) => handleChange("supportLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="How much support do you need?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal (self-directed)</SelectItem>
              <SelectItem value="moderate">Moderate (occasional guidance)</SelectItem>
              <SelectItem value="high">High (regular mentoring)</SelectItem>
              <SelectItem value="intensive">Intensive (1-on-1 support)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget Range (Monthly)</Label>
          <Select value={formData.budgetRange} onValueChange={(value) => handleChange("budgetRange", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free courses only</SelectItem>
              <SelectItem value="0-1000">₹0 - ₹1,000</SelectItem>
              <SelectItem value="1000-3000">₹1,000 - ₹3,000</SelectItem>
              <SelectItem value="3000-5000">₹3,000 - ₹5,000</SelectItem>
              <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
              <SelectItem value="above-10000">Above ₹10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Time Commitment */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Weekly Time Commitment: {formData.timeCommitment[0]} hours</Label>
        <div className="px-4">
          <Slider
            value={formData.timeCommitment}
            onValueChange={(value) => handleChange("timeCommitment", value)}
            max={40}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>1 hour</span>
            <span>20 hours</span>
            <span>40+ hours</span>
          </div>
        </div>
      </div>

      {/* Learning Styles */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Preferred Learning Styles (Select all that apply)</Label>
        <div className="space-y-3">
          {LEARNING_STYLES.map((style) => (
            <div key={style} className="flex items-center space-x-2">
              <Checkbox
                id={style}
                checked={formData.learningStyle.includes(style)}
                onCheckedChange={() => toggleArrayItem("learningStyle", style)}
              />
              <Label htmlFor={style} className="text-sm font-normal">
                {style}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Device Preferences */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Device Preferences (Select all that apply)</Label>
        <div className="grid md:grid-cols-2 gap-3">
          {DEVICE_PREFERENCES.map((device) => (
            <div key={device} className="flex items-center space-x-2">
              <Checkbox
                id={device}
                checked={formData.devicePreference.includes(device)}
                onCheckedChange={() => toggleArrayItem("devicePreference", device)}
              />
              <Label htmlFor={device} className="text-sm font-normal">
                {device}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="notifications"
            checked={formData.notifications}
            onCheckedChange={(checked) => handleChange("notifications", checked)}
          />
          <Label htmlFor="notifications" className="text-sm font-normal">
            Send me learning reminders and progress updates
          </Label>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} size="lg">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Previous
        </Button>
        <Button onClick={onNext} size="lg">
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
