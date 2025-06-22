"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Brain, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import ForecastResults from "@/components/forecast-results"

export default function ForecastPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    projectName: "",
    founderName: "",
    narrative: "",
    traction: "",
    credentials: "",
    targetRaise: "",
    network: "",
    timeline: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch("/api/get-forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get forecast")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (results) {
    return <ForecastResults results={results} formData={formData} onBack={() => setResults(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-700 bg-slate-900/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">Raise Forecast Agent</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Project Forecast Analysis
            </h1>
            <p className="text-slate-400 text-lg">
              Provide your project details to get an AI-powered funding success forecast
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="h-5 w-5 text-blue-400 mr-2" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectName" className="text-slate-200">
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                      placeholder="e.g., DeFi Protocol X"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="founderName" className="text-slate-200">
                      Founder Name(s)
                    </Label>
                    <Input
                      id="founderName"
                      value={formData.founderName}
                      onChange={(e) => handleInputChange("founderName", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                      placeholder="e.g., John Doe, Jane Smith"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="narrative" className="text-slate-200">
                    Project Narrative
                  </Label>
                  <Textarea
                    id="narrative"
                    value={formData.narrative}
                    onChange={(e) => handleInputChange("narrative", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white min-h-[100px] placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Describe your project's vision, problem it solves, and unique value proposition..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="traction" className="text-slate-200">
                    Traction Data
                  </Label>
                  <Textarea
                    id="traction"
                    value={formData.traction}
                    onChange={(e) => handleInputChange("traction", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Users, revenue, testnet activity, partnerships, community size, etc."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="credentials" className="text-slate-200">
                    Team Credentials
                  </Label>
                  <Textarea
                    id="credentials"
                    value={formData.credentials}
                    onChange={(e) => handleInputChange("credentials", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Previous experience, education, notable achievements, past exits..."
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetRaise" className="text-slate-200">
                      Target Raise Amount
                    </Label>
                    <Input
                      id="targetRaise"
                      value={formData.targetRaise}
                      onChange={(e) => handleInputChange("targetRaise", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                      placeholder="e.g., $2M, $10M"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline" className="text-slate-200">
                      Timeline to Raise (months)
                    </Label>
                    <Input
                      id="timeline"
                      type="number"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                      placeholder="e.g., 6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="network" className="text-slate-200">
                    Network
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("network", value)} required>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500/20">
                      <SelectValue placeholder="Select blockchain network" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="ethereum" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Ethereum
                      </SelectItem>
                      <SelectItem value="solana" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Solana
                      </SelectItem>
                      <SelectItem value="polygon" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Polygon
                      </SelectItem>
                      <SelectItem value="arbitrum" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Arbitrum
                      </SelectItem>
                      <SelectItem value="optimism" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Optimism
                      </SelectItem>
                      <SelectItem value="avalanche" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Avalanche
                      </SelectItem>
                      <SelectItem value="binance" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Binance Smart Chain
                      </SelectItem>
                      <SelectItem value="other" className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                    <p className="text-red-400">Error: {error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Forecast...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Forecast
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
