"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, HelpCircle } from "lucide-react"

interface QAScreenProps {
  onBack: () => void
}

export default function QAScreen({ onBack }: QAScreenProps) {
  const faqs = [
    {
      question: "What is Verisafe?",
      answer:
        "Verisafe is the world's first zero-knowledge identity platform, powered by Walrus decentralized storage and Cardano smart contracts. It allows users to create, manage, and share verifiable credentials with enhanced privacy.",
    },
    {
      question: "How does zero-knowledge work?",
      answer:
        "Zero-knowledge proofs allow you to prove that you know a piece of information (e.g., your age is over 18) without revealing the actual information itself (your exact birth date). This ensures maximum privacy during verification.",
    },
    {
      question: "What is a verifiable credential?",
      answer:
        "A verifiable credential is a digital credential that is cryptographically secure and tamper-proof. It allows individuals to prove claims about themselves (e.g., their identity, qualifications) in a privacy-preserving manner.",
    },
    {
      question: "Which Cardano wallets are supported?",
      answer:
        "Verisafe supports popular Cardano wallets that adhere to the CIP-30 standard, including Nami, Eternl, Flint, and Typhon. More wallets will be integrated in the future.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, your data is secured with military-grade encryption and stored on Walrus decentralized storage, ensuring high levels of security and GDPR compliance. You retain full sovereignty over your data.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-slate-800/60 border-slate-700 text-slate-200 backdrop-blur-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-cyan-400">
            <HelpCircle className="h-6 w-6 mr-2" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-slate-400">Find answers to common questions about Verisafe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-slate-700">
                <AccordionTrigger className="text-slate-200 hover:no-underline hover:text-cyan-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex justify-start">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
