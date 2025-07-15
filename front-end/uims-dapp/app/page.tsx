// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import {
//   Shield,
//   Fingerprint,
//   Eye,
//   Lock,
//   ArrowRight,
//   Database,
//   Layers,
//   Menu,
//   X,
//   Wallet,
//   AlertCircle,
//   HelpCircle,
//   Plus,
// } from "lucide-react"
// import EnrollmentScreen from "@/components/enrollment-screen"
// import AuthenticationScreen from "@/components/authentication-screen"
// import CredentialSharingScreen from "@/components/credential-sharing-screen"
// import RevocationScreen from "@/components/revocation-screen"
// import QAScreen from "@/components/qa-screen"
// import CredentialCreationScreen from "@/components/credential-creation-screen" // Using the provided component
// import WalletConnectionModal from "@/components/wallet-connection-modal"
// import WalletDropdown from "@/components/wallet-dropdown"
// import { Badge } from "@/components/ui/badge"
// import { WalletProvider, useWallet } from "@/hooks/useWallet"

// interface Credential {
//   id: string
//   type: string
//   issuer: string
//   issuedDate: string
//   expiryDate?: string
//   status: "active" | "expired" | "revoked"
//   fields: { [key: string]: string }
// }

// function VerisafeDashboardContent() {
//   const [currentScreen, setCurrentScreen] = useState("dashboard")
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [userCredentials, setUserCredentials] = useState<Credential[]>([])
//   const [showWalletModal, setShowWalletModal] = useState(false)
//   const [walletRequiredMessage, setWalletRequiredMessage] = useState("")
//   const [intendedScreen, setIntendedScreen] = useState<string | null>(null) // New state for intended screen
//   const { isConnected } = useWallet()

//   // Function to add new credential when enrollment is completed
//   const handleEnrollmentComplete = (newCredential: Credential) => {
//     setUserCredentials((prev) => [...prev, newCredential])
//     setCurrentScreen("dashboard")
//   }

//   // Function to handle navigation with wallet check
//   const handleNavigateWithWalletCheck = (screen: string, requiresWallet = false) => {
//     if (requiresWallet && !isConnected) {
//       setWalletRequiredMessage("Please connect your Cardano wallet to access this feature.")
//       setIntendedScreen(screen) // Store the intended screen
//       setShowWalletModal(true)
//       return
//     }
//     setCurrentScreen(screen)
//     setMobileMenuOpen(false)
//   }

//   // Handle enrollment completion with wallet check
//   const handleEnrollmentAttempt = () => {
//     if (!isConnected) {
//       setWalletRequiredMessage(
//         "A Cardano wallet connection is required to create your identity. Please connect your wallet to continue.",
//       )
//       setIntendedScreen("enrollment") // Store the intended screen
//       // Do not change screen here, let the modal handle the prompt
//       return
//     }
//     // If wallet is connected, proceed to enrollment screen
//     setCurrentScreen("enrollment")
//   }

//   const handleWalletConnectionSuccess = () => {
//     setWalletRequiredMessage("")
//     setShowWalletModal(false) // Close modal on success
//     if (intendedScreen) {
//       setCurrentScreen(intendedScreen) // Navigate to the intended screen
//       setIntendedScreen(null) // Clear the intended screen
//     }
//   }

