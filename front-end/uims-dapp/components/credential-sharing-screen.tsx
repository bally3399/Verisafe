"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Shield,
  Eye,
  Users,
  CheckCircle,
  AlertTriangle,
  Copy,
  ExternalLink
} from "lucide-react"
// @ts-ignore
import QRCode from "react-qr-code"
// @ts-ignore
import jsPDF from "jspdf"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedDate?: string
  expiryDate?: string
  status: "active" | "expired" | "revoked"
  fields: { [key: string]: string }
}

interface CredentialSharingScreenProps {
  onBack: () => void
  credentials: Credential[]
}

export default function CredentialSharingScreen({ onBack, credentials }: CredentialSharingScreenProps) {
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([])
  const [selectedFields, setSelectedFields] = useState<{ [key: string]: string[] }>({})
  const [recipientAddress, setRecipientAddress] = useState("")
  const [isSharing, setIsSharing] = useState(false)
  const [shareResult, setShareResult] = useState<"success" | "error" | null>(null)
  const [txHash, setTxHash] = useState("")
  const [shareMethod, setShareMethod] = useState<"wallet" | "file" | "qr" | "whatsapp">("wallet")

  const handleCredentialSelect = (credId: string) => {
    setSelectedCredentials((prev) => (
        prev.includes(credId)
            ? prev.filter((id) => id !== credId)
            : [...prev, credId]
    ))
    if (!selectedCredentials.includes(credId)) {
      setSelectedFields((prev) => ({ ...prev, [credId]: [] }))
    } else {
      setSelectedFields((prev) => {
        const newFields = { ...prev }
        delete newFields[credId]
        return newFields
      })
    }
  }

  const handleFieldSelect = (credId: string, field: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [credId]: prev[credId]?.includes(field)
          ? prev[credId].filter((f) => f !== field)
          : [...(prev[credId] || []), field],
    }))
  }

  const handleShare = () => {
    setIsSharing(true)

    const sharedData = credentials
        .filter((cred) => selectedCredentials.includes(cred.id))
        .map((cred) => ({
          id: cred.id,
          type: cred.type,
          issuer: cred.issuer,
          fields: selectedFields[cred.id]?.reduce((obj, field) => {
            obj[field] = cred.fields[field]
            return obj
          }, {} as { [key: string]: string }),
        }))

    if (shareMethod === "file") {
      const doc = new jsPDF()
      sharedData.forEach((cred, index) => {
        doc.text(`Credential #${index + 1}`, 10, 10 + index * 40)
        doc.text(`Type: ${cred.type}`, 10, 20 + index * 40)
        doc.text(`Issuer: ${cred.issuer}`, 10, 30 + index * 40)
        Object.entries(cred.fields).forEach(([k, v], i) => {
          doc.text(`${k}: ${v}`, 10, 40 + index * 40 + i * 10)
        })
      })
      doc.save("shared_credentials.pdf")
      setTimeout(() => {
        setShareResult("success")
        setIsSharing(false)
      }, 1000)
      return
    }

    setTimeout(() => {
      const success = Math.random() > 0.1
      setShareResult(success ? "success" : "error")
      if (success) {
        setTxHash("0x" + Math.random().toString(16).substr(2, 64))
      }
      setIsSharing(false)
    }, 3000)
  }

  const resetShare = () => {
    setShareResult(null)
    setTxHash("")
    setSelectedCredentials([])
    setSelectedFields({})
    setRecipientAddress("")
  }

  const copyTxHash = () => {
    navigator.clipboard.writeText(txHash)
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white mr-4">
              <ArrowLeft className="h-4 w-4 mr-2"/>
              Back
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
              Share Credentials
            </h1>
          </div>

          <div className="flex justify-center mb-6">
            <div
                className="bg-sky-900/30 text-sky-400 border border-sky-500/30 px-4 py-2 rounded-full flex items-center">
              <Eye className="h-4 w-4 mr-2"/>
              Selective disclosure - You control what to share
            </div>
          </div>

          {shareMethod === "qr" && selectedCredentials.length > 0 && (
              <div className="flex justify-center mb-6">
                <QRCode
                    value={JSON.stringify({recipient: recipientAddress, credentials: selectedCredentials})}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    size={128}
                />
              </div>
          )}

          <div className="max-w-4xl mx-auto">
            {shareResult === "success" ? (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="text-center">
                    <div
                        className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-white"/>
                    </div>
                    <CardTitle className="text-slate-200">Credentials Shared Successfully!</CardTitle>
                    <CardDescription className="text-slate-400">
                      Your credentials have been securely shared
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {txHash && (
                        <div className="bg-slate-700/50 p-4 rounded-lg">
                          <h3 className="text-slate-200 font-semibold mb-2 flex items-center">
                            <ExternalLink className="h-4 w-4 mr-2"/>
                            Transaction Hash
                          </h3>
                          <div className="flex items-center space-x-2">
                            <code className="text-green-400 text-sm break-all flex-1">{txHash}</code>
                            <Button onClick={copyTxHash} size="sm" variant="outline">
                              <Copy className="h-4 w-4"/>
                            </Button>
                          </div>
                        </div>
                    )}
                    <Button onClick={resetShare} className="w-full">
                      Share More Credentials
                    </Button>
                  </CardContent>
                </Card>
            ) : shareResult === "error" ? (
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader className="text-center">
                    <div
                        className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="h-8 w-8 text-white"/>
                    </div>
                    <CardTitle className="text-slate-200">Sharing Failed</CardTitle>
                    <CardDescription className="text-slate-400">
                      There was an error sharing your credentials. Please try again.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={resetShare} className="w-full">
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                  {credentials.length === 0 ? (
                      <Card className="bg-slate-800/50 border-slate-700">
                        <CardContent className="text-center py-12">
                          <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4"/>
                          <h3 className="text-slate-200 text-xl font-semibold mb-2">No Credentials Found</h3>
                          <p className="text-slate-400 mb-6">You need to create credentials before you can share
                            them.</p>
                          <Button
                              onClick={onBack}
                              className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                          >
                            Go Back to Dashboard
                          </Button>
                        </CardContent>
                      </Card>
                  ) : (
                      <>
                        {/* Credentials list */}
                        <Card className="bg-slate-800/50 border-slate-700">
                          <CardHeader>
                            <CardTitle className="text-slate-200 flex items-center">
                              <Shield className="h-5 w-5 mr-2 text-sky-400"/>
                              Your Verifiable Credentials
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                              Select credentials and specific fields to share
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {credentials.map((cred) => (
                                <Card key={cred.id} className="bg-slate-700/30 border-slate-600">
                                  <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <Checkbox
                                            checked={selectedCredentials.includes(cred.id)}
                                            onCheckedChange={() => handleCredentialSelect(cred.id)}
                                        />
                                        <div>
                                          <h3 className="text-slate-200 font-semibold">{cred.type}</h3>
                                          <p className="text-slate-400 text-sm">Issued by {cred.issuer}</p>
                                        </div>
                                      </div>
                                      <Badge
                                          variant={cred.status === "active" ? "default" : "destructive"}
                                          className={
                                            cred.status === "active"
                                                ? "bg-green-900/30 text-green-400 border-green-500/30"
                                                : ""
                                          }
                                      >
                                        {cred.status}
                                      </Badge>
                                    </div>
                                  </CardHeader>
                                  {selectedCredentials.includes(cred.id) && (
                                      <CardContent className="pt-0">
                                        <div className="bg-slate-800/50 p-4 rounded-lg">
                                          <h4 className="text-slate-300 text-sm font-medium mb-3 flex items-center">
                                            <Eye className="h-4 w-4 mr-2 text-sky-400"/>
                                            Select fields to share:
                                          </h4>
                                          <div className="space-y-3">
                                            {Object.entries(cred.fields).map(([field, value]) => (
                                                <div
                                                    key={field}
                                                    className="flex items-start space-x-3 p-2 rounded border border-slate-600/50 hover:border-slate-500 transition-colors"
                                                >
                                                  <Checkbox
                                                      checked={selectedFields[cred.id]?.includes(field) || false}
                                                      onCheckedChange={() => handleFieldSelect(cred.id, field)}
                                                      className="mt-1"
                                                  />
                                                  <div className="flex-1 min-w-0">
                                                    <Label
                                                        className="text-slate-300 text-sm font-medium capitalize cursor-pointer">
                                                      {field.replace(/([A-Z])/g, " $1").trim()}
                                                    </Label>
                                                    <p className="text-slate-400 text-xs mt-1 break-words">{value}</p>
                                                  </div>
                                                </div>
                                            ))}
                                          </div>
                                        </div>
                                      </CardContent>
                                  )}
                                </Card>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Share Panel */}
                        {selectedCredentials.length > 0 && (
                            <Card className="bg-slate-800/50 border-slate-700">
                              <CardHeader>
                                <CardTitle className="text-slate-200 flex items-center">
                                  <Users className="h-5 w-5 mr-2 text-sky-400"/>
                                  Share with Recipient
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <Label htmlFor="recipient" className="text-slate-200">
                                    Recipient Wallet Address
                                  </Label>
                                  <Input
                                      id="recipient"
                                      value={recipientAddress}
                                      onChange={(e) => setRecipientAddress(e.target.value)}
                                      className="bg-slate-700 border-slate-600 text-slate-200"
                                      placeholder="addr1qx2..."
                                  />
                                </div>

                                <div>
                                  <Label className="text-slate-200 mb-2 block">Sharing Method</Label>
                                  <Select value={shareMethod} onValueChange={(value) => setShareMethod(value as any)}>
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                                      <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#0a99dd] border-[#0a99dd] text-white">
                                      <SelectItem value="file">Download File</SelectItem>
                                      <SelectItem value="wallet">Wallet</SelectItem>
                                      <SelectItem value="qr">QR Code</SelectItem>
                                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <Button
                                    onClick={handleShare}
                                    disabled={isSharing}
                                    className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                                >
                                  {isSharing ? "Sharing..." : "Share Credentials"}
                                </Button>
                              </CardContent>
                            </Card>
                        )}
                      </>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
  )
}