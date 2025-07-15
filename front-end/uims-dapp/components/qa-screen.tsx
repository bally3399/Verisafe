"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail } from "lucide-react"

interface QAScreenProps {
  onBack: () => void
}

export default function QAScreen({ onBack }: QAScreenProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "What is Verisafe and how does it work?",
      answer:
        "Verisafe is a decentralized identity platform that uses Walrus storage and Cardano blockchain technology to securely store and manage your personal credentials. Your biometric data is encrypted locally before being stored on the decentralized network, ensuring maximum privacy and security.",
    },
    {
      id: 2,
      category: "Wallet Integration",
      question: "Which Cardano wallets are supported?",
      answer:
        "Verisafe supports all major Cardano wallets including Nami, Eternl, Flint, and Typhon. You need to connect a Cardano wallet to create and manage your identity credentials securely.",
    },
    {
      id: 3,
      category: "Privacy & Security",
      question: "How is my biometric data protected?",
      answer:
        "Your biometric data is encrypted locally on your device using zero-knowledge proofs before being uploaded to Walrus decentralized storage. No one, including Verisafe, can access your raw biometric data. Only cryptographic hashes are stored on-chain.",
    },
    {
      id: 4,
      category: "Credentials",
      question: "What types of credentials can I create?",
      answer:
        "You can create various types of verifiable credentials including identity verification, educational certificates, professional licenses, and custom credentials. Each credential is cryptographically signed and stored securely on the blockchain.",
    },
    {
      id: 5,
      category: "Sharing",
      question: "How does selective disclosure work?",
      answer:
        "Selective disclosure allows you to share only specific fields from your credentials without revealing other information. Using zero-knowledge proofs, you can prove certain attributes about yourself without exposing the underlying data.",
    },
    {
      id: 6,
      category: "Blockchain",
      question: "Why is Cardano used for this platform?",
      answer:
        "Cardano provides a secure, sustainable, and cost-effective blockchain infrastructure. Its smart contract capabilities through Aiken allow for sophisticated credential management, revocation lists, and verification processes while maintaining low transaction fees.",
    },
    {
      id: 7,
      category: "Costs",
      question: "What are the costs involved?",
      answer:
        "Creating and managing credentials involves minimal Cardano transaction fees (typically under ₳0.20). There are no subscription fees or hidden costs. You only pay for blockchain transactions when creating, updating, or revoking credentials.",
    },
    {
      id: 8,
      category: "Technical",
      question: "What happens if I lose access to my wallet?",
      answer:
        "Your credentials are tied to your Cardano wallet address. If you lose access to your wallet, you'll need to use your wallet's recovery phrase to restore access. We recommend keeping secure backups of your wallet recovery information.",
    },
  ]

  const categories = [...new Set(faqs.map((faq) => faq.category))]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 relative">
      {/* Background Pattern */}
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
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Questions & Answers
              </h1>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-6 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-200 mb-4">How can we help you?</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Find answers to common questions about Verisafe, decentralized identity, and blockchain technology.
            </p>
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800/60 border-slate-600 text-slate-200 focus:border-cyan-500"
              />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <Button
                variant={searchQuery === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchQuery("")}
                className={
                  searchQuery === ""
                    ? "bg-cyan-600 hover:bg-cyan-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-700"
                }
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 cursor-pointer px-3 py-1"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="bg-slate-800/60 border-slate-600 backdrop-blur-sm">
                  <CardHeader
                    className="cursor-pointer hover:bg-slate-700/30 transition-colors"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-cyan-900/30 text-cyan-400 border-cyan-500/30">{faq.category}</Badge>
                        <CardTitle className="text-slate-200 text-left">{faq.question}</CardTitle>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </CardHeader>
                  {expandedFaq === faq.id && (
                    <CardContent className="pt-0">
                      <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                        <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-slate-200 text-xl font-semibold mb-2">No results found</h3>
                <p className="text-slate-400">Try adjusting your search terms or browse all categories.</p>
              </div>
            )}
            {/* Contact Section */}
            <Card className="bg-slate-800/60 border-slate-600 backdrop-blur-sm mt-12">
              <CardHeader>
                <CardTitle className="text-slate-200 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-cyan-400" />
                  Still need help?
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Can't find what you're looking for? Get in touch with our support team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 justify-start bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Support
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 justify-start bg-transparent"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
                <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <p className="text-slate-300 text-sm">
                    <strong>Response Time:</strong> We typically respond within 24 hours during business days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
