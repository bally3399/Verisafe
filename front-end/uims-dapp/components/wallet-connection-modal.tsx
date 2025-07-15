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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Loader2, AlertCircle, CheckCircle, ExternalLink } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function WalletConnectionModal({ isOpen, onClose, onSuccess }: WalletConnectionModalProps) {
  const {
    isConnected,
    connectWallet,
    error,
    setError,
    walletName: connectedWalletName,
    setSimulatedConnectionStatus,
  } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSelectedWallet(null)
      setIsConnecting(false)
      setError(null) // Clear error when modal opens
    }
  }, [isOpen, setError])

  useEffect(() => {
    if (isOpen && isConnected && !isConnecting) {
      if (onSuccess) {
        onSuccess()
      }
      // Give a brief moment for the user to see the success message before closing
      setTimeout(() => {
        onClose()
      }, 1500)
    }
  }, [isOpen, isConnected, isConnecting, onSuccess, onClose])

  const handleConnect = async () => {
    if (!selectedWallet) {
      setError("Please select a wallet first.")
      return
    }
    setIsConnecting(true)
    setError(null) // Clear error before new connection attempt

    // Check if window.cardano and the specific wallet are available (i.e., not in v0 preview)
    const isWalletAvailableInBrowser =
      typeof window !== "undefined" && window.cardano && window.cardano[selectedWallet.toLowerCase()]

    if (!isWalletAvailableInBrowser) {
      // Simulate connection success for the v0 preview environment
      console.log("Simulating wallet connection for preview environment...")
      setSimulatedConnectionStatus(true, selectedWallet)
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        }
        setIsConnecting(false) // End connecting state after simulation
      }, 1500) // Simulate a short delay for connection
      return
    }

    // Actual wallet connection logic for local environment
    try {
      await connectWallet(selectedWallet.toLowerCase(), selectedWallet)
    } catch (err) {
      // This catch block is primarily for errors that prevent the `connectWallet` from even starting,
      // or if `connectWallet` itself throws before setting its internal error state.
      // The `useWallet` hook now handles most specific error messages internally.
      console.error("Unexpected error during wallet connection attempt:", err)
      setError("An unexpected error occurred during connection. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const walletOptions = [
    {
      name: "Nami",
      icon: "🦎",
      description: "Light wallet for Cardano",
      url: "https://namiwallet.io/",
    },
    {
      name: "Eternl",
      icon: "♾️",
      description: "Feature-rich Cardano wallet",
      url: "https://eternl.io/",
    },
    {
      name: "Flint",
      icon: "🔥",
      description: "Simple and secure wallet",
      url: "https://flint-wallet.com/",
    },
    {
      name: "Typhon",
      icon: "🌊",
      description: "Advanced Cardano wallet",
      url: "https://typhonwallet.io/",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-200 flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-cyan-400" />
            Connect Cardano Wallet
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Connect your Cardano wallet to securely manage your identity credentials.
            <br />
            <span className="text-sm text-yellow-400">
              (Note: Direct wallet connection is not possible in this preview environment. This simulates the flow.)
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}
          {isConnected ? (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-green-300 text-sm">{connectedWalletName} wallet connected successfully!</span>
            </div>
          ) : (
            <>
              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                <h4 className="text-slate-200 font-medium mb-2">Available Wallets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {walletOptions.map((wallet) => (
                    <Card
                      key={wallet.name}
                      className={`bg-slate-700/50 border-slate-600 hover:border-cyan-500/50 transition-colors cursor-pointer ${selectedWallet === wallet.name ? "border-cyan-500 bg-cyan-500/10" : ""}`}
                      onClick={() => setSelectedWallet(wallet.name)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="text-2xl mb-1">{wallet.icon}</div>
                        <div className="text-slate-200 text-sm font-medium">{wallet.name}</div>
                        <div className="text-slate-400 text-xs">{wallet.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting || !selectedWallet}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      {selectedWallet ? `Connect ${selectedWallet}` : "Select a Wallet"}
                    </>
                  )}
                </Button>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-2">Don't have a Cardano wallet?</p>
                <div className="flex justify-center space-x-2">
                  {walletOptions.slice(0, 2).map((wallet) => (
                    <Button
                      key={wallet.name}
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      onClick={() => window.open(wallet.url, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Get {wallet.name}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
