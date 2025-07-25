"use client"
import { useState } from "react"
import { ArrowLeft, CheckCircle, Database, Fingerprint, Loader2, Shield, AlertCircle, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWallet } from "@/hooks/useWallet"

interface Credential {
  id: string
  type: string
  issuer: string
  issuedDate: string
  status: "active" | "expired" | "revoked"
  fields: { [key: string]: string }
}

interface EnrollmentScreenProps {
  onBack: () => void
  onComplete: (credential: Credential) => void
  onWalletRequired: () => void
}

type BiometricStatus = "idle" | "scanning" | "success" | "error"
type WalrusStatus = "idle" | "encrypting" | "uploading" | "storing" | "success"
type FacialScanStage = "neutral" | "up" | "left" | "right" | "complete"

const countryCodes = [
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
]

const nationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentine", "Armenian", "Australian",
  "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian",
  "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian",
  "Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African",
  "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban",
  "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian",
  "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French",
  "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan",
  "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "Icelander", "Indian", "Indonesian",
  "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani",
  "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan",
  "Liechtensteiner", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan",
  "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan",
  "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese",
  "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish",
  "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian",
  "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan",
  "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean",
  "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean",
  "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik",
  "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan",
  "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian",
  "Zimbabwean",
]

