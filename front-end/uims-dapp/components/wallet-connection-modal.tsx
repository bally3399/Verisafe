// "use client"
// import { useState, useEffect } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Wallet, ExternalLink, Loader2, XCircle, CheckCircle } from "lucide-react"
// import { useWallet } from "@/hooks/useWallet"


// interface WalletConnectionModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSuccess: () => void
// }

// interface WalletOption {
//   id: string
//   name: string
//   icon: string // This will now hold the emoji string
//   description: string
//   installUrl: string
//   cardanoKey: string // Key to check in window.cardano
// }

// const walletOptions: WalletOption[] = [
//   {
//     id: "nami",
//     name: "Nami",
//     icon: "🦎", // Using emoji directly
//     description: "Light wallet for Cardano",
//     installUrl: "https://namiwallet.io/",
//     cardanoKey: "nami",
//   },
//   {
//     id: "eternl",
//     name: "Eternl",
//     icon: "♾️", // Using emoji directly
//     description: "Feature-rich Cardano wallet",
//     installUrl: "https://eternl.io/",
//     cardanoKey: "eternl",
//   },
//   {
//     id: "flint",
//     name: "Flint",
//     icon: "🔥", // Using emoji directly
//     description: "Simple and secure wallet",
//     installUrl: "https://flintwallet.io/",
//     cardanoKey: "flint",
//   },
//   {
//     id: "typhon",
//     name: "Typhon",
//     icon: "🌊", // Using emoji directly
//     description: "Advanced Cardano wallet",
//     installUrl: "https://typhonwallet.io/",
//     cardanoKey: "typhon",
//   },
// ]

// export default function WalletConnectionModal({ isOpen, onClose, onSuccess }: WalletConnectionModalProps) {
//   const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [connectionError, setConnectionError] = useState<string | null>(null)
//   const { connectWallet, isConnected, walletName } = useWallet()

//   useEffect(() => {
//     if (isOpen) {
//       setSelectedWallet(null)
//       setLoading(false)
//       setConnectionError(null)
//     }
//   }, [isOpen])

//   useEffect(() => {
//     if (isOpen && isConnected && walletName === selectedWallet?.name) {
//       setTimeout(() => {
//         onSuccess()
//       }, 1000)
//     }
//   }, [isOpen, isConnected, walletName, selectedWallet, onSuccess])

//   const handleConnect = async () => {
//     if (!selectedWallet) {
//       setConnectionError("Please select a wallet to connect.")
//       return
//     }

//     setLoading(true)
//     setConnectionError(null)

//     try {
//       await connectWallet(selectedWallet.cardanoKey)
//       // If connectWallet succeeds, the useEffect above will handle onSuccess and closing
//     } catch (err: any) {
//       console.error("Wallet connection failed:", err)
//       setConnectionError(err.message || "Failed to connect to wallet. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-slate-200">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold flex items-center">
//             <Wallet className="h-6 w-6 mr-2 text-cyan-400" /> Connect Cardano Wallet
//           </DialogTitle>
//           <DialogDescription className="text-slate-400">
//             Connect your Cardano wallet to securely manage your identity credentials.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           {connectionError && (
//             <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-md flex items-center space-x-2">
//               <XCircle className="h-5 w-5" />
//               <span>{connectionError}</span>
//             </div>
//           )}
//           {isConnected && walletName === selectedWallet?.name && !loading ? (
//             <div className="bg-green-900/20 border border-green-500/30 text-green-300 p-3 rounded-md flex items-center space-x-2">
//               <CheckCircle className="h-5 w-5 mr-2" />
//               <span>{walletName} wallet connected successfully!</span>
//             </div>
//           ) : (
//             <>
//               <h3 className="text-lg font-semibold text-slate-300">Available Wallets</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {walletOptions.map((wallet) => (
//                   <Card
//                     key={wallet.id}
//                     className={`cursor-pointer bg-slate-800/50 border ${selectedWallet?.id === wallet.id ? "border-cyan-500 ring-2 ring-cyan-500" : "border-slate-700"} hover:border-cyan-500 transition-all duration-200`}
//                     onClick={() => setSelectedWallet(wallet)}
//                   >
//                     <CardContent className="flex flex-col items-center justify-center p-4 text-center">
//                       {/* Render emoji directly in a span */}
//                       <span className="text-4xl mb-2">{wallet.icon}</span>
//                       <span className="font-medium text-slate-200">{wallet.name}</span>
//                       <p className="text-xs text-slate-400">{wallet.description}</p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//               <Button
//                 onClick={handleConnect}
//                 disabled={!selectedWallet || loading}
//                 className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Connecting...
//                   </>
//                 ) : (
//                   <>
//                     <Wallet className="h-5 w-5 mr-2" /> Connect {selectedWallet?.name || "Wallet"}
//                   </>
//                 )}
//               </Button>
//               <div className="text-center text-slate-400 text-sm mt-2">Don't have a Cardano wallet?</div>
//               <div className="flex justify-center gap-4">
//                 <Button variant="link" className="text-cyan-400 hover:text-cyan-300" asChild>
//                   <a href="https://namiwallet.io/" target="_blank" rel="noopener noreferrer">
//                     <ExternalLink className="h-4 w-4 mr-1" /> Get Nami
//                   </a>
//                 </Button>
//                 <Button variant="link" className="text-cyan-400 hover:text-cyan-300" asChild>
//                   <a href="https://eternl.io/" target="_blank" rel="noopener noreferrer">
//                     <ExternalLink className="h-4 w-4 mr-1" /> Get Eternl
//                   </a>
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

  
"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ExternalLink, Loader2, XCircle, CheckCircle } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface WalletOption {
  id: string
  name: string
  icon: string // This will now hold the emoji string
  description: string
  installUrl: string
  cardanoKey: string // Key to check in window.cardano
}

