import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"

const learningPathSchema = z.object({
  pathTitle: z.string(),
  pathDescription: z.string(),
  estimatedDuration: z.number(),
  difficultyLevel: z.enum(["beginner", "intermediate", "advanced"]),
  courses: z.array(
    z.object({
      courseId: z.string(),
      sequenceOrder: z.number(),
      isRequired: z.boolean(),
      reasoning: z.string(),
      prerequisiteSkills: z.array(z.string()),
      skillsToGain: z.array(z.string()),
    }),
  ),
  skillGaps: z.array(z.string()),
  careerOutlook: z.object({
    averageSalary: z.number(),
    jobGrowthRate: z.number(),
    demandLevel: z.number(),
  }),
  milestones: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      timeframe: z.string(),
    }),
  ),
})

interface LearningPathRequest {
  learnerProfile: {
    id: string
    currentSkills: string[]
    targetJob: string
    timeframe: number // in months
    learningPace: "slow" | "medium" | "fast"
    location: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestData: LearningPathRequest = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 })
    }

    const { data: courses, error: coursesError } = await supabase
      .from("courses")
      .select(`
        *,
        course_skills (
          skills (name, category)
        )
      `)
      .eq("is_active", true)

    if (coursesError) throw coursesError

    const { data: userProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    const { data: userSkills } = await supabase
      .from("user_skills")
      .select(`
        skills (name, category),
        proficiency_level
      `)
      .eq("user_id", user.id)

    const { object: aiPath } = await generateObject({
      model: groq("llama-3.3-70b-versatile"),
      schema: learningPathSchema,
      prompt: `
        Create a personalized learning path for this Indian vocational learner:

        Learner Profile:
        - Current Skills: ${requestData.learnerProfile.currentSkills.join(", ")}
        - Target Job: ${requestData.learnerProfile.targetJob}
        - Available Time: ${requestData.learnerProfile.timeframe} months
        - Learning Pace: ${requestData.learnerProfile.learningPace}
        - Location: ${requestData.learnerProfile.location}
        - Education Level: ${userProfile?.education_level || "Not specified"}

        Available Courses:
        ${courses
          ?.map(
            (course) =>
              `- ID: ${course.id}, Title: ${course.title}, Category: ${course.category}, Duration: ${course.duration_hours}h, NSQF: ${course.nsqf_level}, Skills: ${course.course_skills?.map((cs) => cs.skills.name).join(", ")}`,
          )
          .join("\n")}

        Create a structured learning path that:
        1. Builds from current skills to target job requirements
        2. Follows logical skill progression
        3. Considers NSQF qualification levels
        4. Fits within the available timeframe
        5. Includes practical projects and certifications
        6. Addresses skill gaps for ${requestData.learnerProfile.targetJob}
        7. Considers job market demand in ${requestData.learnerProfile.location}

        Focus on employability and practical skills for the Indian job market.
      `,
      maxTokens: 3000,
    })

    const { data: savedPath, error: saveError } = await supabase
      .from("learning_paths")
      .insert({
        user_id: user.id,
        title: aiPath.pathTitle,
        description: aiPath.pathDescription,
        target_career: requestData.learnerProfile.targetJob,
        estimated_duration_months: Math.ceil(aiPath.estimatedDuration),
        difficulty_level: aiPath.difficultyLevel,
      })
      .select()
      .single()

    if (saveError) throw saveError

    if (savedPath) {
      const pathCourses = aiPath.courses.map((course) => ({
        learning_path_id: savedPath.id,
        course_id: course.courseId,
        sequence_order: course.sequenceOrder,
        is_required: course.isRequired,
      }))

      await supabase.from("learning_path_courses").insert(pathCourses)
    }

    const learningPath = {
      id: savedPath?.id || `path-${user.id}-${Date.now()}`,
      targetJob: requestData.learnerProfile.targetJob,
      totalDuration: aiPath.estimatedDuration,
      estimatedCompletion: new Date(Date.now() + aiPath.estimatedDuration * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      steps: aiPath.courses,
      skillGaps: aiPath.skillGaps,
      marketInsights: aiPath.careerOutlook,
      milestones: aiPath.milestones,
    }

    return NextResponse.json({
      success: true,
      learningPath,
      metadata: {
        generatedAt: new Date().toISOString(),
        pathId: learningPath.id,
        aiGenerated: true,
      },
    })
  } catch (error) {
    console.error("Learning path generation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate learning path",
      },
      { status: 500 },
    )
  }
}
