// "use client"

// import { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Plus, ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react"
// import { useWallet } from "@/hooks/useWallet"

// interface Credential {
//   id: string
//   type: string
//   issuer: string
//   issuedDate: string
//   expiryDate?: string
//   status: "active" | "expired" | "revoked"
//   fields: { [key: string]: string }
// }

// interface CredentialCreationScreenProps {
//   onBack: () => void
//   onCredentialCreated: (credential: Credential) => void
// }

// export default function CredentialCreationScreen({ onBack, onCredentialCreated }: CredentialCreationScreenProps) {
//   const [credentialType, setCredentialType] = useState("")
//   const [issuer, setIssuer] = useState("")
//   const [field1Name, setField1Name] = useState("")
//   const [field1Value, setField1Value] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [creationStatus, setCreationStatus] = useState<"idle" | "success" | "failed">("idle")
//   const { isConnected } = useWallet() // Check wallet connection

//   const handleCreateCredential = async () => {
//     if (!isConnected) {
//       setCreationStatus("failed") // Indicate wallet not connected
//       return
//     }

//     if (!credentialType || !issuer || !field1Name || !field1Value) {
//       setCreationStatus("failed") // Indicate missing fields
//       return
//     }

//     setIsLoading(true)
//     setCreationStatus("idle")

//     // Simulate credential creation process
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     const newCredential: Credential = {
//       id: `cred-${Date.now()}`,
//       type: credentialType,
//       issuer: issuer,
//       issuedDate: new Date().toISOString(),
//       status: "active",
//       fields: {
//         [field1Name.toLowerCase().replace(/\s/g, "")]: field1Value,
//       },
//     }

//     setIsLoading(false)
//     setCreationStatus("success")
//     onCredentialCreated(newCredential)

//     // Optionally clear form after success
//     setCredentialType("")
//     setIssuer("")
//     setField1Name("")
//     setField1Value("")
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
//       <Card className="w-full max-w-lg bg-slate-800/90 border-slate-700 text-white shadow-2xl">
//         <CardHeader>
//           <CardTitle className="text-cyan-400 flex items-center">
//             <Plus className="h-6 w-6 mr-2" />
//             Create New Credential
//           </CardTitle>
//           <CardDescription className="text-slate-400">
//             Define and issue a new verifiable credential for your identity.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-4">
//             <div className="grid gap-2">
//               <Label htmlFor="credential-type" className="text-slate-300">
//                 Credential Type
//               </Label>
//               <Input
//                 id="credential-type"
//                 value={credentialType}
//                 onChange={(e) => setCredentialType(e.target.value)}
//                 placeholder="e.g., Proof of Age, Membership"
//                 className="bg-slate-700/50 border-slate-600 text-white focus-visible:ring-cyan-500"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="issuer" className="text-slate-300">
//                 Issuer
//               </Label>
//               <Input
//                 id="issuer"
//                 value={issuer}
//                 onChange={(e) => setIssuer(e.target.value)}
//                 placeholder="e.g., DMV, University"
//                 className="bg-slate-700/50 border-slate-600 text-white focus-visible:ring-cyan-500"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="field1-name" className="text-slate-300">
//                   Field 1 Name
//                 </Label>
//                 <Input
//                   id="field1-name"
//                   value={field1Name}
//                   onChange={(e) => setField1Name(e.target.value)}
//                   placeholder="e.g., Date of Birth"
//                   className="bg-slate-700/50 border-slate-600 text-white focus-visible:ring-cyan-500"
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="field1-value" className="text-slate-300">
//                   Field 1 Value
//                 </Label>
//                 <Input
//                   id="field1-value"
//                   value={field1Value}
//                   onChange={(e) => setField1Value(e.target.value)}
//                   placeholder="e.g., 1990-01-01"
//                   className="bg-slate-700/50 border-slate-600 text-white focus-visible:ring-cyan-500"
//                 />
//               </div>
//             </div>
//             {/* Add more fields as needed */}
//             <Button
//               onClick={handleCreateCredential}
//               disabled={isLoading || !credentialType || !issuer || !field1Name || !field1Value || !isConnected}
//               className="w-full bg-cyan-600 hover:bg-cyan-700"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 "Create Credential"
//               )}
//             </Button>
//           </div>

//           {creationStatus === "success" && (
//             <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center text-green-300">
//               <CheckCircle className="h-4 w-4 mr-2" />
//               Credential created successfully!
//             </div>
//           )}
//           {creationStatus === "failed" && !isConnected && (
//             <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center text-red-300">
//               <XCircle className="h-4 w-4 mr-2" />
//               Wallet not connected. Please connect your wallet to create a credential.
//             </div>
//           )}
//           {creationStatus === "failed" && isConnected && (
//             <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center text-red-300">
//               <XCircle className="h-4 w-4 mr-2" />
//               Failed to create credential. Please fill all required fields.
//             </div>
//           )}
//         </CardContent>
//         <div className="p-4 border-t border-slate-700 flex justify-between">
//           <Button onClick={onBack} variant="ghost" className="text-slate-400 hover:text-white">
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Dashboard
//           </Button>
//         </div>
//       </Card>
//     </div>
//   )
// }


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, PlusCircle, CheckCircle } from "lucide-react"
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

