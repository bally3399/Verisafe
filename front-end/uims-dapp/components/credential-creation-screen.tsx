"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Copy, ExternalLink, Wallet } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedDate?: string
  expiryDate?: string
  status: "active" | "expired" | "revoked"
  fields: { [key: string]: string }
}

interface CredentialCreationScreenProps {
  onBack: () => void
  credentials: Credential[]
}

export default function CredentialCreationScreen({ onBack, credentials }: CredentialCreationScreenProps) {
  const { isConnected } = useWallet()
  const [credentialType, setCredentialType] = useState("")
  const [issuer, setIssuer] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [customFields, setCustomFields] = useState<{ name: string; value: string }[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [creationResult, setCreationResult] = useState<"success" | "error" | null>(null)
  const [newCredentialId, setNewCredentialId] = useState<string | null>(null)

  const handleAddField = () => {
    setCustomFields([...customFields, { name: "", value: "" }])
  }

  const handleFieldChange = (index: number, key: "name" | "value", value: string) => {
    const updatedFields = customFields.map((field, i) => (i === index ? { ...field, [key]: value } : field))
    setCustomFields(updatedFields)
  }

  const handleRemoveField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index))
  }

  const handleCreateCredential = () => {
    if (!isConnected) {
      alert("Wallet is not connected. Please connect your wallet to create a credential.")
      return
    }

    setIsCreating(true)
    setTimeout(() => {
      const success = Math.random() > 0.1 // Simulate success/failure
      setCreationResult(success ? "success" : "error")
      if (success) {
        const fields: { [key: string]: string } = {}
        customFields.forEach((field) => {
          if (field.name.trim() && field.value.trim()) {
            fields[field.name.trim()] = field.value.trim()
          }
        })

        const newCred: Credential = {
          id: `cred-${Date.now()}`,
          type: credentialType || "Custom Credential",
          issuer: issuer || "Self-Issued",
          issuedDate: new Date().toISOString().split("T")[0],
          expiryDate: expiryDate || undefined,
          status: "active",
          fields: fields,
        }
        setNewCredentialId(newCred.id)
        alert(`Credential created successfully with ID: ${newCred.id}`)
      }
      setIsCreating(false)
    }, 3000)
  }

  const resetForm = () => {
    setCredentialType("")
    setIssuer("")
    setExpiryDate("")
    setCustomFields([])
    setCreationResult(null)
    setNewCredentialId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306b6d4' fillOpacity='0.15'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
            Create New Credential
          </h1>
        </div>

        {/* Wallet Status */}
        <div className="flex justify-center mb-6">
          <Badge
            className={
              isConnected
                ? "bg-green-900/30 text-green-400 border-green-500/30"
                : "bg-amber-900/30 text-amber-400 border-amber-500/30"
            }
          >
            <Wallet className="h-4 w-4 mr-2" />
            {isConnected ? "Wallet Connected" : "Wallet Disconnected - Required for Creation"}
          </Badge>
        </div>

        <div className="max-w-3xl mx-auto">
          {creationResult === "success" ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-200">Credential Created Successfully!</CardTitle>
                <CardDescription className="text-slate-400">
                  Your new credential has been securely issued and added to your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="text-slate-200 font-semibold mb-2 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Credential ID
                  </h3>
                  <div className="flex items-center space-x-2">
                    <code className="text-green-400 text-sm break-all flex-1 mr-2">{newCredentialId}</code>
                    <Button
                      onClick={() => navigator.clipboard.writeText(newCredentialId || "")}
                      size="sm"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button onClick={resetForm} className="w-full">
                  Create Another Credential
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>
          ) : creationResult === "error" ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-slate-200">Credential Creation Failed</CardTitle>
                <CardDescription className="text-slate-400">
                  There was an error creating your credential. Please ensure your wallet is connected and try again.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleCreateCredential} disabled={isCreating || !isConnected} className="w-full">
                  {isCreating ? <Shield className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isCreating ? "Retrying..." : "Try Again"}
                </Button>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Reset Form
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-slate-100">Credential Details</CardTitle>
                <CardDescription className="text-slate-400">
                  Define the type and content of your new verifiable credential.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="credentialType">Credential Type *</Label>
                  <Input
                    id="credentialType"
                    placeholder="e.g., University Degree, Professional License"
                    value={credentialType}
                    onChange={(e) => setCredentialType(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="issuer">Issuer (Optional)</Label>
                  <Input
                    id="issuer"
                    placeholder="e.g., University of Blockchain, Self-Issued"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-slate-200"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-slate-200"
                  />
                </div>

                <h3 className="text-slate-200 text-lg font-semibold mt-8">Custom Fields</h3>
                <p className="text-slate-400 text-sm mb-4">Add specific data fields for your credential.</p>
                <div className="space-y-4">
                  {customFields.map((field, index) => (
                    <div key={index} className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Label htmlFor={`fieldName-${index}`}>Field Name</Label>
                        <Input
                          id={`fieldName-${index}`}
                          placeholder="e.g., Degree, Skill, Membership ID"
                          value={field.name}
                          onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-slate-200"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`fieldValue-${index}`}>Field Value</Label>
                        <Input
                          id={`fieldValue-${index}`}
                          placeholder="e.g., Computer Science, JavaScript, 12345"
                          value={field.value}
                          onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-slate-200"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveField(index)}
                        className="shrink-0"
                      >
                        <Shield className="h-4 w-4 rotate-45" /> {/* Using Shield and rotating for an X icon */}
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={handleAddField}
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Shield className="h-4 w-4 mr-2" /> Add Custom Field
                </Button>

                <Button
                  onClick={handleCreateCredential}
                  disabled={isCreating || !isConnected || !credentialType}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-5 mt-6"
                >
                  {isCreating ? (
                    <>
                      <Shield className="mr-2 h-5 w-5 animate-spin" />
                      Creating Credential...
                    </>
                  ) : (
                    "Issue Credential"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