export default function EnrollmentScreen({ onBack, onComplete, onWalletRequired }: EnrollmentScreenProps) {
  const { isConnected, walletName } = useWallet()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    address: "",
    email: "",
    phoneNumber: "",
    countryCode: "+234",
    nationality: "",
    idNumber: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [biometric, setBiometric] = useState<BiometricStatus>("idle")
  const [facial, setFacial] = useState<BiometricStatus>("idle")
  const [facialStage, setFacialStage] = useState<FacialScanStage>("neutral")
  const [walrus, setWalrus] = useState<WalrusStatus>("idle")
  const [consent, setConsent] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [walrusId, setWalrusId] = useState("")
  const [biometricCaptured, setBiometricCaptured] = useState(false)
  const [facialCaptured, setFacialCaptured] = useState(false)

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = "Full name is required"
    if (!formData.dob) errors.dob = "Date of birth is required"
    if (!formData.address.trim()) errors.address = "Address is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email"
    if (!formData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required"
    if (!formData.nationality.trim()) errors.nationality = "Nationality is required"
    if (!formData.idNumber.trim()) errors.idNumber = "ID number is required"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (step === 1) {
      if (!validateForm()) return
      setStep(2)
    } else if (step === 2) {
      if (!biometricCaptured) {
        alert("Please capture fingerprint data.")
        return
      }
      setStep(3)
    } else if (step === 3) {
      if (!facialCaptured) {
        alert("Please capture facial data.")
        return
      }
      setStep(4)
    } else if (step === 4) {
      if (!consent) {
        alert("Please agree to the privacy and consent agreement.")
        return
      }
      uploadWalrus()
    }
  }

  const startScan = () => {
    setBiometric("scanning")
    setTimeout(() => {
      const ok = Math.random() > 0.2
      setBiometric(ok ? "success" : "error")
      if (ok) handleBiometricCapture()
    }, 3000)
  }

  const handleBiometricCapture = () => {
    setBiometricCaptured(true)
  }

  const startFacialScan = () => {
    setFacial("scanning")
    setFacialStage("neutral")
    setTimeout(() => {
      setFacialStage("up")
      setTimeout(() => {
        setFacialStage("left")
        setTimeout(() => {
          setFacialStage("right")
          setTimeout(() => {
            const ok = Math.random() > 0.2
            setFacial(ok ? "success" : "error")
            setFacialStage("complete")
            if (ok) handleFacialCapture()
          }, 2000)
        }, 2000)
      }, 2000)
    }, 2000)
  }

  const handleFacialCapture = () => {
    setFacialCaptured(true)
  }

  const uploadWalrus = () => {
    if (!isConnected) {
      onWalletRequired()
      return
    }
    setProcessing(true)
    setWalrus("encrypting")
    setTimeout(() => setWalrus("uploading"), 1500)
    setTimeout(() => setWalrus("storing"), 3000)
    setTimeout(() => {
      setWalrus("success")
      const newWalrusId = "0x" + Math.random().toString(16).slice(2, 34)
      setWalrusId(newWalrusId)
      setProcessing(false)
      setStep(5)
      const newCredential: Credential = {
        id: `cred-${Date.now()}`,
        type: "Identity Verification",
        issuer: "Verisafe Platform",
        issuedDate: new Date().toISOString().split("T")[0],
        status: "active",
        fields: {
          fullName: formData.name,
          dateOfBirth: formData.dob,
          email: formData.email,
          address: formData.address,
          phoneNumber: `${formData.countryCode} ${formData.phoneNumber}`,
          nationality: formData.nationality,
          idNumber: formData.idNumber,
          walrusObjectId: newWalrusId,
          biometricHash: "0x" + Math.random().toString(16).slice(2, 32),
          facialHash: "0x" + Math.random().toString(16).slice(2, 32),
          wallet: walletName || "N/A",
        },
      }
      setTimeout(() => {
        onComplete(newCredential)
      }, 2000)
    }, 5000)
  }

  const progress = (step / 5) * 100
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative">
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
          <nav className="border-b border-slate-700/50 bg-slate-900/90 backdrop-blur">
            <div className="container mx-auto px-6 py-4 flex items-center">
              <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-slate-400 hover:text-white mr-4 bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b]"
              >
                <ArrowLeft className="mr-2 h-4 w-4 text-[#09b6c8]" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-md shadow-md">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Create Your Identity
                </h1>
              </div>
            </div>
          </nav>
          <section className="container mx-auto px-6 py-10 max-w-2xl">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round(progress)} % complete</span>
            </div>
            <Progress value={progress} className="h-3 bg-slate-700/50" />
            <div className="flex justify-between mt-1 text-xs text-slate-500">
              <span className={step >= 1 ? "text-cyan-400" : ""}>Biodata</span>
              <span className={step >= 2 ? "text-teal-400" : ""}>Fingerprint</span>
              <span className={step >= 3 ? "text-blue-400" : ""}>Facial</span>
              <span className={step >= 4 ? "text-emerald-400" : ""}>Consent</span>
              <span className={step >= 5 ? "text-green-400" : ""}>Done</span>
            </div>
          </section>
          <div className="container mx-auto px-6 pb-20 max-w-3xl">
            {step === 1 && (
                <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-slate-100">Personal Information</CardTitle>
                    <CardDescription className="text-slate-400">
                      Enter your biodata for secure Walrus storage. All fields are required for identity verification.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value })
                              if (formErrors.name) setFormErrors({ ...formErrors, name: "" })
                            }}
                            className={`bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.name ? "border-red-500" : ""}`}
                        />
                        {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input
                            id="dob"
                            type="date"
                            value={formData.dob}
                            onChange={(e) => {
                              setFormData({ ...formData, dob: e.target.value })
                              if (formErrors.dob) setFormErrors({ ...formErrors, dob: "" })
                            }}
                            className={`bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.dob ? "border-red-500" : ""}`}
                        />
                        {formErrors.dob && <p className="text-red-400 text-sm mt-1">{formErrors.dob}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value })
                              if (formErrors.email) setFormErrors({ ...formErrors, email: "" })
                            }}
                            className={`bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.email ? "border-red-500" : ""}`}
                        />
                        {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <div className="flex space-x-2">
                          <Select
                              value={formData.countryCode}
                              onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                          >
                            <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-slate-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              {countryCodes.map((country) => (
                                  <SelectItem
                                      key={`${country.code}-${country.country}`}
                                      value={country.code}
                                      className="text-slate-200 hover:bg-slate-700"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <span>{country.flag}</span>
                                      <span>{country.code}</span>
                                    </div>
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                              id="phoneNumber"
                              placeholder="8123456789"
                              value={formData.phoneNumber}
                              onChange={(e) => {
                                setFormData({ ...formData, phoneNumber: e.target.value })
                                if (formErrors.phoneNumber) setFormErrors({ ...formErrors, phoneNumber: "" })
                              }}
                              className={`flex-1 bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.phoneNumber ? "border-red-500" : ""}`}
                          />
                        </div>
                        {formErrors.phoneNumber && <p className="text-red-400 text-sm mt-1">{formErrors.phoneNumber}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                          id="address"
                          placeholder="123 Main Street, City, State, ZIP Code, Country"
                          value={formData.address}
                          onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value })
                            if (formErrors.address) setFormErrors({ ...formErrors, address: "" })
                          }}
                          className={`bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.address ? "border-red-500" : ""}`}
                      />
                      {formErrors.address && <p className="text-red-400 text-sm mt-1">{formErrors.address}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nationality">Nationality *</Label>
                        <Select
                            value={formData.nationality}
                            onValueChange={(value) => {
                              setFormData({ ...formData, nationality: value })
                              if (formErrors.nationality) setFormErrors({ ...formErrors, nationality: "" })
                            }}
                        >
                          <SelectTrigger
                              className={`bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.nationality ? "border-red-500" : ""}`}
                          >
                            <SelectValue placeholder="Select nationality" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600 max-h-60">
                            {nationalities.map((nationality) => (
                                <SelectItem
                                    key={nationality}
                                    value={nationality}
                                    className="text-slate-200 hover:bg-slate-700"
                                >
                                  {nationality}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.nationality && <p className="text-red-400 text-sm mt-1">{formErrors.nationality}</p>}
                      </div>
                      <div>
                        <Label htmlFor="idNumber">Government ID Number *</Label>
                        <Input
                            id="idNumber"
                            placeholder="Passport, Driver's License, or National ID"
                            value={formData.idNumber}
                            onChange={(e) => {
                              setFormData({ ...formData, idNumber: e.target.value })
                              if (formErrors.idNumber) setFormErrors({ ...formErrors, idNumber: "" })
                            }}
                            className={`bg-slate-700/50 border-slate-600 text-slate-200 ${formErrors.idNumber ? "border-red-500" : ""}`}
                        />
                        {formErrors.idNumber && <p className="text-red-400 text-sm mt-1">{formErrors.idNumber}</p>}
                      </div>
                    </div>
                    <Button
                        onClick={handleNext}
                        className="w-full bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b] text-white py-5"
                    >
                      <CheckCircle className="mr-2 h-5 w-5 text-[#09b6c8]" />
                      Continue to Fingerprint
                    </Button>
                  </CardContent>
                </Card>
            )}
            {step === 2 && (
                <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-slate-100">Fingerprint Capture</CardTitle>
                    <CardDescription className="text-slate-400">Secure fingerprint data encrypted locally.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="text-center">
                      <div className="relative mx-auto w-48 h-48 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-700/50">
                        {biometric === "idle" && <Fingerprint className="h-24 w-24 text-slate-400" />}
                        {biometric === "scanning" && (
                            <>
                              <Fingerprint className="h-24 w-24 text-teal-400 animate-pulse" />
                              <div className="absolute inset-0 rounded-full border-4 border-teal-400 animate-ping" />
                            </>
                        )}
                        {biometric === "success" && <CheckCircle className="h-24 w-24 text-green-400" />}
                        {biometric === "error" && <AlertCircle className="h-24 w-24 text-red-400" />}
                      </div>
                      <p className="mt-4 text-slate-400">
                        {biometric === "idle" && "Touch the sensor to start the scan."}
                        {biometric === "scanning" && "Scanning... please hold still."}
                        {biometric === "success" && "Fingerprint scan complete!"}
                        {biometric === "error" && "Scan failed, please try again."}
                      </p>
                    </div>
                    {biometric !== "success" ? (
                        <Button
                            onClick={startScan}
                            disabled={biometric === "scanning"}
                            className="w-full bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b] py-5"
                        >
                          {biometric === "scanning" ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#09b6c8]" />
                                Scanning...
                              </>
                          ) : (
                              <>
                                <CheckCircle className="mr-2 h-5 w-5 text-[#09b6c8]" />
                                Start Fingerprint Scan
                              </>
                          )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            className="w-full bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b] py-5"
                        >
                          <CheckCircle className="mr-2 h-5 w-5 text-[#09b6c8]" />
                          Continue to Facial
                        </Button>
                    )}
                  </CardContent>
                </Card>
            )}
            {step === 3 && (
                <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-slate-100">Facial Verification</CardTitle>
                    <CardDescription className="text-slate-400">Secure facial data encrypted locally for KYC verification.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="text-center">
                      <div className="relative mx-auto w-48 h-48 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-700/50">
                        {facial === "idle" && <Camera className="h-24 w-24 text-slate-400" />}
                        {facial === "scanning" && (
                            <>
                              <Camera className="h-24 w-24 text-blue-400 animate-pulse" />
                              <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping" />
                            </>
                        )}
                        {facial === "success" && <CheckCircle className="h-24 w-24 text-green-400" />}
                        {facial === "error" && <AlertCircle className="h-24 w-24 text-red-400" />}
                      </div>
                      <p className="mt-4 text-slate-400">
                        {facial === "idle" && "Click to activate the camera and start the facial scan."}
                        {facial === "scanning" && facialStage === "neutral" && "Activating camera... Look straight with a neutral expression."}
                        {facial === "scanning" && facialStage === "up" && "Please tilt your face slightly upward."}
                        {facial === "scanning" && facialStage === "left" && "Please tilt your face slightly to the left."}
                        {facial === "scanning" && facialStage === "right" && "Please tilt your face slightly to the right."}
                        {facial === "success" && "Facial scan complete!"}
                        {facial === "error" && "Facial scan failed, please try again."}
                      </p>
                    </div>
                    {facial !== "success" ? (
                        <Button
                            onClick={startFacialScan}
                            disabled={facial === "scanning"}
                            className="w-full bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b] py-5"
                        >
                          {facial === "scanning" ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#09b6c8]" />
                                Scanning...
                              </>
                          ) : (
                              <>
                                <Camera className="mr-2 h-5 w-5 text-[#09b6c8]" />
                                Start Facial Scan
                              </>
                          )}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            className="w-full bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b] py-5"
                        >
                          <CheckCircle className="mr-2 h-5 w-5 text-[#09b6c8]" />
                          Continue to Consent
                        </Button>
                    )}
                  </CardContent>
                </Card>
            )}
            {step === 4 && (
                <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-slate-100">Privacy & Consent</CardTitle>
                    <CardDescription className="text-slate-400">GDPR-compliant data processing agreement.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-slate-700/40 p-4 rounded-md border border-slate-600 text-sm leading-relaxed text-slate-300 space-y-2">
                      <p>
                        • Your biometric and facial data are encrypted locally with zero-knowledge proofs before upload to Walrus
                        decentralized storage.
                      </p>
                      <p>• You may revoke or update credentials at any time via on-chain Aiken smart contracts.</p>
                      <p>• A credential revocation list (CRL) is maintained on-chain for auditors.</p>
                      <p>
                        • Your Cardano wallet will be used to sign transactions and maintain ownership of your credentials.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <input
                          id="consent"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 accent-teal-500"
                      />
                      <Label htmlFor="consent" className="text-slate-200 select-none">
                        I agree to the encrypted processing of my data and understand I can revoke access at any time. I
                        confirm that I have a connected Cardano wallet for secure credential management.
                      </Label>
                    </div>
                    <Button
                        onClick={handleNext}
                        disabled={!consent || processing}
                        className="w-full bg-gradient-to-br from-[#09b6c8] to-[#12b8ae] hover:from-[#08a3b3] hover:to-[#10a59b] py-5"
                    >
                      {processing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#09b6c8]" />
                            Processing on Walrus...
                          </>
                      ) : (
                          <>
                            <CheckCircle className="mr-2 h-5 w-5 text-[#09b6c8]" />
                            Complete Enrollment
                          </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
            )}
            {step === 5 && (
                <Card className="bg-slate-800/60 border-slate-600 backdrop-blur">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-slate-100">Identity Created!</CardTitle>
                    <CardDescription className="text-slate-400">
                      Your decentralized identifier is stored on Walrus and secured by your Cardano wallet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-700/50 p-4 rounded-md border border-slate-600 text-sm">
                      <div className="text-slate-400">Walrus Object ID</div>
                      <code className="block break-all text-cyan-400">{walrusId}</code>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-300 mb-4">Credential will be added to your dashboard automatically...</p>
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
            )}
            {processing && (
                <Card className="mt-6 bg-slate-800/60 border-slate-600 backdrop-blur">
                  <CardContent className="space-y-2 py-4">
                    <h4 className="flex items-center text-slate-200 font-medium mb-2">
                      <Database className="mr-2 h-4 w-4 text-cyan-400" />
                      Walrus Upload Status
                    </h4>
                    <StatusLine active={walrus === "encrypting"} label="Encrypting data" />
                    <StatusLine active={walrus === "uploading"} label="Uploading to Walrus" />
                    <StatusLine active={walrus === "storing"} label="Verifying storage" />
                  </CardContent>
                </Card>
            )}
          </div>
        </div>
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
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
      </div>
  )
}

function StatusLine({ active, label }: { active: boolean; label: string }) {
  return (
      <div className={`flex items-center ${active ? "text-teal-300" : "text-slate-500"}`}>
        <div className={`w-2 h-2 rounded-full mr-3 ${active ? "bg-teal-400 animate-ping" : "bg-slate-500"}`} />
        {label}
        {active && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </div>
  )
}