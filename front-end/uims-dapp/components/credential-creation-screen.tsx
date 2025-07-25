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


// "use client"

// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, PlusCircle, CheckCircle } from "lucide-react"
// import { useState } from "react"
// import { Transaction, resolveDataHash, resolvePlutusScriptAddress, resolveDatum } from "@meshsdk/core"
// import { useWallet } from "@meshsdk/react"
// import sha256 from "crypto-js/sha256"
// import { readContractAddress } from "@/lib/contract-utils" // helper you'll create

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
//   credentials: Credential[]
// }

// export default function CredentialCreationScreen({ onBack }: CredentialCreationScreenProps) {
//   const [credentialType, setCredentialType] = useState("")
//   const [issuer, setIssuer] = useState("")
//   const [fieldKey, setFieldKey] = useState("")
//   const [fieldValue, setFieldValue] = useState("")
//   const [customFields, setCustomFields] = useState<{ [key: string]: string }>({})
//   const [isCreating, setIsCreating] = useState(false)
//   const { wallet, connected } = useWallet()

//   const handleAddField = () => {
//     if (fieldKey && fieldValue) {
//       setCustomFields((prev) => ({ ...prev, [fieldKey]: fieldValue }))
//       setFieldKey("")
//       setFieldValue("")
//     } else {
//       alert("Please enter both a field key and value.")
//     }
//   }

//   const handleCreateCredential = async () => {
//     if (!credentialType || !issuer || !connected || !wallet) {
//       alert("Missing required data or wallet connection.")
//       return
//     }

//     try {
//       setIsCreating(true)

//       const newCredential: Credential = {
//         id: `cred-${Date.now()}`,
//         type: credentialType,
//         issuer,
//         issuedDate: new Date().toISOString(),
//         status: "active",
//         fields: customFields,
//       }

//       const serialized = JSON.stringify(newCredential)
//       const hash = sha256(serialized).toString()

//       const { contractAddress } = await readContractAddress()
//       if (!contractAddress) throw new Error("Contract address not found.")

//       const address = await wallet.getChangeAddress()
//       const tx = new Transaction({ initiator: wallet })

//       // Optional: attach datum to identify credential data
//       const datum = {
//         owner: await wallet.getRewardAddresses().then(res => res[0]), // assume reward address is the VKH
//         data_hash: hash,
//         shared_with: null
//       }

//       tx.sendLovelace(
//         contractAddress,
//         "2000000", // 2 ADA
//         { datum: resolveDatum(datum) }
//       )

//       const unsignedTx = await tx.build()
//       const signedTx = await wallet.signTx(unsignedTx)
//       const txHash = await wallet.submitTx(signedTx)

//       alert(`✅ Credential created and stored on-chain!\nTransaction Hash:\n${txHash}`)
//       console.log("Stored Credential:", newCredential)
//       onBack()
//     } catch (err: any) {
//       console.error("Credential creation failed:", err)
//       alert("❌ Failed to create credential. See console.")
//     } finally {
//       setIsCreating(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
//       <Card className="w-full max-w-2xl bg-slate-800/60 border-slate-700 text-slate-200 backdrop-blur-sm shadow-2xl">
//         <CardHeader>
//           <CardTitle className="flex items-center text-cyan-400">
//             <PlusCircle className="h-6 w-6 mr-2" />
//             Create New Credential
//           </CardTitle>
//           <CardDescription className="text-slate-400">
//             Define the type, issuer, and custom fields for your new verifiable credential.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="credential-type" className="text-slate-300">Credential Type</Label>
//               <Input id="credential-type" value={credentialType} onChange={(e) => setCredentialType(e.target.value)} />
//             </div>
//             <div>
//               <Label htmlFor="issuer" className="text-slate-300">Issuer</Label>
//               <Input id="issuer" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
//             </div>
//           </div>
//           <div className="space-y-4 border-t border-slate-700 pt-6">
//             <h3 className="text-lg font-semibold text-slate-200">Custom Fields</h3>
//             <div className="flex gap-2">
//               <Input value={fieldKey} onChange={(e) => setFieldKey(e.target.value)} placeholder="Field Name" />
//               <Input value={fieldValue} onChange={(e) => setFieldValue(e.target.value)} placeholder="Field Value" />
//               <Button onClick={handleAddField} variant="outline">Add</Button>
//             </div>
//             {Object.entries(customFields).length > 0 && (
//               <ul className="text-slate-300 text-sm mt-2 pl-4 list-disc">
//                 {Object.entries(customFields).map(([k, v]) => (
//                   <li key={k}><strong>{k}</strong>: {v}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div className="flex justify-between gap-4 mt-4">
//             <Button onClick={onBack} variant="outline">
//               <ArrowLeft className="h-4 w-4 mr-2" /> Back
//             </Button>
//             <Button
//               onClick={handleCreateCredential}
//               disabled={isCreating || !credentialType || !issuer}
//               className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
//             >
//               {isCreating ? (
//                 <>
//                   <CheckCircle className="h-5 w-5 mr-2 animate-pulse" /> Creating...
//                 </>
//               ) : (
//                 <>
//                   <PlusCircle className="h-5 w-5 mr-2" /> Create Credential
//                 </>
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
