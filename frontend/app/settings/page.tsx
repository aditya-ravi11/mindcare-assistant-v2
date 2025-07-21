"use client"

import { useState } from "react"
import { Bell, Shield, Download, Trash2, HelpCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: true,
    achievementAlerts: true,
    moodCheckIns: false,
  })

  const [privacy, setPrivacy] = useState({
    dataCollection: true,
    analytics: false,
    thirdPartySharing: false,
  })

  const handleExportData = () => {
    // Simulate data export
    alert("Your data export has been initiated. You will receive an email with your data within 24 hours.")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated. You will receive a confirmation email.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account preferences and privacy settings</p>
      </div>

      {/* Notifications */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
          <CardDescription>Choose what notifications you'd like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="daily-reminders" className="text-base font-medium">
                Daily Reminders
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get reminded to check in with your mood daily</p>
            </div>
            <Switch
              id="daily-reminders"
              checked={notifications.dailyReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, dailyReminders: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-reports" className="text-base font-medium">
                Weekly Reports
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly insights about your progress</p>
            </div>
            <Switch
              id="weekly-reports"
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="achievement-alerts" className="text-base font-medium">
                Achievement Alerts
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified when you earn new badges or reach milestones
              </p>
            </div>
            <Switch
              id="achievement-alerts"
              checked={notifications.achievementAlerts}
              onCheckedChange={(checked) => setNotifications({ ...notifications, achievementAlerts: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="mood-checkins" className="text-base font-medium">
                Mood Check-in Reminders
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gentle reminders to track your mood if you haven't in a while
              </p>
            </div>
            <Switch
              id="mood-checkins"
              checked={notifications.moodCheckIns}
              onCheckedChange={(checked) => setNotifications({ ...notifications, moodCheckIns: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Data</span>
          </CardTitle>
          <CardDescription>Control how your data is used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your conversations and personal data are always encrypted and never shared with third parties without your
              explicit consent.
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection" className="text-base font-medium">
                Improve MindCare
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Help us improve by sharing anonymized usage data
              </p>
            </div>
            <Switch
              id="data-collection"
              checked={privacy.dataCollection}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, dataCollection: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics" className="text-base font-medium">
                Analytics
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow anonymous analytics to help us understand app usage
              </p>
            </div>
            <Switch
              id="analytics"
              checked={privacy.analytics}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, analytics: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="third-party" className="text-base font-medium">
                Third-party Integrations
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow integration with external health and wellness apps
              </p>
            </div>
            <Switch
              id="third-party"
              checked={privacy.thirdPartySharing}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, thirdPartySharing: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or delete your personal data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Export Your Data</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download all your personal data in a portable format
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Delete Account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Permanently delete your account and all associated data
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleDeleteAccount}
              className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 bg-transparent"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal & Support */}
      <Card className="mindcare-card">
        <CardHeader>
          <CardTitle>Legal & Support</CardTitle>
          <CardDescription>Important information and help resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Privacy Policy</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">How we protect your data</div>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Terms of Service</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Our terms and conditions</div>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Contact Support</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Get help from our team</div>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Crisis Resources</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Emergency mental health support</div>
                </div>
              </div>
            </Button>
          </div>

          <Separator />

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              MindCare Assistant is not a replacement for professional mental health care. If you're experiencing a
              mental health crisis, please contact emergency services or a mental health professional immediately.
            </p>
            <div className="mt-3 space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
              <p>
                <strong>Crisis Text Line:</strong> Text HOME to 741741
              </p>
              <p>
                <strong>National Suicide Prevention Lifeline:</strong> 988
              </p>
              <p>
                <strong>Emergency Services:</strong> 911
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
