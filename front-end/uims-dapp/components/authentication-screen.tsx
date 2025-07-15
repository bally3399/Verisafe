// "use client"
// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, Fingerprint, CheckCircle, Loader2, Lock, Eye, EyeOff, Database, XCircle } from "lucide-react"

// interface AuthenticationScreenProps {
//   onBack: () => void
//   onAuthenticated: () => void
// }

// export default function AuthenticationScreen({ onBack, onAuthenticated }: AuthenticationScreenProps) {
//   const [authMethod, setAuthMethod] = useState("biometric")
//   const [pin, setPin] = useState("")
//   const [showPin, setShowPin] = useState(false)
//   const [biometricStatus, setBiometricStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
//   const [isAuthenticating, setIsAuthenticating] = useState(false)
//   const [authResult, setAuthResult] = useState<"success" | "failure" | null>(null)
//   const [status, setStatus] = useState<"idle" | "authenticating" | "success" | "error">("idle")
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")

//   const handleBiometricAuth = () => {
//     setBiometricStatus("scanning")
//     setIsAuthenticating(true)
//     setTimeout(() => {
//       const success = Math.random() > 0.2
//       setBiometricStatus(success ? "success" : "error")
//       setAuthResult(success ? "success" : "failure")
//       setIsAuthenticating(false)
//       if (success) {
//         setTimeout(() => onAuthenticated(), 1500)
//       }
//     }, 3000)
//   }

//   const handlePinAuth = () => {
//     if (pin.length !== 6) return
//     setIsAuthenticating(true)
//     setTimeout(() => {
//       const success = pin === "123456"
//       setAuthResult(success ? "success" : "failure")
//       setIsAuthenticating(false)
//       if (success) {
//         setTimeout(() => onAuthenticated(), 1500)
//       }
//     }, 2000)
//   }

//   const handleAuthenticate = async () => {
//     setIsAuthenticating(true)
//     setAuthResult(null)

