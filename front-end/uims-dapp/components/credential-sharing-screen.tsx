"use client"

import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Share2, CheckCircle } from "lucide-react"
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

interface CredentialSharingScreenProps {
  onBack: () => void
  credentials: Credential[]
}

export default function CredentialSharingScreen({ onBack, credentials }: CredentialSharingScreenProps) {
  const [selectedCredentialId, setSelectedCredentialId] = useState<string | null>(null)
  const [recipient, setRecipient] = useState("")
  const [isShared, setIsShared] = useState(false)

  const handleShare = () => {
    if (!selectedCredentialId || !recipient) {
      alert("Please select a credential and enter a recipient.")
      return
    }
    // Simulate sharing
    setIsShared(true)
    console.log(`Sharing credential ${selectedCredentialId} with ${recipient}`)
    setTimeout(() => {
      setIsShared(false) // Reset for next share
      alert(`Credential ${selectedCredentialId} shared successfully with ${recipient}!`)
      onBack()
    }, 1500)
  }

  const selectedCredential = credentials.find((cred) => cred.id === selectedCredentialId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800/60 border-slate-700 text-slate-200 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <Share2 className="h-6 w-6 mr-2" />
            Share Credentials
          </CardTitle>
          <CardDescription className="text-slate-400">
            Select a credential to share and specify the recipient.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {credentials.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">You have no credentials to share.</p>
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
                    {credentials.map((cred) => (
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
                      Issuer: {selectedCredential.issuer} | Issued:{" "}
                      {new Date(selectedCredential.issuedDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h5 className="text-slate-300 font-semibold mb-2">Fields:</h5>
                    <ul className="list-disc list-inside text-slate-400 text-sm">
                      {Object.entries(selectedCredential.fields).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div>
                <Label htmlFor="recipient" className="text-slate-300">
                  Recipient Address/DID
                </Label>
                <Input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="did:example:123abc..."
                  className="bg-slate-700/50 border-slate-600 text-slate-200 placeholder:text-slate-500 focus-visible:ring-cyan-500"
                />
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
                  onClick={handleShare}
                  disabled={!selectedCredentialId || !recipient || isShared}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                >
                  {isShared ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2 animate-pulse" /> Sharing...
                    </>
                  ) : (
                    <>
                      <Share2 className="h-5 w-5 mr-2" /> Share Credential
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
