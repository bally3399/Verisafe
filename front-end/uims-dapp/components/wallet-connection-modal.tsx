// // "use client"

// // import { useState } from "react"
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent } from "@/components/ui/card"
// // import { Wallet, Loader2, AlertCircle, CheckCircle, ExternalLink } from "lucide-react"

// // interface WalletConnectionModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   onSuccess?: () => void
// // }

// // export default function WalletConnectionModal({ isOpen, onClose, onSuccess }: WalletConnectionModalProps) {
// //   const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
// //   const [isConnecting, setIsConnecting] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const [isConnected, setIsConnected] = useState(false)

// //   const handleConnect = async () => {
// //     if (!selectedWallet) {
// //       setError("Please select a wallet first")
// //       return
// //     }

// //     setIsConnecting(true)
// //     setError(null)

// //     try {
// //       // Check if wallet is installed
// //       const walletKey = selectedWallet.toLowerCase()
// //       const isWalletInstalled = window.cardano && window.cardano[walletKey]

// //       if (isWalletInstalled) {
// //         await window.cardano[walletKey].enable()
// //         setIsConnected(true)
// //         if (onSuccess) {
// //           onSuccess()
// //         }
// //         setTimeout(() => {
// //           onClose()
// //         }, 1500)
// //       } else {
// //         // Wallet not installed, redirect to download page
// //         const wallet = walletOptions.find((w) => w.name === selectedWallet)
// //         if (wallet) {
// //           window.open(wallet.url, "_blank")
// //         }
// //       }
// //     } catch (err) {
// //       // If connection fails, redirect to wallet URL
// //       const wallet = walletOptions.find((w) => w.name === selectedWallet)
// //       if (wallet) {
// //         window.open(wallet.url, "_blank")
// //       }
// //     } finally {
// //       setIsConnecting(false)
// //     }
// //   }

// //   const walletOptions = [
// //     {
// //       name: "Nami",
// //       icon: "🦎",
// //       description: "Light wallet for Cardano",
// //       url: "https://namiwallet.io/",
// //     },
// //     {
// //       name: "Eternl",
// //       icon: "♾️",
// //       description: "Feature-rich Cardano wallet",
// //       url: "https://eternl.io/",
// //     },
// //     {
// //       name: "Flint",
// //       icon: "🔥",
// //       description: "Simple and secure wallet",
// //       url: "https://flint-wallet.com/",
// //     },
// //     {
// //       name: "Typhon",
// //       icon: "🌊",
// //       description: "Advanced Cardano wallet",
// //       url: "https://typhonwallet.io/",
// //     },
// //   ]

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
// //         <DialogHeader>
// //           <DialogTitle className="text-slate-200 flex items-center">
// //             <Wallet className="h-5 w-5 mr-2 text-cyan-400" />
// //             Connect Cardano Wallet
// //           </DialogTitle>
// //           <DialogDescription className="text-slate-400">
// //             Connect your Cardano wallet to securely manage your identity credentials
// //           </DialogDescription>
// //         </DialogHeader>
// //         <div className="space-y-4">
// //           {error && (
// //             <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center">
// //               <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
// //               <span className="text-red-300 text-sm">{error}</span>
// //             </div>
// //           )}
// //           {isConnected ? (
// //             <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center">
// //               <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
// //               <span className="text-green-300 text-sm">{selectedWallet} wallet connected successfully!</span>
// //             </div>
// //           ) : (
// //             <>
// //               <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
// //                 <h4 className="text-slate-200 font-medium mb-2">Available Wallets</h4>
// //                 <div className="grid grid-cols-2 gap-2">
// //                   {walletOptions.map((wallet) => (
// //                     <Card
// //                       key={wallet.name}
// //                       className={`bg-slate-700/50 border-slate-600 hover:border-cyan-500/50 transition-colors cursor-pointer ${
// //                         selectedWallet === wallet.name ? "border-cyan-500 bg-cyan-500/10" : ""
// //                       }`}
// //                       onClick={() => setSelectedWallet(wallet.name)}
// //                     >
// //                       <CardContent className="p-3 text-center">
// //                         <div className="text-2xl mb-1">{wallet.icon}</div>
// //                         <div className="text-slate-200 text-sm font-medium">{wallet.name}</div>
// //                         <div className="text-slate-400 text-xs">{wallet.description}</div>
// //                       </CardContent>
// //                     </Card>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div className="text-center">
// //                 <Button
// //                   onClick={handleConnect}
// //                   disabled={isConnecting || !selectedWallet}
// //                   className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50"
// //                 >
// //                   {isConnecting ? (
// //                     <>
// //                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
// //                       Connecting...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Wallet className="h-4 w-4 mr-2" />
// //                       {selectedWallet ? `Connect ${selectedWallet}` : "Select a Wallet"}
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //               <div className="text-center">
// //                 <p className="text-slate-400 text-sm mb-2">Don't have a Cardano wallet?</p>
// //                 <div className="flex justify-center space-x-2">
// //                   {walletOptions.slice(0, 2).map((wallet) => (
// //                     <Button
// //                       key={wallet.name}
// //                       variant="outline"
// //                       size="sm"
// //                       className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
// //                       onClick={() => window.open(wallet.url, "_blank")}
// //                     >
// //                       <ExternalLink className="h-3 w-3 mr-1" />
// //                       Get {wallet.name}
// //                     </Button>
// //                   ))}
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }
// "use client"

