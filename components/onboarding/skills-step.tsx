"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"

interface SkillsStepProps {
  data: any
  onUpdate: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

const SUGGESTED_SKILLS = [
  "Microsoft Office",
  "Communication",
  "Problem Solving",
  "Teamwork",
  "Leadership",
  "Data Analysis",
  "Digital Marketing",
  "Customer Service",
  "Project Management",
  "Programming",
  "Graphic Design",
  "Sales",
  "Accounting",
  "Teaching",
  "Writing",
  "Social Media",
  "Photography",
  "Video Editing",
  "Web Development",
  "Mobile Apps",
]

export function SkillsStep({ data, onUpdate, onNext, onPrev }: SkillsStepProps) {
  const [formData, setFormData] = useState({
    technicalSkills: data.technicalSkills || [],
    softSkills: data.softSkills || [],
    certifications: data.certifications || [],
    workExperience: data.workExperience || "",
    projects: data.projects || "",
    ...data,
  })

  const [newSkill, setNewSkill] = useState("")

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onUpdate(newData)
  }

  const addSkill = (skillType: "technicalSkills" | "softSkills", skill: string) => {
    if (skill && !formData[skillType].includes(skill)) {
      const newSkills = [...formData[skillType], skill]
      handleChange(skillType, newSkills)
    }
    setNewSkill("")
  }

  const removeSkill = (skillType: "technicalSkills" | "softSkills", skill: string) => {
    const newSkills = formData[skillType].filter((s: string) => s !== skill)
    handleChange(skillType, newSkills)
  }

  const addCertification = () => {
    const newCertifications = [...formData.certifications, { name: "", issuer: "", year: "" }]
    handleChange("certifications", newCertifications)
  }

  const removeCertification = (index: number) => {
    const newCertifications = formData.certifications.filter((_: any, i: number) => i !== index)
    handleChange("certifications", newCertifications)
  }

  const updateCertification = (index: number, field: string, value: string) => {
    const newCertifications = [...formData.certifications]
    newCertifications[index] = { ...newCertifications[index], [field]: value }
    handleChange("certifications", newCertifications)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl mb-2">Skills & Experience</h3>
        <p className="text-muted-foreground">
          Help us understand your current capabilities and experience to recommend the best learning path.
        </p>
      </div>

      {/* Technical Skills */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Technical Skills</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.technicalSkills.map((skill: string) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1">
              {skill}
              <button onClick={() => removeSkill("technicalSkills", skill)} className="ml-2 hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a technical skill"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSkill("technicalSkills", newSkill)
              }
            }}
          />
          <Button type="button" variant="outline" onClick={() => addSkill("technicalSkills", newSkill)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Suggestions:</span>
          {SUGGESTED_SKILLS.filter((skill) => !formData.technicalSkills.includes(skill))
            .slice(0, 8)
            .map((skill) => (
              <Button
                key={skill}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addSkill("technicalSkills", skill)}
                className="h-6 px-2 text-xs"
              >
                + {skill}
              </Button>
            ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Soft Skills</Label>
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.softSkills.map((skill: string) => (
            <Badge key={skill} variant="outline" className="px-3 py-1">
              {skill}
              <button onClick={() => removeSkill("softSkills", skill)} className="ml-2 hover:text-destructive">
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a soft skill"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addSkill("softSkills", newSkill)
              }
            }}
          />
          <Button type="button" variant="outline" onClick={() => addSkill("softSkills", newSkill)}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Certifications (Optional)</Label>
          <Button type="button" variant="outline" size="sm" onClick={addCertification}>
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>
        </div>

        {formData.certifications.map((cert: any, index: number) => (
          <div key={index} className="grid md:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
            <div className="space-y-2">
              <Label>Certification Name</Label>
              <Input
                value={cert.name}
                onChange={(e) => updateCertification(index, "name", e.target.value)}
                placeholder="e.g., Google Analytics Certified"
              />
            </div>
            <div className="space-y-2">
              <Label>Issuing Organization</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                placeholder="e.g., Google"
              />
            </div>
            <div className="space-y-2 flex items-end">
              <div className="flex-1">
                <Label>Year</Label>
                <Input
                  value={cert.year}
                  onChange={(e) => updateCertification(index, "year", e.target.value)}
                  placeholder="2023"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeCertification(index)}
                className="ml-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="space-y-2">
        <Label htmlFor="workExperience">Work Experience (Optional)</Label>
        <Textarea
          id="workExperience"
          value={formData.workExperience}
          onChange={(e) => handleChange("workExperience", e.target.value)}
          placeholder="Briefly describe your work experience, internships, or relevant projects..."
          rows={4}
        />
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
