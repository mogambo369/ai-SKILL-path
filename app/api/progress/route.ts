import { type NextRequest, NextResponse } from "next/server"

interface ProgressUpdate {
  learnerId: string
  courseId: string
  moduleId: string
  action: "start" | "complete" | "pause" | "resume"
  timeSpent?: number // in minutes
  score?: number // 0-100
}

interface LearnerProgress {
  learnerId: string
  courseId: string
  courseName: string
  totalModules: number
  completedModules: number
  currentModule: string
  progressPercentage: number
  timeSpent: number // total minutes
  lastActivity: string
  status: "not-started" | "in-progress" | "completed" | "paused"
  score?: number
  certificateEarned: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  type: "course" | "skill" | "streak" | "time" | "social"
  rarity: "common" | "rare" | "epic" | "legendary"
  pointsAwarded: number
  unlockedAt: string
}

interface LearnerStats {
  totalPoints: number
  level: number
  streak: number
  coursesCompleted: number
  certificatesEarned: number
  timeSpent: number
  achievements: Achievement[]
  nextLevelPoints: number
}

// Mock data
const mockProgress: LearnerProgress[] = [
  {
    learnerId: "learner-123",
    courseId: "solar-pv-basic",
    courseName: "Solar PV Installation Basics",
    totalModules: 8,
    completedModules: 5,
    currentModule: "module-6",
    progressPercentage: 62.5,
    timeSpent: 180,
    lastActivity: "2024-01-15T10:30:00Z",
    status: "in-progress",
    score: 85,
    certificateEarned: false,
  },
  {
    learnerId: "learner-123",
    courseId: "electrical-basics",
    courseName: "Electrical Systems Fundamentals",
    totalModules: 6,
    completedModules: 6,
    currentModule: "completed",
    progressPercentage: 100,
    timeSpent: 120,
    lastActivity: "2024-01-10T14:20:00Z",
    status: "completed",
    score: 92,
    certificateEarned: true,
  },
]

const mockAchievements: Achievement[] = [
  {
    id: "first-course",
    title: "First Steps",
    description: "Complete your first course module",
    icon: "🎯",
    type: "course",
    rarity: "common",
    pointsAwarded: 50,
    unlockedAt: "2024-01-05T09:00:00Z",
  },
  {
    id: "week-streak",
    title: "Consistent Learner",
    description: "Learn for 7 consecutive days",
    icon: "🔥",
    type: "streak",
    rarity: "rare",
    pointsAwarded: 200,
    unlockedAt: "2024-01-12T18:00:00Z",
  },
  {
    id: "electrical-expert",
    title: "Electrical Expert",
    description: "Master electrical systems fundamentals",
    icon: "⚡",
    type: "skill",
    rarity: "epic",
    pointsAwarded: 500,
    unlockedAt: "2024-01-10T14:20:00Z",
  },
]

function calculateLevel(points: number): number {
  // Level calculation: 100 points for level 1, then +50 points per level
  if (points < 100) return 1
  return Math.floor((points - 100) / 150) + 2
}

function getNextLevelPoints(currentLevel: number): number {
  if (currentLevel === 1) return 100
  return 100 + (currentLevel - 1) * 150
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const learnerId = searchParams.get("learnerId")
  const type = searchParams.get("type") // "progress" | "stats" | "achievements"

  if (!learnerId) {
    return NextResponse.json({ success: false, error: "Learner ID is required" }, { status: 400 })
  }

  try {
    switch (type) {
      case "progress":
        const progress = mockProgress.filter((p) => p.learnerId === learnerId)
        return NextResponse.json({ success: true, progress })

      case "achievements":
        return NextResponse.json({ success: true, achievements: mockAchievements })

      case "stats":
      default:
        const totalPoints = mockAchievements.reduce((sum, achievement) => sum + achievement.pointsAwarded, 0)
        const level = calculateLevel(totalPoints)
        const nextLevelPoints = getNextLevelPoints(level)

        const stats: LearnerStats = {
          totalPoints,
          level,
          streak: 7,
          coursesCompleted: mockProgress.filter((p) => p.status === "completed").length,
          certificatesEarned: mockProgress.filter((p) => p.certificateEarned).length,
          timeSpent: mockProgress.reduce((sum, p) => sum + p.timeSpent, 0),
          achievements: mockAchievements,
          nextLevelPoints,
        }

        return NextResponse.json({ success: true, stats })
    }
  } catch (error) {
    console.error("Progress tracking error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch progress data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const progressUpdate: ProgressUpdate = await request.json()

    // In a real implementation, this would update the database
    // For now, we'll simulate the response

    const response = {
      success: true,
      message: "Progress updated successfully",
      pointsEarned: 0,
      newAchievements: [] as Achievement[],
    }

    // Simulate point earning based on action
    switch (progressUpdate.action) {
      case "complete":
        response.pointsEarned = 25
        // Check for new achievements
        if (progressUpdate.score && progressUpdate.score >= 90) {
          response.newAchievements.push({
            id: "high-scorer",
            title: "High Achiever",
            description: "Score 90% or higher on a module",
            icon: "🌟",
            type: "course",
            rarity: "rare",
            pointsAwarded: 100,
            unlockedAt: new Date().toISOString(),
          })
          response.pointsEarned += 100
        }
        break
      case "start":
        response.pointsEarned = 5
        break
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Progress update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update progress" }, { status: 500 })
  }
}
