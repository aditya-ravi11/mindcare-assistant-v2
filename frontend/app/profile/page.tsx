"use client"

import { useState } from "react"
import { Camera, Edit2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", color: "bg-red-100 text-red-600" },
  { emoji: "😔", label: "Sad", color: "bg-orange-100 text-orange-600" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100 text-gray-600" },
  { emoji: "🙂", label: "Happy", color: "bg-green-100 text-green-600" },
  { emoji: "😊", label: "Very Happy", color: "bg-blue-100 text-blue-600" },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    age: "28",
    goals: "Improve sleep quality and manage work stress",
  })
  const [editedProfile, setEditedProfile] = useState(profile)
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    weeklyReports: true,
  })

  const recentMoods = [
    { date: "Today", mood: 4, emoji: "🙂" },
    { date: "Yesterday", mood: 3, emoji: "😐" },
    { date: "2 days ago", mood: 5, emoji: "😊" },
    { date: "3 days ago", mood: 2, emoji: "😔" },
    { date: "4 days ago", mood: 4, emoji: "🙂" },
  ]

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account settings and track your progress</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Information */}
        <Card className="mindcare-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal details and goals</CardDescription>
            </div>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                <Button size="sm" onClick={handleSave} className="mindcare-button flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 text-white">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-transparent"
                  disabled={!isEditing}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{profile.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member since January 2024</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={isEditing ? editedProfile.name : profile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={profile.email} disabled className="mt-1 bg-gray-50 dark:bg-gray-800" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={isEditing ? editedProfile.age : profile.age}
                  onChange={(e) => setEditedProfile({ ...editedProfile, age: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="goals">Wellbeing Goals</Label>
                <textarea
                  id="goals"
                  value={isEditing ? editedProfile.goals : profile.goals}
                  onChange={(e) => setEditedProfile({ ...editedProfile, goals: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-50 dark:disabled:bg-gray-800 dark:bg-gray-900 dark:text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="space-y-6">
          {/* Mood History */}
          <Card className="mindcare-card">
            <CardHeader>
              <CardTitle>Recent Moods</CardTitle>
              <CardDescription>Your mood tracking over the past 5 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMoods.map((mood, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{mood.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{mood.date}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {moodEmojis.find((m) => m.emoji === mood.emoji)?.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-6 rounded-full ${
                            level <= mood.mood
                              ? "bg-gradient-to-t from-blue-400 to-purple-400"
                              : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Activity */}
          <Card className="mindcare-card">
            <CardHeader>
              <CardTitle>Chat Activity</CardTitle>
              <CardDescription>Your recent conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Total conversations</span>
                  <span className="font-semibold text-gray-900 dark:text-white">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">This week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Average session length</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preferences */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your MindCare experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="text-base font-medium">
                Dark Mode
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
            <Switch
              id="dark-mode"
              checked={preferences.darkMode}
              onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-base font-medium">
                Push Notifications
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive reminders and check-in notifications</p>
            </div>
            <Switch
              id="notifications"
              checked={preferences.notifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-reports" className="text-base font-medium">
                Weekly Reports
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get weekly insights about your progress</p>
            </div>
            <Switch
              id="weekly-reports"
              checked={preferences.weeklyReports}
              onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyReports: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="mindcare-card border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Account Actions</CardTitle>
          <CardDescription>Manage your account data and privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1 bg-transparent">
              Export My Data
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 bg-transparent"
            >
              Delete Account
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Account deletion is permanent and cannot be undone. All your data will be securely removed.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