// import { useState } from "react"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Wallet, Loader2, AlertCircle, CheckCircle, ExternalLink } from "lucide-react"

// interface WalletConnectionModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSuccess?: () => void
// }

// export default function WalletConnectionModal({ isOpen, onClose, onSuccess }: WalletConnectionModalProps) {
//   const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
//   const [isConnecting, setIsConnecting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [isConnected, setIsConnected] = useState(false)

//   const handleConnect = async () => {
//     if (!selectedWallet) {
//       setError("Please select a wallet first")
//       return
//     }

//     setIsConnecting(true)
//     setError(null)

//     try {
//       // Check if wallet is installed
//       const walletKey = selectedWallet.toLowerCase()
//       const isWalletInstalled = window.cardano && window.cardano[walletKey]

//       if (isWalletInstalled) {
//         await window.cardano[walletKey].enable()
//         setIsConnected(true)
//         if (onSuccess) {
//           onSuccess()
//         }
//         setTimeout(() => {
//           onClose()
//         }, 1500)
//       } else {
//         // Wallet not installed, redirect to download page
//         const wallet = walletOptions.find((w) => w.name === selectedWallet)
//         if (wallet) {
//           window.open(wallet.url, "_blank")
//         }
//       }
//     } catch (err) {
//       // If connection fails, redirect to wallet URL
//       const wallet = walletOptions.find((w) => w.name === selectedWallet)
//       if (wallet) {
//         window.open(wallet.url, "_blank")
//       }
//     } finally {
//       setIsConnecting(false)
//     }
//   }

//   const walletOptions = [
//     {
//       name: "Nami",
//       icon: "🦎",
//       description: "Light wallet for Cardano",
//       url: "https://namiwallet.io/",
//     },
//     {
//       name: "Eternl",
//       icon: "♾️",
//       description: "Feature-rich Cardano wallet",
//       url: "https://eternl.io/",
//     },
//     {
//       name: "Flint",
//       icon: "🔥",
//       description: "Simple and secure wallet",
//       url: "https://flint-wallet.com/",
//     },
//     {
//       name: "Typhon",
//       icon: "🌊",
//       description: "Advanced Cardano wallet",
//       url: "https://typhonwallet.io/",
//     },
//   ]

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
//         <DialogHeader>
//           <DialogTitle className="text-slate-200 flex items-center">
//             <Wallet className="h-5 w-5 mr-2 text-cyan-400" />
//             Connect Cardano Wallet
//           </DialogTitle>
//           <DialogDescription className="text-slate-400">
//             Connect your Cardano wallet to securely manage your identity credentials
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4">
//           {error && (
//             <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center">
//               <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
//               <span className="text-red-300 text-sm">{error}</span>
//             </div>
//           )}
//           {isConnected ? (
//             <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center">
//               <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
//               <span className="text-green-300 text-sm">{selectedWallet} wallet connected successfully!</span>
//             </div>
//           ) : (
//             <>
//               <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
//                 <h4 className="text-slate-200 font-medium mb-2">Available Wallets</h4>
//                 <div className="grid grid-cols-2 gap-2">
//                   {walletOptions.map((wallet) => (
//                     <Card
//                       key={wallet.name}
//                       className={`bg-slate-700/50 border-slate-600 hover:border-cyan-500/50 transition-colors cursor-pointer ${
//                         selectedWallet === wallet.name ? "border-cyan-500 bg-cyan-500/10" : ""
//                       }`}
//                       onClick={() => setSelectedWallet(wallet.name)}
//                     >
//                       <CardContent className="p-3 text-center">
//                         <div className="text-2xl mb-1">{wallet.icon}</div>
//                         <div className="text-slate-200 text-sm font-medium">{wallet.name}</div>
//                         <div className="text-slate-400 text-xs">{wallet.description}</div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//               <div className="text-center">
//                 <Button
//                   onClick={handleConnect}
//                   disabled={isConnecting || !selectedWallet}
//                   className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50"
//                 >
//                   {isConnecting ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Connecting...
//                     </>
//                   ) : (
//                     <>
//                       <Wallet className="h-4 w-4 mr-2" />
//                       {selectedWallet ? `Connect ${selectedWallet}` : "Select a Wallet"}
//                     </>
//                   )}
//                 </Button>
//               </div>
//               <div className="text-center">
//                 <p className="text-slate-400 text-sm mb-2">Don't have a Cardano wallet?</p>
//                 <div className="flex justify-center space-x-2">
//                   {walletOptions.slice(0, 2).map((wallet) => (
//                     <Button
//                       key={wallet.name}
//                       variant="outline"
//                       size="sm"
//                       className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
//                       onClick={() => window.open(wallet.url, "_blank")}
//                     >
//                       <ExternalLink className="h-3 w-3 mr-1" />
//                       Get {wallet.name}
//                     </Button>
//                   ))}
//                 </div>
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
import { Wallet, AlertCircle, ExternalLink, Loader2, XCircle, CheckCircle } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"
import Image from "next/image"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
  installUrl: string
  cardanoKey: string // Key to check in window.cardano
}

