"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Shield, MessageCircle, BarChart3, BookOpen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to MindCare!",
      description: "We're so glad you're here. Let's take a moment to introduce you to your new wellbeing companion.",
      content: (
        <div className="text-center space-y-6">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your journey starts here</h3>
            <p className="text-gray-600 dark:text-gray-300">
              MindCare Assistant is designed to support your mental health with compassion, understanding, and
              evidence-based tools.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Your Privacy Matters",
      description: "We take your privacy seriously. Here's how we protect your information.",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <Shield className="mx-auto h-16 w-16 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Complete Confidentiality</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-gray-600 dark:text-gray-300">All conversations are encrypted and stored securely</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-600 dark:text-gray-300">Your data is never shared with third parties</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-gray-600 dark:text-gray-300">You can delete your data at any time</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Explore Your Features",
      description: "Discover all the tools available to support your wellbeing journey.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <MessageCircle className="h-8 w-8 text-blue-500 mb-2" />
            <h4 className="font-semibold text-gray-900 dark:text-white">AI Chat</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Talk to our compassionate AI assistant anytime</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <BarChart3 className="h-8 w-8 text-green-500 mb-2" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Mood Tracking</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Monitor your emotions and discover patterns</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Resources</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Access helpful articles and exercises</p>
          </div>
          <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
            <Heart className="h-8 w-8 text-pink-500 mb-2" />
            <h4 className="font-semibold text-gray-900 dark:text-white">Self-Care</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Personalized activities for your wellbeing</p>
          </div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <Card className="mindcare-card animate-fade-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index <= currentStep
                        ? "bg-gradient-to-r from-blue-400 to-purple-400"
                        : "bg-gray-200 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {steps[currentStep].title}
            </CardTitle>
            <CardDescription className="text-lg">{steps[currentStep].description}</CardDescription>
          </CardHeader>

          <CardContent className="py-8">
            <div className="animate-slide-up">{steps[currentStep].content}</div>
          </CardContent>

          <div className="flex justify-between items-center p-6 pt-0">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="px-6 bg-transparent">
              Previous
            </Button>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentStep + 1} of {steps.length}
            </span>

            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep} className="mindcare-button px-6">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href="/chat">
                <Button className="mindcare-button px-6">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help getting started?{" "}
            <Link href="/support" className="text-blue-600 hover:text-blue-500">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
