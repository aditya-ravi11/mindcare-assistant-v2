"use client"

import { useState } from "react"
import { Search, BookOpen, Clock, Heart, Brain, Moon, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "all", label: "All Resources", icon: BookOpen },
  { id: "stress", label: "Stress Management", icon: Brain },
  { id: "anxiety", label: "Anxiety Support", icon: Heart },
  { id: "sleep", label: "Sleep & Rest", icon: Moon },
  { id: "relationships", label: "Relationships", icon: Users },
]

const resources = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise for Instant Calm",
    description: "Learn a simple breathing technique that can help reduce stress and anxiety in just 5 minutes.",
    category: "stress",
    type: "exercise",
    readTime: "5 min",
    difficulty: "Beginner",
    tags: ["breathing", "quick-relief", "anxiety"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Understanding Anxiety: A Comprehensive Guide",
    description: "Explore what anxiety is, its common symptoms, and evidence-based strategies for managing it.",
    category: "anxiety",
    type: "article",
    readTime: "12 min",
    difficulty: "Intermediate",
    tags: ["education", "coping-strategies", "mental-health"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Progressive Muscle Relaxation Technique",
    description: "A step-by-step guide to progressive muscle relaxation for better sleep and stress relief.",
    category: "sleep",
    type: "exercise",
    readTime: "15 min",
    difficulty: "Beginner",
    tags: ["relaxation", "sleep", "body-awareness"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Building Healthy Communication in Relationships",
    description: "Learn effective communication strategies to strengthen your personal and professional relationships.",
    category: "relationships",
    type: "article",
    readTime: "10 min",
    difficulty: "Intermediate",
    tags: ["communication", "relationships", "social-skills"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Mindful Morning Routine for Mental Clarity",
    description: "Start your day with intention using this 10-minute mindful morning routine.",
    category: "stress",
    type: "exercise",
    readTime: "10 min",
    difficulty: "Beginner",
    tags: ["mindfulness", "morning-routine", "productivity"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Sleep Hygiene: Creating the Perfect Sleep Environment",
    description: "Discover how to optimize your bedroom and bedtime routine for better quality sleep.",
    category: "sleep",
    type: "article",
    readTime: "8 min",
    difficulty: "Beginner",
    tags: ["sleep-hygiene", "environment", "wellness"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "Cognitive Behavioral Techniques for Negative Thoughts",
    description: "Learn practical CBT techniques to identify and challenge negative thought patterns.",
    category: "anxiety",
    type: "article",
    readTime: "15 min",
    difficulty: "Advanced",
    tags: ["CBT", "thought-patterns", "self-help"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Setting Healthy Boundaries in Personal Relationships",
    description: "A practical guide to establishing and maintaining healthy boundaries with family and friends.",
    category: "relationships",
    type: "article",
    readTime: "12 min",
    difficulty: "Intermediate",
    tags: ["boundaries", "self-care", "relationships"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedResource, setSelectedResource] = useState<(typeof resources)[0] | null>(null)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "exercise" ? Heart : BookOpen
  }

  if (selectedResource) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Button variant="outline" onClick={() => setSelectedResource(null)} className="mb-6">
          ← Back to Resources
        </Button>

        <Card className="mindcare-card">
          <div className="aspect-video w-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-t-2xl flex items-center justify-center">
            <img
              src={selectedResource.image || "/placeholder.svg"}
              alt={selectedResource.title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>

          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Badge className={getDifficultyColor(selectedResource.difficulty)}>{selectedResource.difficulty}</Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{selectedResource.readTime}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  {getTypeIcon(selectedResource.type)({ className: "h-3 w-3" })}
                  <span className="capitalize">{selectedResource.type}</span>
                </Badge>
              </div>
            </div>

            <CardTitle className="text-2xl mb-2">{selectedResource.title}</CardTitle>
            <CardDescription className="text-lg">{selectedResource.description}</CardDescription>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedResource.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="prose dark:prose-invert max-w-none">
            {selectedResource.type === "exercise" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">How to Practice</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Step 1: Find Your Space</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Choose a quiet, comfortable place where you won't be disturbed. Sit or lie down in a relaxed
                        position.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Step 2: Begin the Practice</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Close your eyes and take a few natural breaths. Focus on the sensation of breathing without
                        trying to change it.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Step 3: Continue and Reflect</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Continue for the recommended duration. When finished, take a moment to notice how you feel.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                    <li>Reduces stress and anxiety levels</li>
                    <li>Improves focus and concentration</li>
                    <li>Promotes relaxation and calm</li>
                    <li>Can be practiced anywhere, anytime</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Tips for Success</h3>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>Start with shorter sessions and gradually increase duration</li>
                      <li>Practice regularly, even if just for a few minutes</li>
                      <li>Be patient with yourself - it's normal for your mind to wander</li>
                      <li>Consider using a timer to avoid checking the clock</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Understanding the Topic</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    This comprehensive guide explores the fundamental concepts and provides practical insights that you
                    can apply in your daily life. We'll cover evidence-based strategies and real-world examples to help
                    you better understand and manage this aspect of your mental health.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Key Takeaways</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Recognition</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Learn to identify patterns and triggers in your daily life.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Strategies</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Discover practical techniques for managing challenges.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Implementation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Create sustainable habits that support your wellbeing.
                      </p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                      <h4 className="font-medium mb-2">Progress</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Track your improvement and celebrate small victories.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Next Steps</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      Ready to put this knowledge into practice? Here are some suggested next steps:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>Start a journal to track your thoughts and feelings</li>
                      <li>Practice one technique daily for a week</li>
                      <li>Share your learnings with a trusted friend or therapist</li>
                      <li>Explore related resources in our library</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Wellbeing Resources</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover articles, exercises, and tools to support your mental health journey
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search resources, topics, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 whitespace-nowrap ${
                  selectedCategory === category.id ? "mindcare-button" : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
        {searchTerm && ` for "${searchTerm}"`}
        {selectedCategory !== "all" && ` in ${categories.find((c) => c.id === selectedCategory)?.label}`}
      </div>

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type)
          return (
            <Card
              key={resource.id}
              className="mindcare-card group cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="aspect-video w-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-t-2xl overflow-hidden">
                <img
                  src={resource.image || "/placeholder.svg"}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getDifficultyColor(resource.difficulty)}>{resource.difficulty}</Badge>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{resource.readTime}</span>
                  </div>
                </div>

                <CardTitle className="text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed mb-4">{resource.description}</CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TypeIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{resource.type}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search terms or category filter</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