const walletOptions: WalletOption[] = [
  {
    id: "nami",
    name: "Nami",
    icon: "🦎", // Replace with actual Nami icon
    description: "Light wallet for Cardano",
    installUrl: "https://namiwallet.io/",
    cardanoKey: "nami",
  },
  {
    id: "eternl",
    name: "Eternl",
    icon: "♾️", // Replace with actual Eternl icon
    description: "Feature-rich Cardano wallet",
    installUrl: "https://eternl.io/",
    cardanoKey: "eternl",
  },
  {
    id: "flint",
    name: "Flint",
    icon: "🔥", // Replace with actual Flint icon
    description: "Simple and secure wallet",
    installUrl: "https://flintwallet.io/",
    cardanoKey: "flint",
  },
  {
    id: "typhon",
    name: "Typhon",
    icon: "🌊", // Replace with actual Typhon icon
    description: "Advanced Cardano wallet",
    installUrl: "https://typhonwallet.io/",
    cardanoKey: "typhon",
  },
]

export default function WalletConnectionModal({ isOpen, onClose, onSuccess }: WalletConnectionModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(null)
  const [loading, setLoading] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null) // Renamed to avoid conflict with useWallet's error
  const { connectWallet, isConnected, walletName } = useWallet()

  useEffect(() => {
    if (isOpen) {
      setSelectedWallet(null)
      setLoading(false)
      setConnectionError(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && isConnected && walletName === selectedWallet?.name) {
      // Only close if the currently connected wallet matches the one selected in the modal
      setTimeout(() => {
        onSuccess()
      }, 1000) // Give a brief moment for the user to see the success message
    }
  }, [isOpen, isConnected, walletName, selectedWallet, onSuccess])

  const handleConnect = async () => {
    if (!selectedWallet) {
      setConnectionError("Please select a wallet to connect.")
      return
    }

    setLoading(true)
    setConnectionError(null)

    try {
      await connectWallet(selectedWallet.cardanoKey)
      // If connectWallet succeeds, the useEffect above will handle onSuccess and closing
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
          <div className="bg-amber-900/20 border border-amber-500/30 text-amber-300 p-2 rounded-md text-sm flex items-center space-x-2 mt-2">
            <AlertCircle className="h-4 w-4" />
            {/* <span>
              (Note: In v0 preview, this simulates the flow. For real connection, ensure wallet is installed locally.)
            </span> */}
          </div>
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
              <CheckCircle className="h-5 w-5" />
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
                      <Image
                        src={wallet.icon || "/placeholder.svg"}
                        alt={wallet.name}
                        width={40}
                        height={40}
                        className="mb-2"
                      />
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
