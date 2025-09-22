"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"

interface EducationStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export function EducationStep({ data, onUpdate, onNext, onPrev }: EducationStepProps) {
  const [formData, setFormData] = useState({
    highestQualification: data.highestQualification || "",
    fieldOfStudy: data.fieldOfStudy || "",
    institution: data.institution || "",
    graduationYear: data.graduationYear || "",
    grades: data.grades || "",
    additionalQualifications: data.additionalQualifications || [],
    currentlyStudying: data.currentlyStudying || false,
    ...data,
  })

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData)
  }

  const addQualification = () => {
    const newQualifications = [...formData.additionalQualifications, { name: "", year: "", institution: "" }]
    handleChange("additionalQualifications", newQualifications)
  }

  const removeQualification = (index: number) => {
    const newQualifications = formData.additionalQualifications.filter((_: any, i: number) => i !== index)
    handleChange("additionalQualifications", newQualifications)
  }

  const updateQualification = (index: number, field: string, value: string) => {
    const newQualifications = [...formData.additionalQualifications]
    newQualifications[index] = { ...newQualifications[index], [field]: value }
    handleChange("additionalQualifications", newQualifications)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl mb-2">Education Background</h3>
        <p className="text-muted-foreground">
          Tell us about your educational qualifications to help us understand your academic foundation.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="highestQualification">Highest Qualification *</Label>
          <Select
            value={formData.highestQualification}
            onValueChange={(value) => handleChange("highestQualification", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your highest qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th">10th Standard</SelectItem>
              <SelectItem value="12th">12th Standard</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
              <SelectItem value="master">Master's Degree</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Input
            id="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
            placeholder="e.g., Computer Science, Mechanical Engineering"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">Institution/School</Label>
          <Input
            id="institution"
            value={formData.institution}
            onChange={(e) => handleChange("institution", e.target.value)}
            placeholder="Name of your institution"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="graduationYear">Year of Completion</Label>
          <Select value={formData.graduationYear} onValueChange={(value) => handleChange("graduationYear", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 20 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grades">Grades/Percentage</Label>
          <Input
            id="grades"
            value={formData.grades}
            onChange={(e) => handleChange("grades", e.target.value)}
            placeholder="e.g., 85%, First Class, A Grade"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentlyStudying"
              checked={formData.currentlyStudying}
              onCheckedChange={(checked) => handleChange("currentlyStudying", checked)}
            />
            <Label htmlFor="currentlyStudying">Currently studying</Label>
          </div>
        </div>
      </div>

      {/* Additional Qualifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Additional Qualifications (Optional)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addQualification}>
            <Plus className="w-4 h-4 mr-2" />
            Add Qualification
          </Button>
        </div>

        {formData.additionalQualifications.map((qual: any, index: number) => (
          <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
            <div className="space-y-2">
              <Label>Qualification Name</Label>
              <Input
                value={qual.name}
                onChange={(e) => updateQualification(index, "name", e.target.value)}
                placeholder="e.g., Digital Marketing Certificate"
              />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                value={qual.year}
                onChange={(e) => updateQualification(index, "year", e.target.value)}
                placeholder="2023"
              />
            </div>
            <div className="space-y-2 flex items-end">
              <div className="flex-1">
                <Label>Institution</Label>
                <Input
                  value={qual.institution}
                  onChange={(e) => updateQualification(index, "institution", e.target.value)}
                  placeholder="Institution name"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeQualification(index)}
                className="ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} size="lg">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Previous
        </Button>
        <Button onClick={onNext} disabled={!formData.highestQualification} size="lg">
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