const walletOptions: WalletOption[] = [
  {
    id: "nami",
    name: "Nami",
    icon: "🦎", // Using emoji directly
    description: "Light wallet for Cardano",
    installUrl: "https://namiwallet.io/",
    cardanoKey: "nami",
  },
  {
    id: "eternl",
    name: "Eternl",
    icon: "♾️", // Using emoji directly
    description: "Feature-rich Cardano wallet",
    installUrl: "https://eternl.io/",
    cardanoKey: "eternl",
  },
  {
    id: "flint",
    name: "Flint",
    icon: "🔥", // Using emoji directly
    description: "Simple and secure wallet",
    installUrl: "https://flintwallet.io/",
    cardanoKey: "flint",
  },
  {
    id: "typhon",
    name: "Typhon",
    icon: "🌊", // Using emoji directly
    description: "Advanced Cardano wallet",
    installUrl: "https://typhonwallet.io/",
    cardanoKey: "typhon",
  },
]

export default function WalletConnectionModal({ isOpen, onClose, onSuccess }: WalletConnectionModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null)
  const [loading, setLoading] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const { connectWallet, isConnected, walletName } = useWallet()

  useEffect(() => {
    if (isOpen) {
      setSelectedWallet(null)
      setLoading(false)
      setConnectionError(null)
    }
  }, [isOpen])

  // This useEffect will now trigger onSuccess immediately upon successful connection
  useEffect(() => {
    if (isOpen && isConnected && walletName === selectedWallet?.name) {
      // Add a small delay to allow the user to see the success message
      setTimeout(() => {
        onSuccess()
      }, 1500) // Delay for 1.5 seconds
    }
  }, [isOpen, isConnected, walletName, selectedWallet, onSuccess]) // Dependencies ensure it re-runs when these change

  const handleConnect = async () => {
    if (!selectedWallet) {
      setConnectionError("Please select a wallet to connect.")
      return
    }
    setLoading(true)
    setConnectionError(null)
    try {
      await connectWallet(selectedWallet.cardanoKey)
      // onSuccess will be called by the useEffect above
    } catch (err: any) {
      console.error("Wallet connection failed:", err)
      setConnectionError(err.message || "Failed to connect to wallet. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-700 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <Wallet className="h-6 w-6 mr-2 text-cyan-400" /> Connect Cardano Wallet
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Connect your Cardano wallet to securely manage your identity credentials.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {connectionError && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-md flex items-center space-x-2">
              <XCircle className="h-5 w-5" />
              <span>{connectionError}</span>
            </div>
          )}
          {isConnected && walletName === selectedWallet?.name && !loading ? (
            <div className="bg-green-900/20 border border-green-500/30 text-green-300 p-3 rounded-md flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{walletName} wallet connected successfully!</span>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-300">Available Wallets</h3>
              <div className="grid grid-cols-2 gap-4">
                {walletOptions.map((wallet) => (
                  <Card
                    key={wallet.id}
                    className={`cursor-pointer bg-slate-800/50 border ${selectedWallet?.id === wallet.id ? "border-cyan-500 ring-2 ring-cyan-500" : "border-slate-700"} hover:border-cyan-500 transition-all duration-200`}
                    onClick={() => setSelectedWallet(wallet)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                      {/* Render emoji directly in a span */}
                      <span className="text-4xl mb-2">{wallet.icon}</span>
                      <span className="font-medium text-slate-200">{wallet.name}</span>
                      <p className="text-xs text-slate-400">{wallet.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                onClick={handleConnect}
                disabled={!selectedWallet || loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="h-5 w-5 mr-2" /> Connect {selectedWallet?.name || "Wallet"}
                  </>
                )}
              </Button>
              <div className="text-center text-slate-400 text-sm mt-2">Don't have a Cardano wallet?</div>
              <div className="flex justify-center gap-4">
                <Button variant="link" className="text-cyan-400 hover:text-cyan-300" asChild>
                  <a href="https://namiwallet.io/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" /> Get Nami
                  </a>
                </Button>
                <Button variant="link" className="text-cyan-400 hover:text-cyan-300" asChild>
                  <a href="https://eternl.io/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" /> Get Eternl
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

