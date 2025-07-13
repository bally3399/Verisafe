"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save, FileText, Award, GraduationCap, Briefcase, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWallet } from "@/hooks/useWallet"

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
  onComplete: (credential: Credential) => void
  onWalletRequired: () => void
}

const credentialTypes = [
  {
    id: "education",
    name: "Educational Certificate",
    icon: GraduationCap,
    description: "Academic degrees, diplomas, certifications",
    fields: ["institutionName", "degreeName", "fieldOfStudy", "graduationDate", "gpa", "honors"],
  },
  {
    id: "professional",
    name: "Professional License",
    icon: Briefcase,
    description: "Professional certifications, licenses",
    fields: ["licenseType", "issuingAuthority", "licenseNumber", "issueDate", "expiryDate", "specializations"],
  },
  {
    id: "achievement",
    name: "Achievement Award",
    icon: Award,
    description: "Awards, recognitions, achievements",
    fields: ["awardName", "awardingOrganization", "achievementDate", "category", "description", "level"],
  },
  {
    id: "verification",
    name: "Identity Verification",
    icon: Shield,
    description: "Identity documents, KYC verification",
    fields: ["documentType", "issuingCountry", "documentNumber", "issueDate", "expiryDate", "verificationLevel"],
  },
  {
    id: "custom",
    name: "Custom Credential",
    icon: FileText,
    description: "Create your own credential type",
    fields: [],
  },
]

