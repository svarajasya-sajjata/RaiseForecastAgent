"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Brain, Target, Sparkles, Zap, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Raise Forecast Agent</span>
            </div>
            <Button
              variant="outline"
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
              onClick={() => router.push("/forecast")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl" />
              </div>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Raise Forecast Agent
              </span>
            </h1>
            <p className="mb-8 text-xl text-slate-300 sm:text-2xl">
              Predict project funding success using AI and data models
            </p>
            <p className="mb-10 text-lg text-slate-400 max-w-2xl mx-auto">
              Move beyond intuition and spreadsheets. Get data-driven forecasts for Web3 project funding rounds based on
              founder trust, pitch strength, and early traction.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push("/forecast")}
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Forecast
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Use AI for Funding Forecasts?</h2>
            <p className="text-slate-400">
              Traditional VC decision-making relies on gut feelings and basic metrics. Our AI agent analyzes multiple
              data points to provide objective, data-driven insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <TrendingUp className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Data-Driven Analysis</h3>
              <p className="text-slate-400">
                Analyze founder credibility, market traction, narrative strength, and timing factors using advanced AI
                models.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <Brain className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="text-slate-400">
                Leverage machine learning to identify patterns and correlations that human analysis might miss.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <Target className="h-12 w-12 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Actionable Forecasts</h3>
              <p className="text-slate-400">
                Get clear probability scores, detailed breakdowns, and strategic recommendations for funding success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-slate-400">Accuracy Rate</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-slate-400">Projects Analyzed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-emerald-400 mb-2">$2B+</div>
              <div className="text-slate-400">Funding Tracked</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-slate-400">AI Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-emerald-900/20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <Shield className="h-12 w-12 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Forecast Your Raise?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Get started with your AI-powered funding forecast in minutes. Analyze your project's potential and optimize
            your fundraising strategy.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 text-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => router.push("/forecast")}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start Your Forecast
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-700 py-8 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2024 Raise Forecast Agent. Powered by AI for Web3 funding intelligence.</p>
        </div>
      </footer>
    </div>
  )
}
