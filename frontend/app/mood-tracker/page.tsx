"use client"

import { useState } from "react"
import { Calendar, TrendingUp, BarChart3, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const moodData = [
  { date: "2024-01-15", mood: 4, note: "Great day at work!" },
  { date: "2024-01-14", mood: 3, note: "Feeling okay" },
  { date: "2024-01-13", mood: 5, note: "Wonderful weekend" },
  { date: "2024-01-12", mood: 2, note: "Stressful day" },
  { date: "2024-01-11", mood: 4, note: "Good progress on goals" },
  { date: "2024-01-10", mood: 3, note: "Average day" },
  { date: "2024-01-09", mood: 5, note: "Celebrated achievement" },
  { date: "2024-01-08", mood: 1, note: "Difficult day" },
  { date: "2024-01-07", mood: 4, note: "Productive Sunday" },
  { date: "2024-01-06", mood: 3, note: "Relaxing weekend" },
]

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Very Sad", color: "bg-red-500" },
  { value: 2, emoji: "😔", label: "Sad", color: "bg-orange-500" },
  { value: 3, emoji: "😐", label: "Neutral", color: "bg-yellow-500" },
  { value: 4, emoji: "🙂", label: "Happy", color: "bg-green-500" },
  { value: 5, emoji: "😊", label: "Very Happy", color: "bg-blue-500" },
]

const weeklyData = [
  { week: "This Week", average: 3.8, trend: "up" },
  { week: "Last Week", average: 3.2, trend: "up" },
  { week: "2 Weeks Ago", average: 2.9, trend: "down" },
  { week: "3 Weeks Ago", average: 3.5, trend: "up" },
]

export default function MoodTrackerPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const getMoodEmoji = (mood: number) => {
    return moodEmojis.find((m) => m.value === mood)
  }

  const generateCalendarDays = () => {
    const days = []
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateString = date.toISOString().split("T")[0]
      const moodEntry = moodData.find((m) => m.date === dateString)

      days.push({
        date: date,
        dateString: dateString,
        isCurrentMonth: date.getMonth() === currentMonth,
        isToday: dateString === today.toISOString().split("T")[0],
        mood: moodEntry?.mood,
        note: moodEntry?.note,
      })
    }
    return days
  }

  const calendarDays = generateCalendarDays()
  const averageMood = moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mood Tracker</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your emotions and discover patterns in your wellbeing journey
        </p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar" className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4" />
            <span>Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trends</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="mindcare-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>January 2024</span>
                    <Button variant="outline" size="sm">
                      Today
                    </Button>
                  </CardTitle>
                  <CardDescription>Click on any day to view or add your mood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, index) => {
                      const moodEmoji = day.mood ? getMoodEmoji(day.mood) : null
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(day.dateString)}
                          className={`
                            aspect-square p-2 rounded-lg text-sm transition-all duration-200 hover:scale-105
                            ${
                              day.isCurrentMonth
                                ? "text-gray-900 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                : "text-gray-400 dark:text-gray-600"
                            }
                            ${day.isToday ? "ring-2 ring-blue-400" : ""}
                            ${selectedDate === day.dateString ? "bg-blue-100 dark:bg-blue-900/30" : ""}
                            ${day.mood ? "bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 shadow-sm" : ""}
                          `}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className="text-xs">{day.date.getDate()}</span>
                            {moodEmoji && <span className="text-lg mt-1">{moodEmoji.emoji}</span>}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mood Entry/Details */}
            <div>
              <Card className="mindcare-card">
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? `Mood for ${new Date(selectedDate).toLocaleDateString()}` : "Select a Date"}
                  </CardTitle>
                  <CardDescription>
                    {selectedDate ? "View or update your mood entry" : "Click on a calendar day to get started"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      {/* Mood Selector */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                          How did you feel?
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {moodEmojis.map((mood) => {
                            const isSelected = moodData.find((m) => m.date === selectedDate)?.mood === mood.value
                            return (
                              <button
                                key={mood.value}
                                className={`
                                  flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                                  ${
                                    isSelected
                                      ? "bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400"
                                      : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  }
                                `}
                              >
                                <span className="text-2xl">{mood.emoji}</span>
                                <div className="text-left">
                                  <div className="font-medium text-gray-900 dark:text-white">{mood.label}</div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Note */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Note (optional)
                        </label>
                        <textarea
                          placeholder="How was your day? What influenced your mood?"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                          defaultValue={moodData.find((m) => m.date === selectedDate)?.note || ""}
                        />
                      </div>

                      <Button className="w-full mindcare-button">Save Mood Entry</Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Select a date from the calendar to track your mood
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekly Trends */}
            <Card className="mindcare-card">
              <CardHeader>
                <CardTitle>Weekly Trends</CardTitle>
                <CardDescription>Your average mood over recent weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((week, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{week.week}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Average: {week.average.toFixed(1)}/5</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-8 rounded-full ${
                                level <= Math.round(week.average)
                                  ? "bg-gradient-to-t from-blue-400 to-purple-400"
                                  : "bg-gray-200 dark:bg-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <TrendingUp className={`h-4 w-4 ${week.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mood Distribution */}
            <Card className="mindcare-card">
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
                <CardDescription>How often you experience each mood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moodEmojis.map((mood) => {
                    const count = moodData.filter((m) => m.mood === mood.value).length
                    const percentage = (count / moodData.length) * 100
                    return (
                      <div key={mood.value} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{mood.emoji}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{mood.label}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {count} days ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className={`h-2 rounded-full ${mood.color}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Overall Stats */}
            <Card className="mindcare-card">
              <CardHeader>
                <CardTitle>Overall Statistics</CardTitle>
                <CardDescription>Your mood tracking summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{averageMood.toFixed(1)}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Average Mood</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">{moodData.length}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Days Tracked</p>
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                      {Math.round((moodData.filter((m) => m.mood >= 4).length / moodData.length) * 100)}%
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Happy Days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="mindcare-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Insights</CardTitle>
                <CardDescription>Patterns we've noticed in your mood data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">🌟 Positive Trend</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Your mood has been improving over the past two weeks. You tend to feel better on weekends and after
                    productive days.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">💡 Pattern Recognition</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    You experience your highest moods when you mention achievements or progress on your goals. Consider
                    celebrating small wins more often.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">🎯 Recommendation</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Try incorporating more self-care activities on days when you're feeling neutral. This might help
                    boost your overall wellbeing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
