"use client"
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
  const { connectWallet, isConnecting, error, isConnected } = useWallet()

  const handleConnect = async () => {
    try {
      await connectWallet()
      if (onSuccess) {
        onSuccess()
      }
      onClose()
    } catch (err) {
      // Error is handled by the wallet hook
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
            Connect your Cardano wallet to securely manage your identity credentials
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
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-300 text-sm">Wallet connected successfully!</span>
            </div>
          ) : (
            <>
              <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                <h4 className="text-slate-200 font-medium mb-2">Available Wallets</h4>
                <div className="grid grid-cols-2 gap-2">
                  {walletOptions.map((wallet) => (
                    <Card
                      key={wallet.name}
                      className="bg-slate-700/50 border-slate-600 hover:border-cyan-500/50 transition-colors cursor-pointer"
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
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
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
