import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

interface LearnerProfile {
  id: string
  academicHistory: string[]
  skills: string[]
  aspirations: string[]
  location: string
  preferredLanguage: string
  learningPace: "slow" | "medium" | "fast"
  completedCourses: string[]
  ratings: { [courseId: string]: number }
}

const recommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      courseId: z.string(),
      reasoning: z.string(),
      confidenceScore: z.number().min(0).max(1),
      skillAlignment: z.array(z.string()),
      careerRelevance: z.string(),
    }),
  ),
  learningPathSuggestion: z.string(),
  skillGapInsights: z.array(z.string()),
})

// Content-based filtering with Supabase data
async function contentBasedRecommendations(learnerProfile: LearnerProfile) {
  const supabase = await createClient()

  const { data: courses, error } = await supabase
    .from("courses")
    .select(`
      *,
      course_skills (
        skills (name, category)
      )
    `)
    .eq("is_active", true)

  if (error) throw error

  const { data: completedCourses } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("user_id", learnerProfile.id)
    .eq("status", "completed")

  const completedCourseIds = completedCourses?.map((e) => e.course_id) || []

  return (
    courses
      ?.filter((course) => !completedCourseIds.includes(course.id))
      .map((course) => {
        let score = 0
        const courseSkills = course.course_skills?.map((cs) => cs.skills.name) || []

        // Skill similarity
        const skillOverlap = courseSkills.filter((skill) =>
          learnerProfile.skills.some(
            (learnerSkill) =>
              learnerSkill.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(learnerSkill.toLowerCase()),
          ),
        ).length
        score += skillOverlap * 0.4

        // Course quality metrics
        score += (course.rating / 5) * 0.2
        score += Math.random() * 0.4 // Simulate completion rate

        return { ...course, recommendationScore: score }
      })
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5) || []
  )
}

async function generateAIRecommendations(learnerProfile: LearnerProfile, availableCourses: any[]) {
  try {
    const { object } = await generateObject({
      model: groq("llama-3.3-70b-versatile"),
      schema: recommendationSchema,
      prompt: `
        As an AI career advisor for India's vocational training ecosystem, analyze this learner profile and recommend the best courses:

        Learner Profile:
        - Current Skills: ${learnerProfile.skills.join(", ")}
        - Career Aspirations: ${learnerProfile.aspirations.join(", ")}
        - Location: ${learnerProfile.location}
        - Learning Pace: ${learnerProfile.learningPace}
        - Academic Background: ${learnerProfile.academicHistory.join(", ")}

        Available Courses:
        ${availableCourses
          .map(
            (course) =>
              `- ${course.title} (${course.category}, NSQF Level ${course.nsqf_level}, ${course.duration_hours}h, ₹${course.price})`,
          )
          .join("\n")}

        Provide intelligent recommendations considering:
        1. Skill progression and career pathways
        2. Market demand in ${learnerProfile.location}
        3. Learning pace and time constraints
        4. NSQF qualification framework alignment
        5. Industry trends and emerging skills

        Focus on practical, job-ready skills that lead to employment opportunities.
      `,
      maxTokens: 2000,
    })

    return object
  } catch (error) {
    console.error("Groq AI recommendation error:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { learnerProfile, recommendationType } = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    let recommendations: any[] = []

    switch (recommendationType) {
      case "content-based":
        recommendations = await contentBasedRecommendations(learnerProfile)
        break
      case "ai-powered":
        const contentBased = await contentBasedRecommendations(learnerProfile)
        const aiRecommendations = await generateAIRecommendations(learnerProfile, contentBased)

        if (aiRecommendations) {
          // Match AI recommendations with actual courses
          recommendations = aiRecommendations.recommendations
            .map((rec) => {
              const course = contentBased.find((c) => c.id === rec.courseId)
              return course ? { ...course, aiInsights: rec } : null
            })
            .filter(Boolean)
        } else {
          recommendations = contentBased
        }
        break
      case "hybrid":
      default:
        const baseCourses = await contentBasedRecommendations(learnerProfile)
        const aiInsights = await generateAIRecommendations(learnerProfile, baseCourses)

        recommendations = baseCourses.map((course) => ({
          ...course,
          aiInsights: aiInsights?.recommendations.find((r) => r.courseId === course.id),
        }))
        break
    }

    return NextResponse.json({
      success: true,
      recommendations,
      metadata: {
        totalCourses: recommendations.length,
        recommendationType,
        generatedAt: new Date().toISOString(),
        aiPowered: recommendationType === "ai-powered" || recommendationType === "hybrid",
      },
    })
  } catch (error) {
    console.error("Recommendation engine error:", error)
    return NextResponse.json({ success: false, error: "Failed to generate recommendations" }, { status: 500 })
  }
}
