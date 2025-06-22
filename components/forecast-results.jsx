"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Share2,
  TrendingUp,
  Users,
  Target,
  Clock,
  Network,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  FileText,
} from "lucide-react"

export default function ForecastResults({ results, formData, onBack }) {
  const { toast } = useToast()
  const [animatedValues, setAnimatedValues] = useState({
    successProbability: 0,
    narrativeStrength: 0,
    founderTrust: 0,
    tractionScore: 0,
  })
  const [showCards, setShowCards] = useState(false)

  useEffect(() => {
    // Animate the main probability first
    const timer1 = setTimeout(() => {
      setAnimatedValues((prev) => ({ ...prev, successProbability: results.successProbability }))
    }, 500)

    // Then animate the other metrics
    const timer2 = setTimeout(() => {
      setAnimatedValues((prev) => ({
        ...prev,
        narrativeStrength: results.narrativeStrength,
        founderTrust: results.founderTrust,
        tractionScore: results.tractionScore,
      }))
      setShowCards(true)
    }, 1500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [results])

  const getVerdictColor = (verdict) => {
    switch (verdict.toLowerCase()) {
      case "likely":
        return "text-emerald-400"
      case "neutral":
        return "text-amber-400"
      case "unlikely":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getScoreColor = (score) => {
    if (score >= 8) return "text-emerald-400"
    if (score >= 6) return "text-amber-400"
    return "text-red-400"
  }

  const getProgressColor = (score) => {
    if (score >= 8) return "bg-emerald-500"
    if (score >= 6) return "bg-amber-500"
    return "bg-red-500"
  }

  const generatePDFContent = () => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Funding Forecast Report - ${formData.projectName}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; }
        .title { font-size: 28px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
        .subtitle { font-size: 16px; color: #666; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1e293b; }
        .metric { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 5px; }
        .metric-name { font-weight: bold; }
        .metric-value { color: #2563eb; font-weight: bold; }
        .explanation { margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 5px; }
        .insights { margin-top: 20px; }
        .insight-category { margin-bottom: 20px; }
        .insight-title { font-weight: bold; margin-bottom: 10px; }
        .insight-list { list-style-type: disc; margin-left: 20px; }
        .insight-list li { margin-bottom: 5px; }
        .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">${formData.projectName}</div>
        <div class="subtitle">AI-Powered Funding Forecast Report</div>
        <div class="subtitle">Generated on ${new Date().toLocaleDateString()}</div>
    </div>

    <div class="section">
        <div class="section-title">Executive Summary</div>
        <div class="metric">
            <span class="metric-name">Success Probability:</span>
            <span class="metric-value">${results.successProbability}%</span>
        </div>
        <div class="metric">
            <span class="metric-name">Final Verdict:</span>
            <span class="metric-value">${results.finalVerdict}</span>
        </div>
        <div class="explanation">
            <strong>Analysis:</strong> ${results.explanation}
        </div>
    </div>

    <div class="section">
        <div class="section-title">Detailed Metrics</div>
        <div class="metric">
            <span class="metric-name">Narrative Strength:</span>
            <span class="metric-value">${results.narrativeStrength}/10</span>
        </div>
        <div class="metric">
            <span class="metric-name">Founder Trust:</span>
            <span class="metric-value">${results.founderTrust}/10</span>
        </div>
        <div class="metric">
            <span class="metric-name">Traction Score:</span>
            <span class="metric-value">${results.tractionScore}/10</span>
        </div>
        <div class="metric">
            <span class="metric-name">Network Fit:</span>
            <span class="metric-value">${results.networkFit}</span>
        </div>
        <div class="metric">
            <span class="metric-name">Market Timing:</span>
            <span class="metric-value">${results.timing}</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Project Details</div>
        <div class="metric">
            <span class="metric-name">Founders:</span>
            <span class="metric-value">${formData.founderName}</span>
        </div>
        <div class="metric">
            <span class="metric-name">Target Raise:</span>
            <span class="metric-value">${formData.targetRaise}</span>
        </div>
        <div class="metric">
            <span class="metric-name">Timeline:</span>
            <span class="metric-value">${formData.timeline} months</span>
        </div>
        <div class="metric">
            <span class="metric-name">Network:</span>
            <span class="metric-value">${formData.network}</span>
        </div>
    </div>

    ${
      results.detailedInsights
        ? `
    <div class="section">
        <div class="section-title">Detailed Insights</div>
        <div class="insights">
            <div class="insight-category">
                <div class="insight-title">Key Strengths:</div>
                <ul class="insight-list">
                    ${results.detailedInsights.strengths?.map((item) => `<li>${item}</li>`).join("") || "<li>No specific strengths identified</li>"}
                </ul>
            </div>
            <div class="insight-category">
                <div class="insight-title">Areas of Concern:</div>
                <ul class="insight-list">
                    ${results.detailedInsights.weaknesses?.map((item) => `<li>${item}</li>`).join("") || "<li>No specific concerns identified</li>"}
                </ul>
            </div>
            <div class="insight-category">
                <div class="insight-title">Recommendations:</div>
                <ul class="insight-list">
                    ${results.detailedInsights.recommendations?.map((item) => `<li>${item}</li>`).join("") || "<li>No specific recommendations provided</li>"}
                </ul>
            </div>
        </div>
    </div>
    `
        : ""
    }

    <div class="footer">
        <p>This report was generated by Raise Forecast Agent - AI-Powered Web3 Funding Intelligence</p>
        <p>Report ID: RFC-${Date.now()}</p>
    </div>
</body>
</html>
    `
  }

  const handleDownloadPDF = () => {
    const htmlContent = generatePDFContent()
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${formData.projectName.replace(/\s+/g, "_")}_Forecast_Report.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Report Downloaded",
      description: "Your forecast report has been downloaded successfully.",
    })
  }

  const handleShare = async () => {
    const shareData = {
      title: `${formData.projectName} - Funding Forecast`,
      text: `Check out the AI-powered funding forecast for ${formData.projectName}. Success probability: ${results.successProbability}%`,
      url: window.location.href,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "Shared Successfully",
          description: "Forecast has been shared successfully.",
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        toast({
          title: "Link Copied",
          description: "Forecast link has been copied to clipboard.",
        })
      }
    } catch (error) {
      // Final fallback
      const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      const textArea = document.createElement("textarea")
      textArea.value = textToCopy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)

      toast({
        title: "Link Copied",
        description: "Forecast link has been copied to clipboard.",
      })
    }
  }

  const MetricCard = ({ icon: Icon, title, score, maxScore = 10, explanation, color, delay = 0 }) => (
    <Card
      className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/70 hover:border-slate-600 hover:shadow-lg hover:shadow-blue-500/10 ${showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <Icon className={`h-5 w-5 ${color} mr-2`} />
        <CardTitle className="text-sm font-medium text-slate-200">{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-slate-400 ml-auto cursor-help hover:text-slate-300" />
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-xs">
              <p>{explanation}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-100 mb-2">
          <span className={getScoreColor(score)}>
            {score}/{maxScore}
          </span>
        </div>
        <div className="relative">
          <Progress value={(score / maxScore) * 100} className="h-2 bg-slate-700" />
          <div
            className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(score)}`}
            style={{ width: `${((animatedValues[title.toLowerCase().replace(" ", "")] || 0) / maxScore) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  )

  const InsightCard = ({ icon: Icon, title, items, color }) => (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300">
      <CardHeader className="flex flex-row items-center space-y-0 pb-3">
        <Icon className={`h-5 w-5 ${color} mr-2`} />
        <CardTitle className="text-sm font-medium text-slate-200">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items?.map((item, index) => (
            <li key={index} className="text-sm text-slate-300 flex items-start">
              <span className={`w-2 h-2 rounded-full ${color.replace("text-", "bg-")} mt-2 mr-3 flex-shrink-0`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

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
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Forecast
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Project Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {formData.projectName}
            </h1>
            <p className="text-slate-400 text-lg">AI-Powered Funding Forecast Analysis</p>
          </div>

          {/* Main Forecast Card */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-slate-100 mb-4">Success Probability</CardTitle>
              <div className="relative mb-6">
                {/* Shiny animated percentage */}
                <div className="relative inline-block">
                  <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-2000 ease-out animate-pulse">
                    {animatedValues.successProbability}%
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-2xl opacity-50 animate-pulse" />
                  {/* Sparkle effect */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-80 animate-ping" />
                  <div
                    className="absolute bottom-4 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>
              {/* Verdict as text instead of badge */}
              <div className={`text-2xl font-semibold ${getVerdictColor(results.finalVerdict)} mb-4`}>
                {results.finalVerdict}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 relative">
                <Progress value={animatedValues.successProbability} className="h-4 bg-slate-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-sm" />
              </div>
              <p className="text-slate-300 text-center leading-relaxed text-lg">{results.explanation}</p>
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={Star}
              title="Narrative Strength"
              score={results.narrativeStrength}
              explanation={
                results.narrativeExplanation ||
                "Assessment of project vision, market opportunity, and value proposition clarity"
              }
              color="text-purple-400"
              delay={0}
            />
            <MetricCard
              icon={Users}
              title="Founder Trust"
              score={results.founderTrust}
              explanation={
                results.founderExplanation ||
                "Evaluation of team credentials, experience, and track record in relevant domains"
              }
              color="text-blue-400"
              delay={200}
            />
            <MetricCard
              icon={TrendingUp}
              title="Traction Score"
              score={results.tractionScore}
              explanation={
                results.tractionExplanation ||
                "Analysis of user adoption, revenue metrics, partnerships, and market validation"
              }
              color="text-emerald-400"
              delay={400}
            />
            <Card
              className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/70 hover:border-slate-600 hover:shadow-lg hover:shadow-orange-500/10 ${showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "600ms" }}
            >
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Network className="h-5 w-5 text-orange-400 mr-2" />
                <CardTitle className="text-sm font-medium text-slate-200">Network Fit</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-slate-400 ml-auto cursor-help hover:text-slate-300" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-xs">
                      <p>
                        {results.networkExplanation ||
                          "How well the chosen blockchain aligns with project requirements and target market"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100 mb-2">{results.networkFit}</div>
                <p className="text-sm text-slate-400 capitalize">{formData.network} alignment</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Clock className="h-5 w-5 text-amber-400 mr-2" />
                <CardTitle className="text-sm font-medium text-slate-200">Market Timing</CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-slate-400 ml-auto cursor-help hover:text-slate-300" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-xs">
                      <p>
                        {results.timingExplanation ||
                          "Assessment of market conditions and fundraising timeline appropriateness"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100 mb-2">{results.timing}</div>
                <p className="text-sm text-slate-400">{formData.timeline} month timeline</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <Target className="h-5 w-5 text-red-400 mr-2" />
                <CardTitle className="text-sm font-medium text-slate-200">Funding Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100 mb-2">{formData.targetRaise}</div>
                <p className="text-sm text-slate-400">Funding goal assessment</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Insights */}
          {results.detailedInsights && (
            <Tabs defaultValue="insights" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700 p-1">
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300 border border-transparent data-[state=active]:border-slate-600 rounded-md transition-all duration-200"
                >
                  Detailed Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="summary"
                  className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300 border border-transparent data-[state=active]:border-slate-600 rounded-md transition-all duration-200"
                >
                  Project Summary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="insights" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <InsightCard
                    icon={CheckCircle}
                    title="Key Strengths"
                    items={results.detailedInsights.strengths}
                    color="text-emerald-400"
                  />
                  <InsightCard
                    icon={AlertCircle}
                    title="Areas of Concern"
                    items={results.detailedInsights.weaknesses}
                    color="text-amber-400"
                  />
                  <InsightCard
                    icon={Lightbulb}
                    title="Recommendations"
                    items={results.detailedInsights.recommendations}
                    color="text-blue-400"
                  />
                </div>
              </TabsContent>

              <TabsContent value="summary" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-slate-100">Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-200 mb-3">Team & Leadership</h4>
                        <ul className="space-y-2">
                          <li className="text-slate-300 flex items-start">
                            <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0" />
                            <span>
                              <span className="text-slate-400">Founders:</span> {formData.founderName}
                            </span>
                          </li>
                          <li className="text-slate-300 flex items-start">
                            <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0" />
                            <span>
                              <span className="text-slate-400">Network:</span> {formData.network}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-200 mb-3">Funding Details</h4>
                        <ul className="space-y-2">
                          <li className="text-slate-300 flex items-start">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                            <span>
                              <span className="text-slate-400">Target Raise:</span> {formData.targetRaise}
                            </span>
                          </li>
                          <li className="text-slate-300 flex items-start">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                            <span>
                              <span className="text-slate-400">Timeline:</span> {formData.timeline} months
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-200 mb-3">Key Performance Indicators</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="text-2xl font-bold text-emerald-400">{results.successProbability}%</div>
                          <div className="text-xs text-slate-400">Success Rate</div>
                        </div>
                        <div className="text-center p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="text-2xl font-bold text-purple-400">{results.narrativeStrength}/10</div>
                          <div className="text-xs text-slate-400">Narrative</div>
                        </div>
                        <div className="text-center p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="text-2xl font-bold text-blue-400">{results.founderTrust}/10</div>
                          <div className="text-xs text-slate-400">Founder Trust</div>
                        </div>
                        <div className="text-center p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                          <div className="text-2xl font-bold text-emerald-400">{results.tractionScore}/10</div>
                          <div className="text-xs text-slate-400">Traction</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