//     // Simulate authentication process
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     if (username === "demo" && password === "password") {
//       setAuthResult("success")
//       onAuthenticated()
//       setTimeout(onBack, 1500) // Go back to dashboard after a short delay
//     } else {
//       setAuthResult("failure")
//     }
//     setIsAuthenticating(false)
//   }

//   const resetAuth = () => {
//     setBiometricStatus("idle")
//     setAuthResult(null)
//     setPin("")
//     setUsername("")
//     setPassword("")
//     setStatus("idle")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
//       {/* Same Enhanced Background as Landing Page */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 opacity-15">
//           <div
//             className="w-full h-full animate-pulse"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2306b6d4' fillOpacity='0.2'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: "60px 60px",
//               animation: "float 20s ease-in-out infinite",
//             }}
//           />
//         </div>
//         {/* Animated Network Nodes */}
//         <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50">
//           <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
//         </div>
//         <div className="absolute top-40 right-32 w-5 h-5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50">
//           <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-75 delay-1000"></div>
//         </div>
//         <div className="absolute bottom-32 left-40 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50">
//           <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75 delay-2000"></div>
//         </div>
//         {/* Glowing Connection Lines */}
//         <svg className="absolute inset-0 w-full h-full opacity-25">
//           <defs>
//             <linearGradient id="webGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
//               <stop offset="50%" stopColor="#0d9488" stopOpacity="0.7" />
//               <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
//             </linearGradient>
//           </defs>
//           <path d="M88,88 Q200,150 400,120 T600,200" stroke="url(#webGradient1)" strokeWidth="3" fill="none">
//             <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
//           </path>
//         </svg>
//         {/* Scanning Lines Effect */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan"></div>
//         </div>
//       </div>
//       <div className="relative z-10">
//         {/* Header */}
//         <nav className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
//           <div className="container mx-auto px-6 py-4">
//             <div className="flex items-center">
//               <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mr-4">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back
//               </Button>
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-lg shadow-teal-500/25">
//                   <Fingerprint className="h-5 w-5 text-white" />
//                 </div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
//                   Authenticate Identity
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <div className="container mx-auto px-6 py-8">
//           {/* Status Badge */}
//           <div className="flex justify-center mb-8">
//             <Badge className="bg-teal-900/30 text-teal-300 border-teal-500/30 px-6 py-3 backdrop-blur-sm animate-float">
//               <Database className="h-4 w-4 mr-2 animate-pulse" />
//               Secure blockchain verification in progress
//             </Badge>
//           </div>
//           <div className="max-w-lg mx-auto">
//             <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl hover:shadow-teal-500/10 transition-all duration-500">
//               <CardHeader className="text-center pb-6">
//                 <div className="mx-auto w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 border-2 border-slate-600 group">
//                   {authResult === null && (
//                     <>
//                       {biometricStatus === "idle" && (
//                         <Fingerprint className="h-24 w-24 text-slate-400 group-hover:text-teal-400 transition-colors duration-300" />
//                       )}
//                       {biometricStatus === "scanning" && (
//                         <div className="relative">
//                           <Fingerprint className="h-24 w-24 text-teal-400 animate-pulse" />
//                           <div className="absolute inset-0 border-4 border-teal-400 rounded-full animate-ping" />
//                           <div className="absolute inset-4 border-2 border-cyan-400 rounded-full animate-ping delay-150" />
//                           <div className="absolute inset-8 border-1 border-emerald-400 rounded-full animate-ping delay-300" />
//                         </div>
//                       )}
//                       {authResult === "success" && <CheckCircle className="h-24 w-24 text-green-400 animate-bounce" />}
//                       {authResult === "failure" && <XCircle className="h-24 w-24 text-red-400 animate-pulse" />}
//                     </>
//                   )}
//                 </div>
//                 <CardTitle className="text-slate-100 text-2xl">Secure Access</CardTitle>
//                 <CardDescription className="text-slate-400 text-lg">
//                   Verify your identity to access your credentials
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="px-8 pb-8">
//                 <Tabs value={authMethod} onValueChange={setAuthMethod} className="w-full">
//                   <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 p-1">
//                     <TabsTrigger
//                       value="biometric"
//                       className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300"
//                     >
//                       <Fingerprint className="h-4 w-4 mr-2" />
//                       Biometric
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="pin"
//                       className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-300"
//                     >
//                       <Lock className="h-4 w-4 mr-2" />
//                       PIN
//                     </TabsTrigger>
//                   </TabsList>
//                   <TabsContent value="biometric" className="space-y-8 mt-8">
//                     <div className="text-center">
//                       {authResult === null && (
//                         <>
//                           {biometricStatus === "idle" && (
//                             <p className="text-slate-400 mb-6 text-lg animate-fade-in-up">
//                               Touch the sensor to authenticate
//                             </p>
//                           )}
//                           {biometricStatus === "scanning" && (
//                             <p className="text-teal-400 mb-6 text-lg animate-pulse">Scanning... Please hold still</p>
//                           )}
//                         </>
//                       )}
//                       {authResult === "success" && (
//                         <div className="text-center animate-fade-in-up">
//                           <p className="text-green-400 mb-2 font-semibold text-xl">Authentication Successful!</p>
//                           <p className="text-slate-400">Redirecting to dashboard...</p>
//                         </div>
//                       )}
//                       {authResult === "failure" && (
//                         <div className="text-center animate-fade-in-up">
//                           <p className="text-red-400 mb-2 font-semibold text-xl">Authentication Failed</p>
//                           <p className="text-slate-400 mb-6">Please try again or use PIN</p>
//                           <Button
//                             onClick={resetAuth}
//                             variant="outline"
//                             className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
//                           >
//                             Try Again
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                     {authResult === null && (
//                       <Button
//                         onClick={handleBiometricAuth}
//                         disabled={isAuthenticating}
//                         className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/25 py-6 text-lg transition-all duration-300 hover:scale-105"
//                       >
//                         {isAuthenticating ? (
//                           <>
//                             <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                             Authenticating...
//                           </>
//                         ) : (
//                           <>
//                             <Fingerprint className="h-5 w-5 mr-2" />
//                             Start Biometric Scan
//                           </>
//                         )}
//                       </Button>
//                     )}
//                   </TabsContent>
//                   <TabsContent value="pin" className="space-y-8 mt-8">
//                     <div className="space-y-6">
//                       <div>
//                         <Label htmlFor="pin" className="text-slate-200 text-lg mb-3 block">
//                           Enter 6-digit PIN
//                         </Label>
//                         <div className="relative">
//                           <Input
//                             id="pin"
//                             type={showPin ? "text" : "password"}
//                             value={pin}
//                             onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
//                             className="bg-slate-700/50 border-slate-600 text-slate-200 text-center text-2xl tracking-widest py-6 focus:border-cyan-500 transition-all duration-300"
//                             placeholder="••••••"
//                             maxLength={6}
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="sm"
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
//                             onClick={() => setShowPin(!showPin)}
//                           >
//                             {showPin ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                           </Button>
//                         </div>
//                         <p className="text-slate-500 text-sm mt-2">Demo PIN: 123456</p>
//                       </div>
//                       {authResult === "success" && (
//                         <div className="text-center text-green-400 animate-fade-in-up">
//                           <CheckCircle className="h-12 w-12 mx-auto mb-4 animate-bounce" />
//                           <p className="font-semibold text-xl">Authentication Successful!</p>
//                           <p className="text-slate-400">Redirecting to dashboard...</p>
//                         </div>
//                       )}
//                       {authResult === "failure" && (
//                         <div className="text-center text-red-400 animate-fade-in-up">
//                           <XCircle className="h-12 w-12 mx-auto mb-4 animate-pulse" />
//                           <p className="font-semibold text-xl">Invalid PIN</p>
//                           <p className="text-slate-400 mb-6">Please check your PIN and try again</p>
//                           <Button
//                             onClick={resetAuth}
//                             variant="outline"
//                             className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent"
//                           >
//                             Try Again
//                           </Button>
//                         </div>
//                       )}
//                       {authResult === null && (
//                         <Button
//                           onClick={handlePinAuth}
//                           disabled={pin.length !== 6 || isAuthenticating}
//                           className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-lg shadow-cyan-500/25 py-6 text-lg transition-all duration-300 hover:scale-105"
//                         >
//                           {isAuthenticating ? (
//                             <>
//                               <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                               Verifying...
//                             </>
//                           ) : (
//                             <>
//                               <Lock className="h-5 w-5 mr-2" />
//                               Authenticate with PIN
//                             </>
//                           )}
//                         </Button>
//                       )}
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//                 <div className="space-y-6 mt-8">
//                   <div>
//                     <Label htmlFor="username" className="text-slate-300">
//                       Username (Demo: "demo")
//                     </Label>
//                     <Input
//                       id="username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       placeholder="Enter your username"
//                       className="bg-slate-700/50 border-slate-600 text-white focus-visible:ring-cyan-500"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="password" className="text-slate-300">
//                       Password (Demo: "password")
//                     </Label>
//                     <Input
//                       id="password"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       className="bg-slate-700/50 border-slate-600 text-white focus-visible:ring-cyan-500"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleAuthenticate}
//                     disabled={isAuthenticating || !username || !password}
//                     className="w-full bg-cyan-600 hover:bg-cyan-700"
//                   >
//                     {isAuthenticating ? (
//                       <>
//                         <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                         Authenticating...
//                       </>
//                     ) : (
//                       "Authenticate"
//                     )}
//                   </Button>
//                 </div>

//                 {authResult === "success" && (
//                   <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center text-green-300">
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Authentication successful!
//                   </div>
//                 )}
//                 {authResult === "failure" && (
//                   <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center text-red-300">
//                     <XCircle className="h-4 w-4 mr-2" />
//                     Authentication failed. Please check your credentials.
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//             {/* Help Section */}
//             <div className="mt-8 text-center animate-fade-in-up">
//               <p className="text-slate-400">
//                 Need help?{" "}
//                 <button className="text-cyan-400 hover:text-cyan-300 underline transition-colors duration-300">
//                   Contact Support
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//           100% {
//             transform: translateY(0);
//           }
//         }
//         @keyframes scan {
//           0% {
//             top: 0%;
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             top: 100%;
//             opacity: 0;
//           }
//         }
//         @keyframes fade-in-up {
//           0% {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-scan {
//           animation: scan 3s linear infinite;
//         }
//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-out;
//         }
//       `}</style>
//     </div>
//   )
// }

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
