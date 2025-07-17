"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Fingerprint, CheckCircle, Lock, Database } from "lucide-react"

interface AuthenticationScreenProps {
  onBack: () => void
  onAuthenticated: () => void
}

export default function AuthenticationScreen({ onBack, onAuthenticated }: AuthenticationScreenProps) {
  const [authMethod, setAuthMethod] = useState<"biometric" | "pin" | null>(null)
  const [pin, setPin] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuthenticate = () => {
    if (authMethod === "biometric") {
      alert("Simulating biometric authentication...")
      // In a real app, this would integrate with a biometric API
      setIsAuthenticated(true)
      onAuthenticated()
    } else if (authMethod === "pin") {
      if (pin === "1234") {
        // Simple mock PIN
        alert("PIN authenticated successfully!")
        setIsAuthenticated(true)
        onAuthenticated()
      } else {
        alert("Invalid PIN. Please try again.")
      }
    }
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/60 border-slate-700 text-slate-200 backdrop-blur-sm shadow-2xl text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-green-400">
              <CheckCircle className="h-8 w-8 mr-2" />
              Authentication Successful!
            </CardTitle>
            <CardDescription className="text-slate-400">You are now authenticated.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
      {/* Same Enhanced Background as Landing Page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-15">
          <div
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2306b6d4' fillOpacity='0.2'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
              animation: "float 20s ease-in-out infinite",
            }}
          />
        </div>
        {/* Animated Network Nodes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50">
          <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute top-40 right-32 w-5 h-5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50">
          <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-75 delay-1000"></div>
        </div>
        <div className="absolute bottom-32 left-40 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50">
          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75 delay-2000"></div>
        </div>
        {/* Glowing Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-25">
          <defs>
            <linearGradient id="webGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0d9488" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path d="M88,88 Q200,150 400,120 T600,200" stroke="url(#webGradient1)" strokeWidth="3" fill="none">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
          </path>
        </svg>
        {/* Scanning Lines Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan"></div>
        </div>
      </div>
      <div className="relative z-10">
        {/* Header */}
        <nav className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-lg shadow-teal-500/25">
                  <Fingerprint className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Authenticate Identity
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-8">
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <Badge className="bg-teal-900/30 text-teal-300 border-teal-500/30 px-6 py-3 backdrop-blur-sm animate-float">
              <Database className="h-4 w-4 mr-2 animate-pulse" />
              Secure blockchain verification in progress
            </Badge>
          </div>
          <div className="max-w-lg mx-auto">
            <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl hover:shadow-teal-500/10 transition-all duration-500">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 border-2 border-slate-600 group">
                  {authMethod === "biometric" && (
                    <Fingerprint className="h-24 w-24 text-slate-400 group-hover:text-teal-400 transition-colors duration-300" />
                  )}
                  {authMethod === "pin" && (
                    <Lock className="h-24 w-24 text-slate-400 group-hover:text-teal-400 transition-colors duration-300" />
                  )}
                </div>
                <CardTitle className="text-slate-100 text-2xl">Secure Access</CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  Verify your identity to access your credentials
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={() => setAuthMethod("biometric")}
                      variant={authMethod === "biometric" ? "default" : "outline"}
                      className={`w-full justify-start ${
                        authMethod === "biometric"
                          ? "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                          : "border-slate-600 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <Fingerprint className="h-5 w-5 mr-2" />
                      Biometric Authentication
                    </Button>
                    <Button
                      onClick={() => setAuthMethod("pin")}
                      variant={authMethod === "pin" ? "default" : "outline"}
                      className={`w-full justify-start ${
                        authMethod === "pin"
                          ? "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                          : "border-slate-600 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      <Lock className="h-5 w-5 mr-2" />
                      PIN Authentication
                    </Button>
                  </div>

                  {authMethod === "pin" && (
                    <div>
                      <Label htmlFor="pin" className="text-slate-300">
                        Enter PIN
                      </Label>
                      <Input
                        id="pin"
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="****"
                        maxLength={4}
                        className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-cyan-500"
                      />
                    </div>
                  )}

                  <div className="flex justify-between gap-4">
                    <Button
                      onClick={onBack}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleAuthenticate}
                      disabled={!authMethod || (authMethod === "pin" && pin.length !== 4)}
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                    >
                      Authenticate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Help Section */}
            <div className="mt-8 text-center animate-fade-in-up">
              <p className="text-slate-400">
                Need help?{" "}
                <button className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-300">
                  Contact Support
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  )
}
