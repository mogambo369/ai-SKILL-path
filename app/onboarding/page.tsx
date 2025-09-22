"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import { PersonalInfoStep } from "@/components/onboarding/personal-info-step"
import { EducationStep } from "@/components/onboarding/education-step"
import { SkillsStep } from "@/components/onboarding/skills-step"
import { CareerGoalsStep } from "@/components/onboarding/career-goals-step"
import { PreferencesStep } from "@/components/onboarding/preferences-step"
import { ReviewStep } from "@/components/onboarding/review-step"

const STEPS = [
  { id: 1, title: "Personal Information", description: "Tell us about yourself" },
  { id: 2, title: "Education Background", description: "Your academic history" },
  { id: 3, title: "Skills & Experience", description: "What you already know" },
  { id: 4, title: "Career Goals", description: "Where you want to go" },
  { id: 5, title: "Learning Preferences", description: "How you like to learn" },
  { id: 6, title: "Review & Complete", description: "Confirm your profile" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    education: {},
    skills: {},
    careerGoals: {},
    preferences: {},
  })

  const updateFormData = (step: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step as keyof typeof prev], ...data },
    }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <EducationStep
            data={formData.education}
            onUpdate={(data) => updateFormData("education", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <SkillsStep
            data={formData.skills}
            onUpdate={(data) => updateFormData("skills", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <CareerGoalsStep
            data={formData.careerGoals}
            onUpdate={(data) => updateFormData("careerGoals", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <PreferencesStep
            data={formData.preferences}
            onUpdate={(data) => updateFormData("preferences", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 6:
        return (
          <ReviewStep
            formData={formData}
            onPrev={prevStep}
            onComplete={() => {
              // Handle completion - redirect to dashboard
              console.log("Onboarding completed:", formData)
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">SkillPath AI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-heading font-bold text-2xl">Complete Your Profile</h1>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.id < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${step.id < currentStep ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <h2 className="font-heading font-semibold text-lg">{STEPS[currentStep - 1].title}</h2>
            <p className="text-muted-foreground text-sm">{STEPS[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
