import { type NextRequest, NextResponse } from "next/server"

interface SkillGapRequest {
  learnerProfile: {
    id: string
    currentSkills: string[]
    location: string
    targetIndustry?: string
  }
}

interface SkillGap {
  skill: string
  currentLevel: number // 0-100
  requiredLevel: number // 0-100
  gap: number
  priority: "high" | "medium" | "low"
  marketDemand: number
  averageSalary: number
  recommendedCourses: string[]
}

interface SkillGapAnalysis {
  overallScore: number
  criticalGaps: SkillGap[]
  emergingSkills: string[]
  marketInsights: {
    location: string
    topDemandSkills: string[]
    salaryTrends: { [skill: string]: number }
  }
}

// Mock market data by location
const locationMarketData = {
  Maharashtra: {
    topDemandSkills: ["digital marketing", "solar installation", "data analysis", "welding"],
    salaryTrends: {
      "digital marketing": 45000,
      "solar installation": 38000,
      "data analysis": 55000,
      welding: 30000,
    },
    emergingSkills: ["ai/ml basics", "drone operation", "3d printing"],
  },
  Karnataka: {
    topDemandSkills: ["software development", "digital marketing", "biotechnology", "aerospace"],
    salaryTrends: {
      "software development": 65000,
      "digital marketing": 42000,
      biotechnology: 48000,
      aerospace: 58000,
    },
    emergingSkills: ["blockchain", "iot development", "robotics"],
  },
  Gujarat: {
    topDemandSkills: ["chemical processing", "textile manufacturing", "solar installation", "petrochemicals"],
    salaryTrends: {
      "chemical processing": 42000,
      "textile manufacturing": 28000,
      "solar installation": 35000,
      petrochemicals: 48000,
    },
    emergingSkills: ["green chemistry", "automation", "quality control"],
  },
}

// Mock skill assessment database
const skillAssessments = {
  "digital marketing": {
    requiredLevel: 80,
    assessmentCriteria: ["seo", "social media", "analytics", "content creation"],
    courses: ["digital-marketing-basics", "advanced-seo", "social-media-mastery"],
  },
  "solar installation": {
    requiredLevel: 85,
    assessmentCriteria: ["electrical knowledge", "safety protocols", "system design"],
    courses: ["electrical-basics", "solar-fundamentals", "installation-techniques"],
  },
  welding: {
    requiredLevel: 75,
    assessmentCriteria: ["arc welding", "tig welding", "safety", "quality control"],
    courses: ["basic-welding", "advanced-welding", "welding-safety"],
  },
  "data analysis": {
    requiredLevel: 70,
    assessmentCriteria: ["statistics", "excel", "visualization", "reporting"],
    courses: ["statistics-basics", "excel-advanced", "data-visualization"],
  },
}

function assessCurrentSkillLevel(skill: string, learnerSkills: string[]): number {
  // Simple skill matching algorithm
  const normalizedSkill = skill.toLowerCase()
  const matchingSkills = learnerSkills.filter(
    (learnerSkill) =>
      learnerSkill.toLowerCase().includes(normalizedSkill) || normalizedSkill.includes(learnerSkill.toLowerCase()),
  )

  if (matchingSkills.length === 0) return 0

  // Base level for having the skill
  let level = 40

  // Bonus for multiple related skills
  level += Math.min(matchingSkills.length * 15, 40)

  // Random variation to simulate assessment
  level += Math.random() * 20 - 10

  return Math.max(0, Math.min(100, Math.round(level)))
}

function calculatePriority(gap: number, marketDemand: number): "high" | "medium" | "low" {
  const priorityScore = gap * 0.6 + marketDemand * 0.4

  if (priorityScore > 70) return "high"
  if (priorityScore > 40) return "medium"
  return "low"
}

function performSkillGapAnalysis(request: SkillGapRequest): SkillGapAnalysis {
  const { learnerProfile } = request
  const { currentSkills, location, targetIndustry } = learnerProfile

  // Get location-specific market data
  const marketData = locationMarketData[location] || locationMarketData["Maharashtra"]

  // Analyze gaps for top demand skills in the location
  const skillGaps: SkillGap[] = marketData.topDemandSkills.map((skill) => {
    const currentLevel = assessCurrentSkillLevel(skill, currentSkills)
    const requiredLevel = skillAssessments[skill]?.requiredLevel || 70
    const gap = Math.max(0, requiredLevel - currentLevel)
    const marketDemand = 60 + Math.random() * 40 // Simulate market demand 60-100

    return {
      skill,
      currentLevel,
      requiredLevel,
      gap,
      priority: calculatePriority(gap, marketDemand),
      marketDemand: Math.round(marketDemand),
      averageSalary: marketData.salaryTrends[skill] || 35000,
      recommendedCourses: skillAssessments[skill]?.courses || [],
    }
  })

  // Sort by priority and gap size
  const criticalGaps = skillGaps
    .filter((gap) => gap.gap > 10)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return b.gap - a.gap
    })

  // Calculate overall employability score
  const totalPossibleScore = skillGaps.reduce((sum, gap) => sum + gap.requiredLevel, 0)
  const currentTotalScore = skillGaps.reduce((sum, gap) => sum + gap.currentLevel, 0)
  const overallScore = Math.round((currentTotalScore / totalPossibleScore) * 100)

  return {
    overallScore,
    criticalGaps,
    emergingSkills: marketData.emergingSkills,
    marketInsights: {
      location,
      topDemandSkills: marketData.topDemandSkills,
      salaryTrends: marketData.salaryTrends,
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData: SkillGapRequest = await request.json()

    const analysis = performSkillGapAnalysis(requestData)

    return NextResponse.json({
      success: true,
      analysis,
      metadata: {
        generatedAt: new Date().toISOString(),
        analysisId: `gap-${requestData.learnerProfile.id}-${Date.now()}`,
      },
    })
  } catch (error) {
    console.error("Skill gap analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to perform skill gap analysis",
      },
      { status: 500 },
    )
  }
}
