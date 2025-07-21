import Link from "next/link"
import { ArrowRight, MessageCircle, BarChart3, Heart, BookOpen, Shield, Sparkles, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MeditationScene } from "@/components/meditation-scene"
import { FloatingElements } from "@/components/floating-elements"

export default function HomePage() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Support",
      description:
        "Connect with our compassionate AI assistant for personalized guidance and support whenever you need it.",
      color: "from-blue-500 to-cyan-500",
      delay: "0s",
    },
    {
      icon: BarChart3,
      title: "Mood Intelligence",
      description:
        "Track your emotional patterns with advanced analytics and discover insights about your wellbeing journey.",
      color: "from-green-500 to-emerald-500",
      delay: "0.1s",
    },
    {
      icon: Heart,
      title: "Personalized Care",
      description: "Receive tailored self-care activities and exercises designed specifically for your unique needs.",
      color: "from-purple-500 to-violet-500",
      delay: "0.2s",
    },
    {
      icon: BookOpen,
      title: "Expert Resources",
      description:
        "Access a curated library of evidence-based articles, exercises, and tools from mental health professionals.",
      color: "from-pink-500 to-rose-500",
      delay: "0.3s",
    },
    {
      icon: Shield,
      title: "Complete Privacy",
      description:
        "Your conversations and data are encrypted and secure. We prioritize your privacy above everything else.",
      color: "from-indigo-500 to-blue-500",
      delay: "0.4s",
    },
    {
      icon: Sparkles,
      title: "Progress Tracking",
      description:
        "Visualize your growth with beautiful charts, achievements, and milestones that celebrate your journey.",
      color: "from-teal-500 to-cyan-500",
      delay: "0.5s",
    },
  ]

  return (
    <div className="min-h-screen relative">
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8 section-fade-in">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Welcome to <span className="gradient-text block mt-2">MindCare Assistant</span>
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light">
                  Your Personal Wellbeing Companion
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                  Experience a new level of mental health support with AI-powered conversations, mood tracking, and
                  personalized resources designed to help you thrive.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link href="/auth">
                  <Button className="mindcare-button text-lg px-10 py-6 group shadow-2xl">
                    Get Started Free
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button className="glass-button text-lg px-10 py-6 group">
                    <Zap className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Try Demo Chat
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">10K+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">24/7</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">AI Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">100%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Private</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end section-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-3xl blur-3xl transform rotate-6"></div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 dark:from-slate-800/10 dark:to-slate-900/5 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-700/20 shadow-2xl">
                  <MeditationScene />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 section-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything you need for your <span className="gradient-text">wellbeing journey</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools and resources designed to support your mental health with compassion, understanding,
              and evidence-based approaches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="mindcare-card group hover:shadow-2xl transition-all duration-500 stagger-animation"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mindcare-card p-16 relative overflow-hidden section-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/5 dark:via-purple-400/5 dark:to-pink-400/5"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-2xl">
                  <Star className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Ready to transform your <span className="gradient-text">wellbeing journey?</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who have found support, guidance, and peace of mind with MindCare Assistant.
                Your journey to better mental health starts today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/auth">
                  <Button className="mindcare-button text-xl px-12 py-6 group shadow-2xl">
                    Start Your Journey
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button className="glass-button text-xl px-12 py-6">Explore Resources</Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>100% Private & Secure</span>
                <span>•</span>
                <span>No Credit Card Required</span>
                <span>•</span>
                <span>Start Free Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
