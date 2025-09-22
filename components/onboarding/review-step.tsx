"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, User, GraduationCap, Target, Settings, Sparkles } from "lucide-react"

interface ReviewStepProps {
  formData: any
  onPrev: () => void
  onComplete: () => void
}

export function ReviewStep({ formData, onPrev, onComplete }: ReviewStepProps) {
  const { personalInfo, education, skills, careerGoals, preferences } = formData

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-xl mb-2">Review Your Profile</h3>
        <p className="text-muted-foreground">
          Please review your information before we create your personalized learning path.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Personal Information */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {personalInfo.firstName} {personalInfo.lastName}
              </div>
              <div>
                <span className="font-medium">Email:</span> {personalInfo.email}
              </div>
              <div>
                <span className="font-medium">Location:</span> {personalInfo.location || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Language:</span> {personalInfo.preferredLanguage || "Not specified"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Education Background</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <div className="mb-2">
                <span className="font-medium">Highest Qualification:</span> {education.highestQualification}
              </div>
              {education.fieldOfStudy && (
                <div className="mb-2">
                  <span className="font-medium">Field of Study:</span> {education.fieldOfStudy}
                </div>
              )}
              {education.institution && (
                <div className="mb-2">
                  <span className="font-medium">Institution:</span> {education.institution}
                </div>
              )}
              {education.additionalQualifications?.length > 0 && (
                <div>
                  <span className="font-medium">Additional Qualifications:</span>
                  <div className="mt-1 space-y-1">
                    {education.additionalQualifications.map((qual: any, index: number) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        • {qual.name} - {qual.institution} ({qual.year})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Skills & Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.technicalSkills?.length > 0 && (
              <div>
                <span className="font-medium text-sm">Technical Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.technicalSkills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {skills.softSkills?.length > 0 && (
              <div>
                <span className="font-medium text-sm">Soft Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.softSkills.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {skills.certifications?.length > 0 && (
              <div>
                <span className="font-medium text-sm">Certifications:</span>
                <div className="mt-1 space-y-1">
                  {skills.certifications.map((cert: any, index: number) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      • {cert.name} - {cert.issuer} ({cert.year})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Career Goals */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Career Goals</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Career Field:</span> {careerGoals.careerField}
              </div>
              <div>
                <span className="font-medium">Target Role:</span> {careerGoals.targetJobRole || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Timeline:</span> {careerGoals.timeframe || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Salary Expectation:</span>{" "}
                {careerGoals.salaryExpectation || "Not specified"}
              </div>
            </div>
            {careerGoals.motivations?.length > 0 && (
              <div className="mt-4">
                <span className="font-medium text-sm">Motivations:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {careerGoals.motivations.map((motivation: string) => (
                    <Badge key={motivation} variant="outline" className="text-xs">
                      {motivation}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Learning Preferences</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Learning Pace:</span> {preferences.learningPace || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Time Commitment:</span> {preferences.timeCommitment?.[0] || 0} hours/week
              </div>
              <div>
                <span className="font-medium">Budget Range:</span> {preferences.budgetRange || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Support Level:</span> {preferences.supportLevel || "Not specified"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Processing Message */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold">AI-Powered Recommendations Ready</h4>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your profile and create a personalized learning pathway with courses,
                certifications, and career opportunities tailored just for you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} size="lg">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Previous
        </Button>
        <Button onClick={onComplete} size="lg" className="bg-primary hover:bg-primary/90">
          <CheckCircle className="mr-2 w-4 h-4" />
          Complete Profile & Get My Path
        </Button>
      </div>
    </div>
  )
}
