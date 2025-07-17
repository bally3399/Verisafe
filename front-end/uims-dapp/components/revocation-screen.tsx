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
