"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Smile, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1 },
  { emoji: "😔", label: "Sad", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "Happy", value: 4 },
  { emoji: "😊", label: "Very Happy", value: 5 },
]

const quickStartChips = [
  "I'm feeling stressed",
  "Tips for better sleep",
  "I'm feeling down today",
  "Help with anxiety",
  "Breathing exercises",
  "I need motivation",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to support you on your wellbeing journey. How are you feeling today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [showMoodSelector, setShowMoodSelector] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. It's completely normal to experience these emotions. Would you like to talk more about what's on your mind?",
        "Thank you for sharing that with me. Your feelings are valid, and I'm here to support you. What would be most helpful for you right now?",
        "I hear you, and I want you to know that you're not alone in this. Let's explore some strategies that might help you feel better.",
        "That sounds challenging. Remember that it's okay to have difficult days. What usually helps you when you're feeling this way?",
        "I appreciate you opening up to me. Your wellbeing matters, and taking time to check in with yourself is a positive step.",
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood)
    setShowMoodSelector(false)
    const moodLabel = moodEmojis.find((m) => m.value === mood)?.label || "Unknown"
    handleSendMessage(`I'm feeling ${moodLabel.toLowerCase()} today`)
  }

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip)
  }

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-white/20 dark:border-slate-700/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chat with MindCare</h1>
            {selectedMood && (
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
                Current mood: {moodEmojis.find((m) => m.value === selectedMood)?.emoji}{" "}
                {moodEmojis.find((m) => m.value === selectedMood)?.label}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMoodSelector(true)}
            className="flex items-center space-x-2"
          >
            <Smile className="h-4 w-4" />
            <span>Update Mood</span>
          </Button>
        </div>
      </div>

      {/* Mood Selector */}
      {showMoodSelector && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-blue-200 dark:border-blue-800">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">How are you feeling today?</p>
          <div className="flex space-x-2 overflow-x-auto">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className="flex-shrink-0 p-3 bg-white dark:bg-slate-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Start Chips */}
      {messages.length <= 1 && (
        <div className="p-4 bg-gray-50 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick start suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {quickStartChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-2 bg-white dark:bg-slate-700 text-sm text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white"
                  : "bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={`text-xs mt-2 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-md px-4 py-3 rounded-2xl max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-white/20 dark:border-slate-700/50 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage(inputValue)
          }}
          className="flex space-x-2"
        >
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              className="pr-12 h-12 focus:ring-2 focus:ring-blue-400"
              disabled={isTyping}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-10 w-10 text-gray-400 hover:text-gray-600"
              disabled
            >
              <Mic className="h-4 w-4" />
              <span className="sr-only">Voice input (coming soon)</span>
            </Button>
          </div>
          <Button type="submit" className="mindcare-button h-12 px-6" disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          MindCare Assistant is here to support you. If you're in crisis, please contact emergency services.
        </p>
      </div>
    </div>
  )
}
