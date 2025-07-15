// "use client"
// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   ArrowLeft,
//   Settings,
//   Trash2,
//   Edit,
//   CheckCircle,
//   AlertTriangle,
//   Loader2,
//   Shield,
//   Clock,
//   Database,
// } from "lucide-react"
// interface Credential {
//   id: string
//   type: string
//   issuer: string
//   issuedDate: string
//   expiryDate?: string
//   status: "active" | "expired" | "revoked"
//   fields: { [key: string]: string }
// }
// interface RevocationScreenProps {
//   onBack: () => void
//   credentials: Credential[]
//   setCredentials: (credentials: Credential[]) => void
// }
// export default function RevocationScreen({ onBack, credentials, setCredentials }: RevocationScreenProps) {
//   const [activeTab, setActiveTab] = useState("manage")
//   const [selectedCredential, setSelectedCredential] = useState<string | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [actionResult, setActionResult] = useState<"success" | "error" | null>(null)
//   const [editingCredential, setEditingCredential] = useState<string | null>(null)
//   const [editFormData, setEditFormData] = useState<{ [key: string]: string }>({})
//   const handleRevoke = (credId: string) => {
//     setSelectedCredential(credId)
//     setIsProcessing(true)
//     setTimeout(() => {
//       setCredentials(credentials.map((cred) => (cred.id === credId ? { ...cred, status: "revoked" as const } : cred)))
//       setActionResult("success")
//       setIsProcessing(false)
//       setSelectedCredential(null)
//     }, 2000)
//   }
//   const handleEdit = (credId: string) => {
//     const credential = credentials.find((c) => c.id === credId)
//     if (credential) {
//       setEditingCredential(credId)
//       setEditFormData(credential.fields)
//     }
//   }
//   const handleSaveEdit = () => {
//     setIsProcessing(true)
//     setTimeout(() => {
//       setCredentials(
//         credentials.map((cred) => (cred.id === editingCredential ? { ...cred, fields: editFormData } : cred)),
//       )
//       setActionResult("success")
//       setIsProcessing(false)
//       setEditingCredential(null)
//       setEditFormData({})
//     }, 2000)
//   }
//   const resetAction = () => {
//     setActionResult(null)
//     setSelectedCredential(null)
//     setEditingCredential(null)
//     setEditFormData({})
//   }
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
//       </div>
//       <div className="relative z-10 container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex items-center mb-8">
//           <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mr-4">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
//             Manage Credentials
//           </h1>
//         </div>
//         {/* Privacy Badge */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-sky-900/30 text-sky-400 border border-sky-500/30 px-4 py-2 rounded-full flex items-center">
//             <Shield className="h-4 w-4 mr-2" />
//             Full control over your credential lifecycle
//           </div>
//         </div>
//         <div className="max-w-4xl mx-auto">
//           {credentials.length === 0 ? (
//             <Card className="bg-slate-800/50 border-slate-700">
//               <CardContent className="text-center py-12">
//                 <Database className="h-16 w-16 text-slate-600 mx-auto mb-4" />
//                 <h3 className="text-slate-200 text-xl font-semibold mb-2">No Credentials Found</h3>
//                 <p className="text-slate-400 mb-6">You need to create credentials before you can manage them.</p>
//                 <Button
//                   onClick={onBack}
//                   className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
//                 >
//                   Go Back to Dashboard
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <>
//               {/* Biodata Overview Section */}
//               <Card className="bg-slate-800/50 border-slate-700 mb-6">
//                 <CardHeader>
//                   <CardTitle className="text-slate-200 flex items-center">
//                     <Database className="h-5 w-5 mr-2 text-sky-400" />
//                     Your Biodata Overview
//                   </CardTitle>
//                   <CardDescription className="text-slate-400">
//                     View and manage your stored personal information
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="text-slate-300 font-medium mb-2">Personal Information</h4>
//                         <div className="bg-slate-700/30 p-4 rounded-lg space-y-2">
//                           {credentials.length > 0 && credentials[0].fields && (
//                             <>
//                               <div className="flex justify-between">
//                                 <span className="text-slate-400">Full Name:</span>
//                                 <span className="text-slate-200">{credentials[0].fields.fullName || "Not set"}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-slate-400">Date of Birth:</span>
//                                 <span className="text-slate-200">{credentials[0].fields.dateOfBirth || "Not set"}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-slate-400">Email:</span>
//                                 <span className="text-slate-200">{credentials[0].fields.email || "Not set"}</span>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div>
//                         <h4 className="text-slate-300 font-medium mb-2">Security Status</h4>
//                         <div className="bg-slate-700/30 p-4 rounded-lg space-y-2">
//                           <div className="flex justify-between">
//                             <span className="text-slate-400">Biometric Status:</span>
//                             <Badge className="bg-green-900/30 text-green-400 border-green-500/30">Secured</Badge>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-slate-400">Walrus Storage:</span>
//                             <Badge className="bg-sky-900/30 text-sky-400 border-sky-500/30">Active</Badge>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-slate-400">Last Updated:</span>
//                             <span className="text-slate-200">
//                               {credentials.length > 0
//                                 ? new Date(credentials[0].issuedDate).toLocaleDateString()
//                                 : "Never"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               {actionResult === "success" ? (
//                 <Card className="bg-slate-800/50 border-slate-700">
//                   <CardHeader className="text-center">
//                     <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
//                       <CheckCircle className="h-8 w-8 text-white" />
//                     </div>
//                     <CardTitle className="text-slate-200">Action Completed Successfully!</CardTitle>
//                     <CardDescription className="text-slate-400">
//                       Your credential has been updated on the blockchain
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button onClick={resetAction} className="w-full">
//                       Continue Managing Credentials
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ) : actionResult === "error" ? (
//                 <Card className="bg-slate-800/50 border-slate-700">
//                   <CardHeader className="text-center">
//                     <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
//                       <AlertTriangle className="h-8 w-8 text-white" />
//                     </div>
//                     <CardTitle className="text-slate-200">Action Failed</CardTitle>
//                     <CardDescription className="text-slate-400">
//                       There was an error processing your request. Please try again.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button onClick={resetAction} className="w-full">
//                       Try Again
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ) : (
//                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                   <TabsList className="grid w-full grid-cols-2 bg-slate-800">
//                     <TabsTrigger value="manage" className="data-[state=active]:bg-sky-600">
//                       <Settings className="h-4 w-4 mr-2" />
//                       Manage Active
//                     </TabsTrigger>
//                     <TabsTrigger value="history" className="data-[state=active]:bg-sky-600">
//                       <Clock className="h-4 w-4 mr-2" />
//                       History
//                     </TabsTrigger>
//                   </TabsList>
//                   <TabsContent value="manage" className="space-y-6 mt-6">
//                     <Card className="bg-slate-800/50 border-slate-700">
//                       <CardHeader>
//                         <CardTitle className="text-slate-200 flex items-center">
//                           <Settings className="h-5 w-5 mr-2 text-sky-400" />
//                           Active Credentials
//                         </CardTitle>
//                         <CardDescription className="text-slate-400">
//                           Manage, update, or revoke your active credentials
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {credentials
//                           .filter((cred) => cred.status === "active")
//                           .map((cred) => (
//                             <Card key={cred.id} className="bg-slate-700/30 border-slate-600">
//                               <CardHeader className="pb-3">
//                                 <div className="flex items-center justify-between">
//                                   <div>
//                                     <h3 className="text-slate-200 font-semibold">{cred.type}</h3>
//                                     <p className="text-slate-400 text-sm">Issued by {cred.issuer}</p>
//                                     <p className="text-slate-500 text-xs">
//                                       Issued: {new Date(cred.issuedDate).toLocaleDateString()}
//                                       {cred.expiryDate &&
//                                         ` • Expires: ${new Date(cred.expiryDate).toLocaleDateString()}`}
//                                     </p>
//                                   </div>
//                                   <Badge className="bg-green-900/30 text-green-400 border-green-500/30">
//                                     {cred.status}
//                                   </Badge>
//                                 </div>
//                               </CardHeader>
//                               <CardContent className="pt-0">
//                                 {editingCredential === cred.id ? (
//                                   <div className="space-y-4">
//                                     <div className="bg-slate-800/50 p-4 rounded-lg">
//                                       <h4 className="text-slate-300 text-sm font-medium mb-3">
//                                         Edit Credential Fields:
//                                       </h4>
//                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         {Object.entries(cred.fields).map(([field, value]) => (
//                                           <div key={field}>
//                                             <Label className="text-slate-300 text-sm capitalize">
//                                               {field.replace(/([A-Z])/g, " $1").trim()}
//                                             </Label>
//                                             <Input
//                                               value={editFormData[field] || value}
//                                               onChange={(e) =>
//                                                 setEditFormData((prev) => ({
//                                                   ...prev,
//                                                   [field]: e.target.value,
//                                                 }))
//                                               }
//                                               className="bg-slate-700 border-slate-600 text-slate-200"
//                                             />
//                                           </div>
//                                         ))}
//                                       </div>
//                                     </div>
//                                     <div className="flex gap-2">
//                                       <Button
//                                         onClick={handleSaveEdit}
//                                         disabled={isProcessing}
//                                         className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
//                                       >
//                                         {isProcessing ? (
//                                           <>
//                                             <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                                             Updating...
//                                           </>
//                                         ) : (
//                                           <>
//                                             <CheckCircle className="h-4 w-4 mr-2" />
//                                             Save Changes
//                                           </>
//                                         )}
//                                       </Button>
//                                       <Button
//                                         onClick={() => setEditingCredential(null)}
//                                         variant="outline"
//                                         className="flex-1"
//                                       >
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <div className="space-y-4">
//                                     <div className="bg-slate-800/50 p-3 rounded-lg">
//                                       <h4 className="text-slate-300 text-sm font-medium mb-2">Credential Details:</h4>
//                                       <div className="grid grid-cols-2 gap-2 text-sm">
//                                         {Object.entries(cred.fields).map(([field, value]) => (
//                                           <div key={field}>
//                                             <span className="text-slate-400 capitalize">
//                                               {field.replace(/([A-Z])/g, " $1").trim()}:
//                                             </span>
//                                             <span className="text-slate-300 ml-2">{value}</span>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     </div>
//                                     <div className="flex gap-2">
//                                       <Button
//                                         onClick={() => handleEdit(cred.id)}
//                                         variant="outline"
//                                         className="flex-1 border-sky-500/30 text-sky-400 hover:bg-sky-500/10"
//                                       >
//                                         <Edit className="h-4 w-4 mr-2" />
//                                         Edit
//                                       </Button>
//                                       <Button
//                                         onClick={() => handleRevoke(cred.id)}
//                                         disabled={isProcessing && selectedCredential === cred.id}
//                                         variant="outline"
//                                         className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
//                                       >
//                                         {isProcessing && selectedCredential === cred.id ? (
//                                           <>
//                                             <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                                             Revoking...
//                                           </>
//                                         ) : (
//                                           <>
//                                             <Trash2 className="h-4 w-4 mr-2" />
//                                             Revoke
//                                           </>
//                                         )}
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 )}
//                               </CardContent>
//                             </Card>
//                           ))}
//                       </CardContent>
//                     </Card>
//                   </TabsContent>
//                   <TabsContent value="history" className="space-y-6 mt-6">
//                     <Card className="bg-slate-800/50 border-slate-700">
//                       <CardHeader>
//                         <CardTitle className="text-slate-200 flex items-center">
//                           <Clock className="h-5 w-5 mr-2 text-slate-400" />
//                           Credential History
//                         </CardTitle>
//                         <CardDescription className="text-slate-400">
//                           View all your credentials including revoked and expired ones
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         {credentials.filter((cred) => cred.status !== "active").length === 0 ? (
//                           <div className="text-center py-8">
//                             <Clock className="h-12 w-12 text-slate-600 mx-auto mb-4" />
//                             <p className="text-slate-400">No credential history yet</p>
//                             <p className="text-slate-500 text-sm">Revoked or expired credentials will appear here</p>
//                           </div>
//                         ) : (
//                           credentials
//                             .filter((cred) => cred.status !== "active")
//                             .map((cred) => (
//                               <Card key={cred.id} className="bg-slate-700/30 border-slate-600 opacity-75">
//                                 <CardHeader>
//                                   <div className="flex items-center justify-between">
//                                     <div>
//                                       <h3 className="text-slate-200 font-semibold">{cred.type}</h3>
//                                       <p className="text-slate-400 text-sm">Issued by {cred.issuer}</p>
//                                       <p className="text-slate-500 text-xs">
//                                         Issued: {new Date(cred.issuedDate).toLocaleDateString()}
//                                       </p>
//                                     </div>
//                                     <Badge
//                                       variant="destructive"
//                                       className={
//                                         cred.status === "revoked"
//                                           ? "bg-red-900/30 text-red-400 border-red-500/30"
//                                           : "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
//                                       }
//                                     >
//                                       {cred.status}
//                                     </Badge>
//                                   </div>
//                                 </CardHeader>
//                               </Card>
//                             ))
//                         )}
//                       </CardContent>
//                     </Card>
//                   </TabsContent>
//                 </Tabs>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Lock, Trash2, CheckCircle } from "lucide-react"
import { useState } from "react"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedDate: string
  expiryDate?: string
  status: "active" | "expired" | "revoked"
  fields: { [key: string]: string }
}

interface RevocationScreenProps {
  onBack: () => void
  credentials: Credential[]
  setCredentials: React.Dispatch<React.SetStateAction<Credential[]>>
}

export default function RevocationScreen({ onBack, credentials, setCredentials }: RevocationScreenProps) {
  const [selectedCredentialId, setSelectedCredentialId] = useState<string | null>(null)
  const [isRevoking, setIsRevoking] = useState(false)

  const handleRevoke = () => {
    if (!selectedCredentialId) {
      alert("Please select a credential to revoke.")
      return
    }
    setIsRevoking(true)
    // Simulate revocation
    setTimeout(() => {
      setCredentials((prev) =>
        prev.map((cred) => (cred.id === selectedCredentialId ? { ...cred, status: "revoked" } : cred)),
      )
      setIsRevoking(false)
      alert(`Credential ${selectedCredentialId} revoked successfully!`)
      onBack()
    }, 1500)
  }

  const activeCredentials = credentials.filter((cred) => cred.status === "active")
  const selectedCredential = credentials.find((cred) => cred.id === selectedCredentialId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/60 border-slate-700 text-slate-200 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <Lock className="h-6 w-6 mr-2" />
            Manage & Revoke Credentials
          </CardTitle>
          <CardDescription className="text-slate-400">
            Select an active credential to revoke or manage its status.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeCredentials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">You have no active credentials to manage or revoke.</p>
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Label htmlFor="credential-select" className="text-slate-300">
                  Select Credential
                </Label>
                <Select onValueChange={setSelectedCredentialId} value={selectedCredentialId || ""}>
                  <SelectTrigger
                    id="credential-select"
                    className="bg-slate-700/50 border-slate-600 text-slate-200 focus:ring-cyan-500"
                  >
                    <SelectValue placeholder="Choose a credential" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    {activeCredentials.map((cred) => (
                      <SelectItem key={cred.id} value={cred.id}>
                        {cred.type} from {cred.issuer} (ID: {cred.id.substring(0, 8)}...)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCredential && (
                <Card className="bg-slate-700/30 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-slate-200">{selectedCredential.type}</CardTitle>
                    <CardDescription className="text-slate-400">
                      Issuer: {selectedCredential.issuer} | Status: {selectedCredential.status}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h5 className="text-slate-300 font-semibold mb-2">Details:</h5>
                    <ul className="list-disc list-inside text-slate-400 text-sm">
                      <li>
                        <strong>Issued:</strong> {new Date(selectedCredential.issuedDate).toLocaleDateString()}
                      </li>
                      {selectedCredential.expiryDate && (
                        <li>
                          <strong>Expires:</strong> {new Date(selectedCredential.expiryDate).toLocaleDateString()}
                        </li>
                      )}
                      {Object.entries(selectedCredential.fields).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
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
                  onClick={handleRevoke}
                  disabled={!selectedCredentialId || isRevoking}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isRevoking ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2 animate-pulse" /> Revoking...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5 mr-2" /> Revoke Credential
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