interface CredentialCreationScreenProps {
  onBack: () => void
  credentials: Credential[] // This prop is not used in this mock, but kept for consistency
}

export default function CredentialCreationScreen({ onBack }: CredentialCreationScreenProps) {
  const [credentialType, setCredentialType] = useState("")
  const [issuer, setIssuer] = useState("")
  const [fieldKey, setFieldKey] = useState("")
  const [fieldValue, setFieldValue] = useState("")
  const [customFields, setCustomFields] = useState<{ [key: string]: string }>({})
  const [isCreating, setIsCreating] = useState(false)

  const handleAddField = () => {
    if (fieldKey && fieldValue) {
      setCustomFields((prev) => ({ ...prev, [fieldKey]: fieldValue }))
      setFieldKey("")
      setFieldValue("")
    } else {
      alert("Please enter both a field key and value.")
    }
  }

  const handleCreateCredential = () => {
    if (!credentialType || !issuer) {
      alert("Please fill in credential type and issuer.")
      return
    }
    setIsCreating(true)
    // Simulate credential creation
    const newCredential: Credential = {
      id: `cred-${Date.now()}`,
      type: credentialType,
      issuer: issuer,
      issuedDate: new Date().toISOString(),
      status: "active",
      fields: customFields,
    }
    console.log("New Credential Created:", newCredential)
    setTimeout(() => {
      setIsCreating(false)
      alert("Credential created successfully! (Check console for details)")
      onBack() // Navigate back to dashboard or a success screen
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/60 border-slate-700 text-slate-200 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <PlusCircle className="h-6 w-6 mr-2" />
            Create New Credential
          </CardTitle>
          <CardDescription className="text-slate-400">
            Define the type, issuer, and custom fields for your new verifiable credential.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="credential-type" className="text-slate-300">
                Credential Type
              </Label>
              <Input
                id="credential-type"
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value)}
                placeholder="e.g., 'ProofOfAge', 'EmploymentVerification'"
                className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
            </div>
            <div>
              <Label htmlFor="issuer" className="text-slate-300">
                Issuer
              </Label>
              <Input
                id="issuer"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g., 'University of Example', 'Government Agency'"
                className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-slate-200">Custom Fields</h3>
            {Object.keys(customFields).length > 0 && (
              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                <h4 className="text-slate-300 font-medium mb-2">Defined Fields:</h4>
                <ul className="list-disc list-inside text-slate-400 text-sm">
                  {Object.entries(customFields).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={fieldKey}
                onChange={(e) => setFieldKey(e.target.value)}
                placeholder="Field Name (e.g., 'DateOfBirth')"
                className="flex-1 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
              <Input
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                placeholder="Field Value (e.g., '1990-01-01')"
                className="flex-1 bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-cyan-500"
              />
              <Button
                onClick={handleAddField}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                Add
              </Button>
            </div>
          </div>

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
              onClick={handleCreateCredential}
              disabled={isCreating || !credentialType || !issuer}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
            >
              {isCreating ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2 animate-pulse" /> Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="h-5 w-5 mr-2" /> Create Credential
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