//   const renderScreen = () => {
//     switch (currentScreen) {
//       case "enrollment":
//         return (
//           <EnrollmentScreen
//             onBack={() => setCurrentScreen("dashboard")}
//             onComplete={handleEnrollmentComplete}
//             onWalletRequired={handleEnrollmentAttempt} // This will trigger the modal if wallet is disconnected
//           />
//         )
//       case "credential-creation":
//         // Note: The provided CredentialCreationScreen component has the same content as CredentialSharingScreen.
//         // If its functionality is meant to be different, please provide a distinct implementation.
//         return <CredentialCreationScreen onBack={() => setCurrentScreen("dashboard")} credentials={userCredentials} />
//       case "authentication":
//         return (
//           <AuthenticationScreen
//             onBack={() => setCurrentScreen("dashboard")}
//             onAuthenticated={() => setIsAuthenticated(true)}
//           />
//         )
//       case "sharing":
//         return <CredentialSharingScreen onBack={() => setCurrentScreen("dashboard")} credentials={userCredentials} />
//       case "revocation":
//         return (
//           <RevocationScreen
//             onBack={() => setCurrentScreen("dashboard")}
//             credentials={userCredentials}
//             setCredentials={setUserCredentials}
//           />
//         )
//       case "qa":
//         return <QAScreen onBack={() => setCurrentScreen("dashboard")} />
//       default:
//         return (
//           <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
//             {/* Enhanced Web3 Background */}
//             <div className="absolute inset-0">
//               <div className="absolute inset-0 opacity-15">
//                 <div
//                   className="w-full h-full animate-pulse"
//                   style={{
//                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2306b6d4' fillOpacity='0.2'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//                     backgroundSize: "60px 60px",
//                     animation: "float 20s ease-in-out infinite",
//                   }}
//                 />
//               </div>
//               {/* Floating Network Nodes */}
//               <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50">
//                 <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
//               </div>
//               <div className="absolute top-40 right-32 w-5 h-5 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50">
//                 <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-75 delay-1000"></div>
//               </div>
//               <div className="absolute bottom-32 left-40 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50">
//                 <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75 delay-2000"></div>
//               </div>
//               {/* Glowing Connection Lines */}
//               <svg className="absolute inset-0 w-full h-full opacity-25">
//                 <defs>
//                   <linearGradient id="webGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
//                     <stop offset="50%" stopColor="#0d9488" stopOpacity="0.7" />
//                     <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
//                   </linearGradient>
//                 </defs>
//                 <path d="M88,88 Q200,150 400,120 T600,200" stroke="url(#webGradient1)" strokeWidth="3" fill="none">
//                   <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
//                 </path>
//               </svg>
//               {/* Scanning Lines Effect */}
//               <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-scan"></div>
//               </div>
//             </div>
//             <div className="relative z-10">
//               {/* Responsive Navigation Bar */}
//               <nav className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
//                 <div className="container mx-auto px-4 sm:px-6 py-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3 sm:space-x-4">
//                       <div className="relative">
//                         <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg shadow-cyan-500/25">
//                           <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
//                         </div>
//                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
//                       </div>
//                       <div>
//                         <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
//                           Verisafe
//                         </h1>
//                         <p className="text-xs text-slate-400 flex items-center">
//                           <Database className="h-3 w-3 mr-1" />
//                           Decentralized Identity Platform
//                         </p>
//                       </div>
//                     </div>
//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex items-center space-x-4">
//                       {isConnected ? (
//                         <WalletDropdown />
//                       ) : (
//                         <Button
//                           onClick={() => setShowWalletModal(true)}
//                           variant="outline"
//                           size="sm"
//                           className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
//                         >
//                           <Wallet className="h-4 w-4 mr-2" />
//                           Connect Wallet
//                         </Button>
//                       )}
//                     </div>
//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         className="text-slate-400 hover:text-white"
//                       >
//                         {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                       </Button>
//                     </div>
//                   </div>
//                   {/* Mobile Menu */}
//                   {mobileMenuOpen && (
//                     <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4">
//                       <div className="space-y-3">
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("qa")}
//                           variant="ghost"
//                           className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
//                         >
//                           <HelpCircle className="h-4 w-4 mr-2" />
//                           Q&A
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
//                           variant="ghost"
//                           className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
//                         >
//                           <Shield className="h-4 w-4 mr-2" />
//                           Create Identity
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
//                           variant="ghost"
//                           className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
//                         >
//                           <Plus className="h-4 w-4 mr-2" />
//                           Create Credential
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("revocation", true)}
//                           variant="ghost"
//                           className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
//                         >
//                           <Database className="h-4 w-4 mr-2" />
//                           Manage
//                         </Button>
//                         <div className="border-t border-slate-700/50 pt-3">
//                           {isConnected ? (
//                             <WalletDropdown />
//                           ) : (
//                             <Button
//                               onClick={() => setShowWalletModal(true)}
//                               variant="outline"
//                               className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
//                             >
//                               <Wallet className="h-4 w-4 mr-2" />
//                               Connect Wallet
//                             </Button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </nav>
//               {/* Wallet Required Message */}
//               {walletRequiredMessage && (
//                 <div className="bg-amber-900/20 border-b border-amber-500/30 px-4 py-3">
//                   <div className="container mx-auto flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                       <AlertCircle className="h-4 w-4 text-amber-400" />
//                       <span className="text-amber-300 text-sm">{walletRequiredMessage}</span>
//                     </div>
//                     <Button
//                       onClick={() => {
//                         setWalletRequiredMessage("")
//                         setShowWalletModal(true)
//                       }}
//                       size="sm"
//                       className="bg-amber-600 hover:bg-amber-700 text-white"
//                     >
//                       Connect Wallet
//                     </Button>
//                   </div>
//                 </div>
//               )}
//               <div className="container mx-auto px-4 sm:px-6 py-8">
//                 {/* Hero Section */}
//                 <div className="relative mb-20">
//                   <div className="text-center mb-16 relative">
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-cyan-500/30 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-8 backdrop-blur-sm animate-float shadow-2xl shadow-cyan-500/20">
//                       <div className="relative">
//                         <Layers
//                           className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-spin"
//                           style={{ animationDuration: "8s" }}
//                         />
//                         <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
//                       </div>
//                       <span className="text-cyan-300 font-semibold text-sm sm:text-lg">Next-Gen Identity Protocol</span>
//                       <div className="flex space-x-1">
//                         <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
//                         <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping delay-200"></div>
//                         <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-400"></div>
//                       </div>
//                     </div>
//                     <div className="relative mb-8">
//                       <h1
//                         className="text-6xl sm:text-7xl md:text-8xl font-light mb-4 leading-tight tracking-wide"
//                         style={{ fontFamily: "Inter, system-ui, sans-serif" }}
//                       >
//                         <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x font-extralight">
//                           VERISAFE
//                         </span>
//                         <span
//                           className="block text-3xl sm:text-4xl md:text-5xl font-thin text-slate-300 mt-2 animate-fade-in-up delay-500"
//                           style={{ fontFamily: "Inter, system-ui, sans-serif" }}
//                         >
//                           Identity. Redefined.
//                         </span>
//                       </h1>
//                       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
//                     </div>
//                     <div className="max-w-5xl mx-auto mb-12 animate-fade-in-up delay-700">
//                       <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 leading-relaxed font-light mb-6">
//                         The world's first <span className="text-cyan-400 font-semibold">zero-knowledge</span> identity
//                         platform
//                       </p>
//                       <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
//                         Powered by Walrus decentralized storage and Cardano smart contracts. Experience true data
//                         sovereignty with military-grade encryption and GDPR compliance.
//                       </p>
//                     </div>
//                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 animate-fade-in-up delay-1000">
//                       <Button
//                         onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
//                         className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-2xl shadow-cyan-500/30 transition-all duration-500 hover:scale-110 hover:shadow-cyan-500/50 w-full sm:w-auto"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
//                         <div className="relative flex items-center justify-center">
//                           <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-3 group-hover:animate-spin" />
//                           Create Your Identity
//                           <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
//                         </div>
//                       </Button>
//                       <Button
//                         onClick={() => handleNavigateWithWalletCheck("authentication")}
//                         variant="outline"
//                         className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-white font-bold text-lg sm:text-xl rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-slate-800/50 w-full sm:w-auto"
//                       >
//                         <Fingerprint className="h-5 w-5 sm:h-6 sm:w-6 mr-3 group-hover:text-cyan-400 transition-colors duration-300" />
//                         Try Demo
//                       </Button>
//                     </div>
//                   </div>
//                   {/* Updated Navigation Cards */}
//                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
//                     {/* Create New Identity */}
//                     <Card
//                       className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
//                       onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
//                     >
//                       <CardContent className="p-6 text-center relative overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <div className="relative z-10">
//                           <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-400/25 group-hover:scale-110 transition-transform duration-300">
//                             <Shield className="h-8 w-8 text-white group-hover:animate-pulse" />
//                           </div>
//                           <h3 className="text-lg font-bold text-slate-100 mb-2">Create New Identity</h3>
//                           <p className="text-slate-400 text-sm leading-relaxed">
//                             Secure biometric enrollment with Walrus storage
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     {/* Create Credentials */}
//                     <Card
//                       className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
//                       onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
//                     >
//                       <CardContent className="p-6 text-center relative overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <div className="relative z-10">
//                           <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-500/25 group-hover:scale-110 transition-transform duration-300">
//                             <Plus className="h-8 w-8 text-white group-hover:animate-pulse" />
//                           </div>
//                           <h3 className="text-lg font-bold text-slate-100 mb-2">Create Credentials</h3>
//                           <p className="text-slate-400 text-sm leading-relaxed">
//                             Custom verifiable credentials for any purpose
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     {/* Share Credentials */}
//                     <Card
//                       className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
//                       onClick={() => handleNavigateWithWalletCheck("sharing", true)}
//                     >
//                       <CardContent className="p-6 text-center relative overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <div className="relative z-10">
//                           <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-600 to-sky-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-600/25 group-hover:scale-110 transition-transform duration-300">
//                             <Eye className="h-8 w-8 text-white group-hover:animate-pulse" />
//                           </div>
//                           <h3 className="text-lg font-bold text-slate-100 mb-2">Share Credentials</h3>
//                           <p className="text-slate-400 text-sm leading-relaxed">
//                             Selective disclosure with zero-knowledge proofs
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                     {/* Authenticate */}
//                     <Card
//                       className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
//                       onClick={() => handleNavigateWithWalletCheck("authentication")}
//                     >
//                       <CardContent className="p-6 text-center relative overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <div className="relative z-10">
//                           <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-700 to-sky-800 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-700/25 group-hover:scale-110 transition-transform duration-300">
//                             <Fingerprint className="h-8 w-8 text-white group-hover:animate-pulse" />
//                           </div>
//                           <h3 className="text-lg font-bold text-slate-100 mb-2">Authenticate</h3>
//                           <p className="text-slate-400 text-sm leading-relaxed">
//                             Biometric authentication with blockchain verification
//                           </p>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                   {/* Live Statistics Dashboard */}
//                   <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-600/50 shadow-2xl mb-16 sm:mb-20">
//                     <div className="text-center mb-8">
//                       <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
//                         Platform Statistics
//                       </h3>
//                       <p className="text-slate-400">Real-time network metrics</p>
//                     </div>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
//                       <div className="text-center group cursor-pointer">
//                         <div className="text-3xl sm:text-5xl font-black text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
//                           <span className="animate-count-up">
//                             {userCredentials.length > 0 ? `${userCredentials.length + 2400000}` : "2.4M"}
//                           </span>
//                         </div>
//                         <div className="text-slate-400 text-xs sm:text-sm mb-1">Identities Secured</div>
//                         <div className="flex items-center justify-center text-xs text-green-400">
//                           <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
//                           +12% this week
//                         </div>
//                       </div>
//                       <div className="text-center group cursor-pointer">
//                         <div className="text-3xl sm:text-5xl font-black text-teal-400 mb-2 group-hover:scale-110 transition-transform duration-300">
//                           <span className="animate-count-up">99.9%</span>
//                         </div>
//                         <div className="text-slate-400 text-xs sm:text-sm mb-1">Uptime</div>
//                         <div className="flex items-center justify-center text-xs text-green-400">
//                           <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
//                           24/7 Available
//                         </div>
//                       </div>
//                       <div className="text-center group cursor-pointer">
//                         <div className="text-3xl sm:text-5xl font-black text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
//                           <span className="animate-count-up">847K</span>
//                         </div>
//                         <div className="text-slate-400 text-xs sm:text-sm mb-1">Verifications</div>
//                         <div className="flex items-center justify-center text-xs text-cyan-400">
//                           <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-ping"></div>
//                           Real-time
//                         </div>
//                       </div>
//                       <div className="text-center group cursor-pointer">
//                         <div className="text-3xl sm:text-5xl font-black text-slate-300 mb-2 group-hover:scale-110 transition-transform duration-300">
//                           <span className="animate-count-up">₳0.17</span>
//                         </div>
//                         <div className="text-slate-400 text-xs sm:text-sm mb-1">Avg Cost</div>
//                         <div className="flex items-center justify-center text-xs text-teal-400">
//                           <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-ping"></div>
//                           Ultra Low
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Dashboard Content - Show user credentials */}
//                 <div className="grid lg:grid-cols-3 gap-8 mb-20">
//                   {/* User Credentials Overview */}
//                   <div className="lg:col-span-2">
//                     <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-slate-200 flex items-center">
//                           <Database className="h-5 w-5 mr-2 text-cyan-400" />
//                           Your Credentials
//                         </CardTitle>
//                         <CardDescription className="text-slate-400">
//                           Manage your decentralized identity credentials
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {userCredentials.length > 0 ? (
//                           <>
//                             {userCredentials.map((credential) => (
//                               <div
//                                 key={credential.id}
//                                 className="bg-slate-700/30 p-4 rounded-lg border border-slate-600"
//                               >
//                                 <div className="flex items-center justify-between mb-2">
//                                   <h4 className="text-slate-200 font-semibold">{credential.type}</h4>
//                                   <Badge className="bg-green-900/30 text-green-400 border-green-500/30">
//                                     {credential.status}
//                                   </Badge>
//                                 </div>
//                                 <p className="text-slate-400 text-sm mb-3">
//                                   {credential.issuer} • Issued {new Date(credential.issuedDate).toLocaleDateString()}
//                                 </p>
//                                 <div className="flex gap-2">
//                                   <Button
//                                     onClick={() => handleNavigateWithWalletCheck("sharing", true)}
//                                     size="sm"
//                                     className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
//                                   >
//                                     <Eye className="h-4 w-4 mr-1" />
//                                     Share
//                                   </Button>
//                                   <Button
//                                     onClick={() => handleNavigateWithWalletCheck("revocation", true)}
//                                     size="sm"
//                                     variant="outline"
//                                     className="border-slate-600 text-slate-300 hover:bg-slate-700"
//                                   >
//                                     Manage
//                                   </Button>
//                                 </div>
//                               </div>
//                             ))}
//                           </>
//                         ) : (
//                           <div className="text-center py-8">
//                             <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
//                             <p className="text-slate-400 mb-4">No credentials found</p>
//                             <div className="flex flex-col sm:flex-row gap-2 justify-center">
//                               <Button
//                                 onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
//                                 className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
//                               >
//                                 Create Your Identity
//                               </Button>
//                               <Button
//                                 onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
//                                 variant="outline"
//                                 className="border-slate-600 text-slate-300 hover:bg-slate-700"
//                               >
//                                 Create Credential
//                               </Button>
//                             </div>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </div>
//                   {/* Quick Actions */}
//                   <div className="space-y-6">
//                     <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-slate-200">Quick Actions</CardTitle>
//                       </CardHeader>
//                       <CardContent className="space-y-3">
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
//                           className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 justify-start"
//                         >
//                           <Shield className="h-4 w-4 mr-2" />
//                           Create New Identity
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
//                           variant="outline"
//                           className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
//                         >
//                           <Plus className="h-4 w-4 mr-2" />
//                           Create Credential
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("sharing", true)}
//                           variant="outline"
//                           className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
//                           disabled={userCredentials.length === 0}
//                         >
//                           <Eye className="h-4 w-4 mr-2" />
//                           Share Credentials
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("revocation", true)}
//                           variant="outline"
//                           className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
//                           disabled={userCredentials.length === 0}
//                         >
//                           <Lock className="h-4 w-4 mr-2" />
//                           Manage & Revoke
//                         </Button>
//                         <Button
//                           onClick={() => handleNavigateWithWalletCheck("authentication")}
//                           variant="outline"
//                           className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
//                         >
//                           <Fingerprint className="h-4 w-4 mr-2" />
//                           Authenticate
//                         </Button>
//                       </CardContent>
//                     </Card>
//                     {/* Status Card */}
//                     <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-slate-200">Account Status</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="space-y-3">
//                           <div className="flex items-center justify-between">
//                             <span className="text-slate-400">Wallet Status</span>
//                             <Badge
//                               className={
//                                 isConnected
//                                   ? "bg-green-900/30 text-green-400 border-green-500/30"
//                                   : "bg-slate-700 text-slate-400"
//                               }
//                             >
//                               {isConnected ? "Connected" : "Disconnected"}
//                             </Badge>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <span className="text-slate-400">Identity Status</span>
//                             <Badge
//                               className={
//                                 isAuthenticated
//                                   ? "bg-green-900/30 text-green-400 border-green-500/30"
//                                   : "bg-slate-700 text-slate-400"
//                               }
//                             >
//                               {isAuthenticated ? "Verified" : "Unverified"}
//                             </Badge>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <span className="text-slate-400">Credentials</span>
//                             <span className="text-slate-300">{userCredentials.length} Active</span>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <span className="text-slate-400">Last Activity</span>
//                             <span className="text-slate-300">{userCredentials.length > 0 ? "Today" : "Never"}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Custom CSS for additional animations */}
//             <style jsx>{`@keyframes float {
//   0%   { transform: translateY(0); }
//   50%  { transform: translateY(-10px); }
//   100% { transform: translateY(0); }}
// @keyframes scan {
//   0%   { top: 0%;   opacity: 0; }
//   50%  { opacity: 1; }
//   100% { top: 100%; opacity: 0; }}
// @keyframes gradient-x {
//   0%   { background-size: 200% 200%; background-position: left center; }
//   50%  { background-size: 200% 200%; background-position: right center; }
//   100% { background-size: 200% 200%; background-position: left center; }}
// @keyframes fade-in-up {
//   0%   { opacity: 0; transform: translateY(20px); }
//   100% { opacity: 1; transform: translateY(0); }}
// @keyframes count-up {
//   0%   { opacity: 0; transform: translateY(20px); }
//   100% { opacity: 1; transform: translateY(0); }}.animate-float        { animation: float 6s ease-in-out infinite; }.animate-scan         { animation: scan 3s linear infinite; }.animate-gradient-x   { animation: gradient-x 4s ease infinite; }.animate-fade-in-up   { animation: fade-in-up 1s ease-out; }.animate-count-up     { animation: count-up 1s ease-out; }`}</style>
//           </div>
//         )
//     }
//   }
//   return (
//     <>
//       {renderScreen()}
//       <WalletConnectionModal
//         isOpen={showWalletModal}
//         onClose={() => {
//           setShowWalletModal(false)
//           setWalletRequiredMessage("")
//           setIntendedScreen(null) // Clear intended screen if modal is closed without connecting
//         }}
//         onSuccess={handleWalletConnectionSuccess}
//       />
//     </>
//   )
// }