export default function CredentialCreationScreen({
  onBack,
  onComplete,
  onWalletRequired,
}: CredentialCreationScreenProps) {
  const { isConnected } = useWallet()
  const [selectedType, setSelectedType] = useState<string>("")
  const [credentialData, setCredentialData] = useState({
    title: "",
    issuer: "",
    description: "",
    expiryDate: "",
  })
  const [customFields, setCustomFields] = useState<{ [key: string]: string }>({})
  const [isCreating, setIsCreating] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const selectedCredentialType = credentialTypes.find((type) => type.id === selectedType)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!credentialData.title.trim()) newErrors.title = "Title is required"
    if (!credentialData.issuer.trim()) newErrors.issuer = "Issuer is required"
    if (!selectedType) newErrors.type = "Please select a credential type"

    // Validate required fields for selected type
    if (selectedCredentialType && selectedCredentialType.fields.length > 0) {
      selectedCredentialType.fields.forEach((field) => {
        if (!customFields[field]?.trim()) {
          newErrors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required`
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCreate = async () => {
    if (!isConnected) {
      onWalletRequired()
      return
    }

    if (!validateForm()) return

    setIsCreating(true)

    // Simulate credential creation process
    setTimeout(() => {
      const newCredential: Credential = {
        id: `cred-${Date.now()}`,
        type: credentialData.title,
        issuer: credentialData.issuer,
        issuedDate: new Date().toISOString().split("T")[0],
        expiryDate: credentialData.expiryDate || undefined,
        status: "active",
        fields: {
          title: credentialData.title,
          description: credentialData.description,
          credentialType: selectedCredentialType?.name || "Custom",
          ...customFields,
          walrusObjectId: "0x" + Math.random().toString(16).slice(2, 34),
          blockchainHash: "0x" + Math.random().toString(16).slice(2, 32),
        },
      }

      setIsCreating(false)
      onComplete(newCredential)
    }, 3000)
  }

  const handleFieldChange = (field: string, value: string) => {
    setCustomFields((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatFieldName = (field: string) => {
    return field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306b6d4' fillOpacity='0.15'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <nav className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur">
          <div className="container mx-auto px-6 py-4 flex items-center">
            <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-md shadow-md">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Create New Credential
              </h1>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Credential Type Selection */}
          {!selectedType && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-200 mb-4">Choose Credential Type</h2>
                <p className="text-slate-400 text-lg">Select the type of credential you want to create</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {credentialTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <Card
                      key={type.id}
                      className="bg-slate-800/60 border-slate-600 hover:border-cyan-500/60 transition-all duration-300 cursor-pointer hover:scale-105 backdrop-blur-sm"
                      onClick={() => setSelectedType(type.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/25">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2">{type.name}</h3>
                        <p className="text-slate-400 text-sm">{type.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Credential Creation Form */}
          {selectedType && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedCredentialType && (
                    <>
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-md">
                        <selectedCredentialType.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-200">{selectedCredentialType.name}</h2>
                        <p className="text-slate-400">{selectedCredentialType.description}</p>
                      </div>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedType("")}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Change Type
                </Button>
              </div>

              <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-slate-200">Credential Details</CardTitle>
                  <CardDescription className="text-slate-400">
                    Fill in the details for your new credential
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Credential Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Bachelor of Computer Science"
                        value={credentialData.title}
                        onChange={(e) => {
                          setCredentialData({ ...credentialData, title: e.target.value })
                          if (errors.title) setErrors({ ...errors, title: "" })
                        }}
                        className={`bg-slate-700/50 border-slate-600 text-slate-200 ${errors.title ? "border-red-500" : ""}`}
                      />
                      {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                      <Label htmlFor="issuer">Issuing Organization *</Label>
                      <Input
                        id="issuer"
                        placeholder="e.g., University of Technology"
                        value={credentialData.issuer}
                        onChange={(e) => {
                          setCredentialData({ ...credentialData, issuer: e.target.value })
                          if (errors.issuer) setErrors({ ...errors, issuer: "" })
                        }}
                        className={`bg-slate-700/50 border-slate-600 text-slate-200 ${errors.issuer ? "border-red-500" : ""}`}
                      />
                      {errors.issuer && <p className="text-red-400 text-sm mt-1">{errors.issuer}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of this credential..."
                      value={credentialData.description}
                      onChange={(e) => setCredentialData({ ...credentialData, description: e.target.value })}
                      className="bg-slate-700/50 border-slate-600 text-slate-200 min-h-20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={credentialData.expiryDate}
                      onChange={(e) => setCredentialData({ ...credentialData, expiryDate: e.target.value })}
                      className="bg-slate-700/50 border-slate-600 text-slate-200"
                    />
                  </div>

                  {/* Type-specific Fields */}
                  {selectedCredentialType && selectedCredentialType.fields.length > 0 && (
                    <div className="space-y-4">
                      <div className="border-t border-slate-600 pt-6">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Additional Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedCredentialType.fields.map((field) => (
                            <div key={field}>
                              <Label htmlFor={field}>{formatFieldName(field)} *</Label>
                              <Input
                                id={field}
                                placeholder={`Enter ${formatFieldName(field).toLowerCase()}`}
                                value={customFields[field] || ""}
                                onChange={(e) => handleFieldChange(field, e.target.value)}
                                className={`bg-slate-700/50 border-slate-600 text-slate-200 ${errors[field] ? "border-red-500" : ""}`}
                              />
                              {errors[field] && <p className="text-red-400 text-sm mt-1">{errors[field]}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Fields for Custom Type */}
                  {selectedType === "custom" && (
                    <div className="space-y-4">
                      <div className="border-t border-slate-600 pt-6">
                        <h3 className="text-lg font-semibold text-slate-200 mb-4">Custom Fields</h3>
                        <p className="text-slate-400 text-sm mb-4">
                          Add custom fields for your credential. You can add more fields after creation.
                        </p>
                        <div className="space-y-3">
                          {Object.entries(customFields).map(([key, value], index) => (
                            <div key={index} className="flex space-x-2">
                              <Input
                                placeholder="Field name"
                                value={key}
                                onChange={(e) => {
                                  const newFields = { ...customFields }
                                  delete newFields[key]
                                  newFields[e.target.value] = value
                                  setCustomFields(newFields)
                                }}
                                className="bg-slate-700/50 border-slate-600 text-slate-200"
                              />
                              <Input
                                placeholder="Field value"
                                value={value}
                                onChange={(e) => handleFieldChange(key, e.target.value)}
                                className="bg-slate-700/50 border-slate-600 text-slate-200"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newFields = { ...customFields }
                                  delete newFields[key]
                                  setCustomFields(newFields)
                                }}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={() =>
                              setCustomFields({ ...customFields, [`field${Object.keys(customFields).length + 1}`]: "" })
                            }
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Field
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={onBack}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreate}
                      disabled={isCreating}
                      className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Credential
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
