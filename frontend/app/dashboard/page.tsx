"use client"

import { TrendingUp, Calendar, MessageCircle, Target, Award, Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const moodData = [
  { date: "Mon", mood: 4 },
  { date: "Tue", mood: 3 },
  { date: "Wed", mood: 5 },
  { date: "Thu", mood: 2 },
  { date: "Fri", mood: 4 },
  { date: "Sat", mood: 5 },
  { date: "Sun", mood: 4 },
]

const achievements = [
  {
    id: 1,
    title: "First Week Complete",
    description: "Tracked your mood for 7 consecutive days",
    icon: Calendar,
    earned: true,
    date: "2024-01-08",
  },
  {
    id: 2,
    title: "Chat Champion",
    description: "Had 10 meaningful conversations",
    icon: MessageCircle,
    earned: true,
    date: "2024-01-12",
  },
  {
    id: 3,
    title: "Mood Master",
    description: "Maintained positive mood for 5 days",
    icon: TrendingUp,
    earned: false,
    progress: 60,
  },
  {
    id: 4,
    title: "Consistency King",
    description: "Used the app for 30 consecutive days",
    icon: Flame,
    earned: false,
    progress: 23,
  },
]

const weeklyGoals = [
  {
    id: 1,
    title: "Daily Mood Check-ins",
    target: 7,
    current: 5,
    unit: "days",
  },
  {
    id: 2,
    title: "Chat Sessions",
    target: 3,
    current: 2,
    unit: "sessions",
  },
  {
    id: 3,
    title: "Resource Reading",
    target: 2,
    current: 1,
    unit: "articles",
  },
]

export default function DashboardPage() {
  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length
  const currentStreak = 5
  const totalDaysActive = 15

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Progress Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Track your wellbeing journey and celebrate your achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="mindcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averageMood.toFixed(1)}/5</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+0.3 from last week</p>
          </CardContent>
        </Card>

        <Card className="mindcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{currentStreak}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">consecutive days</p>
          </CardContent>
        </Card>

        <Card className="mindcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Active</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{totalDaysActive}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">total days tracked</p>
          </CardContent>
        </Card>

        <Card className="mindcare-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {achievements.filter((a) => a.earned).length}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">badges earned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mood Trend Chart */}
        <Card className="mindcare-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Mood Trend</CardTitle>
            <CardDescription>Your mood patterns over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simple bar chart */}
              <div className="flex items-end justify-between h-40 px-4">
                {moodData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                      className="w-8 bg-gradient-to-t from-blue-400 to-purple-400 rounded-t-md transition-all duration-300 hover:scale-110"
                      style={{ height: `${(day.mood / 5) * 120}px` }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{day.date}</span>
                  </div>
                ))}
              </div>

              {/* Mood scale reference */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-4">
                <span>😢 Very Sad</span>
                <span>😔 Sad</span>
                <span>😐 Neutral</span>
                <span>🙂 Happy</span>
                <span>😊 Very Happy</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="mindcare-card">
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
            <CardDescription>Your progress this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
          <CardDescription>Celebrate your milestones and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.earned
                      ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`p-2 rounded-full ${
                        achievement.earned
                          ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                          : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Earned
                      </Badge>
                    )}
                  </div>

                  <h3
                    className={`font-semibold mb-1 ${
                      achievement.earned ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {achievement.title}
                  </h3>

                  <p
                    className={`text-sm mb-3 ${
                      achievement.earned ? "text-gray-600 dark:text-gray-300" : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {achievement.description}
                  </p>

                  {achievement.earned ? (
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-gray-500 dark:text-gray-400">{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-1" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest interactions and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-full">
                <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Completed chat session</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Discussed stress management techniques • 2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Mood tracked: Happy 🙂</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Feeling good after morning exercise • Today</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-full">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Weekly goal achieved</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Completed 3 chat sessions this week • Yesterday
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