// export default function VerisafeDashboard() {
//   return (
//     <WalletProvider>
//       <VerisafeDashboardContent />
//     </WalletProvider>
//   )
// }


"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Fingerprint,
  Eye,
  Lock,
  ArrowRight,
  Database,
  Layers,
  Menu,
  X,
  Wallet,
  AlertCircle,
  HelpCircle,
  Plus,
} from "lucide-react"
import EnrollmentScreen from "@/components/enrollment-screen"
import AuthenticationScreen from "@/components/authentication-screen"
import CredentialSharingScreen from "@/components/credential-sharing-screen"
import RevocationScreen from "@/components/revocation-screen"
import QAScreen from "@/components/qa-screen"
import CredentialCreationScreen from "@/components/credential-creation-screen"
import WalletConnectionModal from "@/components/wallet-connection-modal"
import WalletDropdown from "@/components/wallet-dropdown"
import { Badge } from "@/components/ui/badge"
import { WalletProvider, useWallet } from "@/hooks/useWallet"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedDate: string
  expiryDate?: string
  status: "active" | "expired" | "revoked"
  fields: { [key: string]: string }
}

function VerisafeDashboardContent() {
  const [currentScreen, setCurrentScreen] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userCredentials, setUserCredentials] = useState<Credential>([])
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [walletRequiredMessage, setWalletRequiredMessage] = useState("")
  const [intendedScreen, setIntendedScreen] = useState<string | null>(null) // New state for intended screen
  const { isConnected } = useWallet()

  // Function to add new credential when enrollment is completed
  const handleEnrollmentComplete = (newCredential: Credential) => {
    setUserCredentials((prev) => [...prev, newCredential])
    setCurrentScreen("dashboard")
  }

  // Function to handle navigation with wallet check
  const handleNavigateWithWalletCheck = (screen: string, requiresWallet = false) => {
    if (requiresWallet && !isConnected) {
      setWalletRequiredMessage("Please connect your Cardano wallet to access this feature.")
      setIntendedScreen(screen) // Store the intended screen
      setShowWalletModal(true)
      return
    }
    setCurrentScreen(screen)
    setMobileMenuOpen(false)
  }

  // Handle enrollment completion with wallet check
  const handleEnrollmentAttempt = () => {
    if (!isConnected) {
      setWalletRequiredMessage(
        "A Cardano wallet connection is required to create your identity. Please connect your wallet to continue.",
      )
      setIntendedScreen("enrollment") // Store the intended screen
      // Do not change screen here, let the modal handle the prompt
      return
    }
    // If wallet is connected, proceed to enrollment screen
    setCurrentScreen("enrollment")
  }

  const handleWalletConnectionSuccess = () => {
    setWalletRequiredMessage("")
    setShowWalletModal(false) // Close modal on success
    if (intendedScreen) {
      setCurrentScreen(intendedScreen) // Navigate to the intended screen
      setIntendedScreen(null) // Clear the intended screen
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "enrollment":
        return (
          <EnrollmentScreen
            onBack={() => setCurrentScreen("dashboard")}
            onComplete={handleEnrollmentComplete}
            onWalletRequired={handleEnrollmentAttempt} // This will trigger the modal if wallet is disconnected
          />
        )
      case "credential-creation":
        return <CredentialCreationScreen onBack={() => setCurrentScreen("dashboard")} credentials={userCredentials} />
      case "authentication":
        return (
          <AuthenticationScreen
            onBack={() => setCurrentScreen("dashboard")}
            onAuthenticated={() => setIsAuthenticated(true)}
          />
        )
      case "sharing":
        return <CredentialSharingScreen onBack={() => setCurrentScreen("dashboard")} credentials={userCredentials} />
      case "revocation":
        return (
          <RevocationScreen
            onBack={() => setCurrentScreen("dashboard")}
            credentials={userCredentials}
            setCredentials={setUserCredentials}
          />
        )
      case "qa":
        return <QAScreen onBack={() => setCurrentScreen("dashboard")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative overflow-hidden">
            {/* Enhanced Web3 Background */}
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
              {/* Floating Network Nodes */}
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
              {/* Responsive Navigation Bar */}
              <nav className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
                <div className="container mx-auto px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative">
                        <div className="p-2 sm:p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg shadow-cyan-500/25">
                          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                      </div>
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                          Verisafe
                        </h1>
                        <p className="text-xs text-slate-400 flex items-center">
                          <Database className="h-3 w-3 mr-1" />
                          Decentralized Identity Platform
                        </p>
                      </div>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                      {isConnected ? (
                        <WalletDropdown />
                      ) : (
                        <Button
                          onClick={() => setShowWalletModal(true)}
                          variant="outline"
                          size="sm"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Connect Wallet
                        </Button>
                      )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-slate-400 hover:text-white"
                      >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                      </Button>
                    </div>
                  </div>
                  {/* Mobile Menu */}
                  {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4">
                      <div className="space-y-3">
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("qa")}
                          variant="ghost"
                          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Q&A
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
                          variant="ghost"
                          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Create Identity
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
                          variant="ghost"
                          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Credential
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("revocation", true)}
                          variant="ghost"
                          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                        >
                          <Database className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                        <div className="border-t border-slate-700/50 pt-3">
                          {isConnected ? (
                            <WalletDropdown />
                          ) : (
                            <Button
                              onClick={() => setShowWalletModal(true)}
                              variant="outline"
                              className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
                            >
                              <Wallet className="h-4 w-4 mr-2" />
                              Connect Wallet
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
              {/* Wallet Required Message */}
              {walletRequiredMessage && (
                <div className="bg-amber-900/20 border-b border-amber-500/30 px-4 py-3">
                  <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                      <span className="text-amber-300 text-sm">{walletRequiredMessage}</span>
                    </div>
                    <Button
                      onClick={() => {
                        setWalletRequiredMessage("")
                        setShowWalletModal(true)
                      }}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                </div>
              )}
              <div className="container mx-auto px-4 sm:px-6 py-8">
                {/* Hero Section */}
                <div className="relative mb-20">
                  <div className="text-center mb-16 relative">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-cyan-500/30 rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-8 backdrop-blur-sm animate-float shadow-2xl shadow-cyan-500/20">
                      <div className="relative">
                        <Layers
                          className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-spin"
                          style={{ animationDuration: "8s" }}
                        />
                        <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
                      </div>
                      <span className="text-cyan-300 font-semibold text-sm sm:text-lg">Next-Gen Identity Protocol</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping delay-200"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-400"></div>
                      </div>
                    </div>
                    <div className="relative mb-8">
                      <h1
                        className="text-6xl sm:text-7xl md:text-8xl font-light mb-4 leading-tight tracking-wide"
                        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                      >
                        <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x font-extralight">
                          VERISAFE
                        </span>
                        <span
                          className="block text-3xl sm:text-4xl md:text-5xl font-thin text-slate-300 mt-2 animate-fade-in-up delay-500"
                          style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                        >
                          Identity. Redefined.
                        </span>
                      </h1>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
                    </div>
                    <div className="max-w-5xl mx-auto mb-12 animate-fade-in-up delay-700">
                      <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 leading-relaxed font-light mb-6">
                        The world's first <span className="text-cyan-400 font-semibold">zero-knowledge</span> identity
                        platform
                      </p>
                      <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
                        Powered by Walrus decentralized storage and Cardano smart contracts. Experience true data
                        sovereignty with military-grade encryption and GDPR compliance.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 animate-fade-in-up delay-1000">
                      <Button
                        onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
                        className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-2xl shadow-cyan-500/30 transition-all duration-500 hover:scale-110 hover:shadow-cyan-500/50 w-full sm:w-auto"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative flex items-center justify-center">
                          <Shield className="h-5 w-5 sm:h-6 sm:w-6 mr-3 group-hover:animate-spin" />
                          Create Your Identity
                          <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </Button>
                      <Button
                        onClick={() => handleNavigateWithWalletCheck("authentication")}
                        variant="outline"
                        className="group px-8 sm:px-12 py-4 sm:py-6 border-2 border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-white font-bold text-lg sm:text-xl rounded-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-slate-800/50 w-full sm:w-auto"
                      >
                        <Fingerprint className="h-5 w-5 sm:h-6 sm:w-6 mr-3 group-hover:text-cyan-400 transition-colors duration-300" />
                        Try Demo
                      </Button>
                    </div>
                  </div>
                  {/* Updated Navigation Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
                    {/* Create New Identity */}
                    <Card
                      className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
                      onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
                    >
                      <CardContent className="p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-400/25 group-hover:scale-110 transition-transform duration-300">
                            <Shield className="h-8 w-8 text-white group-hover:animate-pulse" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2">Create New Identity</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Secure biometric enrollment with Walrus storage
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Create Credentials */}
                    <Card
                      className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
                      onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
                    >
                      <CardContent className="p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-500/25 group-hover:scale-110 transition-transform duration-300">
                            <Plus className="h-8 w-8 text-white group-hover:animate-pulse" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2">Create Credentials</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Custom verifiable credentials for any purpose
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Share Credentials */}
                    <Card
                      className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
                      onClick={() => handleNavigateWithWalletCheck("sharing", true)}
                    >
                      <CardContent className="p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-600 to-sky-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-600/25 group-hover:scale-110 transition-transform duration-300">
                            <Eye className="h-8 w-8 text-white group-hover:animate-pulse" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2">Share Credentials</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Selective disclosure with zero-knowledge proofs
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    {/* Authenticate */}
                    <Card
                      className="group bg-gradient-to-br from-slate-800/60 to-sky-900/40 border-slate-600 hover:border-sky-400/60 transition-all duration-500 cursor-pointer hover:scale-105 backdrop-blur-sm shadow-2xl hover:shadow-sky-400/30"
                      onClick={() => handleNavigateWithWalletCheck("authentication")}
                    >
                      <CardContent className="p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-sky-700 to-sky-800 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-sky-700/25 group-hover:scale-110 transition-transform duration-300">
                            <Fingerprint className="h-8 w-8 text-white group-hover:animate-pulse" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2">Authenticate</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            Biometric authentication with blockchain verification
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Live Statistics Dashboard */}
                  <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-600/50 shadow-2xl mb-16 sm:mb-20">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                        Platform Statistics
                      </h3>
                      <p className="text-slate-400">Real-time network metrics</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl sm:text-5xl font-black text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="animate-count-up">
                            {userCredentials.length > 0 ? `${userCredentials.length + 2400000}` : "2.4M"}
                          </span>
                        </div>
                        <div className="text-slate-400 text-xs sm:text-sm mb-1">Identities Secured</div>
                        <div className="flex items-center justify-center text-xs text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                          +12% this week
                        </div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl sm:text-5xl font-black text-teal-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="animate-count-up">99.9%</span>
                        </div>
                        <div className="text-slate-400 text-xs sm:text-sm mb-1">Uptime</div>
                        <div className="flex items-center justify-center text-xs text-green-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                          24/7 Available
                        </div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl sm:text-5xl font-black text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="animate-count-up">847K</span>
                        </div>
                        <div className="text-slate-400 text-xs sm:text-sm mb-1">Verifications</div>
                        <div className="flex items-center justify-center text-xs text-cyan-400">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-ping"></div>
                          Real-time
                        </div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl sm:text-5xl font-black text-slate-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                          <span className="animate-count-up">₳0.17</span>
                        </div>
                        <div className="text-slate-400 text-xs sm:text-sm mb-1">Avg Cost</div>
                        <div className="flex items-center justify-center text-xs text-teal-400">
                          <div className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-ping"></div>
                          Ultra Low
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Dashboard Content - Show user credentials */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                  {/* User Credentials Overview */}
                  <div className="lg:col-span-2">
                    <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-slate-200 flex items-center">
                          <Database className="h-5 w-5 mr-2 text-cyan-400" />
                          Your Credentials
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          Manage your decentralized identity credentials
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {userCredentials.length > 0 ? (
                          <>
                            {userCredentials.map((credential) => (
                              <div
                                key={credential.id}
                                className="bg-slate-700/30 p-4 rounded-lg border border-slate-600"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-slate-200 font-semibold">{credential.type}</h4>
                                  <Badge className="bg-green-900/30 text-green-400 border-green-500/30">
                                    {credential.status}
                                  </Badge>
                                </div>
                                <p className="text-slate-400 text-sm mb-3">
                                  {credential.issuer} • Issued {new Date(credential.issuedDate).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleNavigateWithWalletCheck("sharing", true)}
                                    size="sm"
                                    className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    Share
                                  </Button>
                                  <Button
                                    onClick={() => handleNavigateWithWalletCheck("revocation", true)}
                                    size="sm"
                                    variant="outline"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                  >
                                    Manage
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <div className="text-center py-8">
                            <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 mb-4">No credentials found</p>
                            <div className="flex flex-col sm:flex-row gap-2 justify-center">
                              <Button
                                onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
                                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                              >
                                Create Your Identity
                              </Button>
                              <Button
                                onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
                                variant="outline"
                                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                              >
                                Create Credential
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-slate-200">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("enrollment", true)}
                          className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 justify-start"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Create New Identity
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("credential-creation", true)}
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Credential
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("sharing", true)}
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
                          disabled={userCredentials.length === 0}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Share Credentials
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("revocation", true)}
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
                          disabled={userCredentials.length === 0}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Manage & Revoke
                        </Button>
                        <Button
                          onClick={() => handleNavigateWithWalletCheck("authentication")}
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 justify-start"
                        >
                          <Fingerprint className="h-4 w-4 mr-2" />
                          Authenticate
                        </Button>
                      </CardContent>
                    </Card>
                    {/* Status Card */}
                    <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm shadow-2xl">
                      <CardHeader>
                        <CardTitle className="text-slate-200">Account Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Wallet Status</span>
                            <Badge
                              className={
                                isConnected
                                  ? "bg-green-900/30 text-green-400 border-green-500/30"
                                  : "bg-slate-700 text-slate-400"
                              }
                            >
                              {isConnected ? "Connected" : "Disconnected"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Identity Status</span>
                            <Badge
                              className={
                                isAuthenticated
                                  ? "bg-green-900/30 text-green-400 border-green-500/30"
                                  : "bg-slate-700 text-slate-400"
                              }
                            >
                              {isAuthenticated ? "Verified" : "Unverified"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Credentials</span>
                            <span className="text-slate-300">{userCredentials.length} Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Last Activity</span>
                            <span className="text-slate-300">{userCredentials.length > 0 ? "Today" : "Never"}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            {/* Custom CSS for additional animations */}
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
              @keyframes gradient-x {
                0% {
                  background-size: 200% 200%;
                  background-position: left center;
                }
                50% {
                  background-size: 200% 200%;
                  background-position: right center;
                }
                100% {
                  background-size: 200% 200%;
                  background-position: left center;
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
              @keyframes count-up {
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
              .animate-gradient-x {
                animation: gradient-x 4s ease infinite;
              }
              .animate-fade-in-up {
                animation: fade-in-up 1s ease-out;
              }
              .animate-count-up {
                animation: count-up 1s ease-out;
              }
            `}</style>
          </div>
        )
    }
  }
  return (
    <>
      {renderScreen()}
      <WalletConnectionModal
        isOpen={showWalletModal}
        onClose={() => {
          setShowWalletModal(false)
          setWalletRequiredMessage("")
          setIntendedScreen(null) // Clear intended screen if modal is closed without connecting
        }}
        onSuccess={handleWalletConnectionSuccess}
      />
    </>
  )
}

export default function VerisafeDashboard() {
  return (
    <WalletProvider>
      <VerisafeDashboardContent />
    </WalletProvider>
  )
}
