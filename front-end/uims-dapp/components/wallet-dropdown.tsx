// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Badge } from "@/components/ui/badge"
// import { ChevronDown, Copy, ExternalLink, LogOut, Wallet, Check } from "lucide-react"
// import { useWallet } from "@/hooks/useWallet"
// export default function WalletDropdown() {
//   const { isConnected, address, balance, walletName, disconnectWallet } = useWallet()
//   const [copied, setCopied] = useState(false)
//   const copyAddress = async () => {
//     if (address) {
//       await navigator.clipboard.writeText(address)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     }
//   }
//   const openExplorer = () => {
//     if (address) {
//       // Open Cardano explorer - using CardanoScan as example
//       window.open(`https://cardanoscan.io/address/${address}`, "_blank")
//     }
//   }
//   if (!isConnected) {
//     return null
//   }
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-slate-800/60 backdrop-blur-sm"
//         >
//           <div className="flex items-center space-x-2">
//             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             <Wallet className="h-4 w-4" />
//             <div className="hidden sm:block">
//               <div className="text-sm font-medium">{walletName}</div>
//               <div className="text-xs text-slate-400">
//                 {address?.slice(0, 6)}...{address?.slice(-4)}
//               </div>
//             </div>
//             <ChevronDown className="h-4 w-4" />
//           </div>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-80 bg-slate-800 border-slate-600" align="end">
//         <div className="p-4">
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="font-medium text-slate-200">{walletName}</span>
//             </div>
//             <Badge className="bg-green-900/30 text-green-400 border-green-500/30">Connected</Badge>
//           </div>
//           <div className="space-y-3">
//             <div>
//               <div className="text-xs text-slate-400 mb-1">Wallet Address</div>
//               <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
//                 <div className="flex items-center justify-between">
//                   <code className="text-sm text-slate-300 break-all flex-1 mr-2">{address}</code>
//                   <Button onClick={copyAddress} size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-600">
//                     {copied ? (
//                       <Check className="h-4 w-4 text-green-400" />
//                     ) : (
//                       <Copy className="h-4 w-4 text-slate-400" />
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//             {balance && (
//               <div>
//                 <div className="text-xs text-slate-400 mb-1">Balance</div>
//                 <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
//                   <div className="text-lg font-semibold text-slate-200">{balance}</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <DropdownMenuSeparator className="bg-slate-600" />
//         <DropdownMenuItem onClick={openExplorer} className="text-slate-300 hover:bg-slate-700 cursor-pointer">
//           <ExternalLink className="h-4 w-4 mr-2" />
//           View on Explorer
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={copyAddress} className="text-slate-300 hover:bg-slate-700 cursor-pointer">
//           {copied ? (
//             <>
//               <Check className="h-4 w-4 mr-2 text-green-400" />
//               Address Copied!
//             </>
//           ) : (
//             <>
//               <Copy className="h-4 w-4 mr-2" />
//               Copy Address
//             </>
//           )}
//         </DropdownMenuItem>
//         <DropdownMenuSeparator className="bg-slate-600" />
//         <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 hover:bg-red-500/10 cursor-pointer">
//           <LogOut className="h-4 w-4 mr-2" />
//           Disconnect Wallet
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, Copy } from "lucide-react"
import { useWallet } from "@/hooks/useWallet"
import { useState } from "react"

export default function WalletDropdown() {
  const { isConnected, address, balance, walletName, disconnectWallet } = useWallet()
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000) // Reset after 2 seconds
    }
  }

  if (!isConnected) {
    return null // Or render a "Connect Wallet" button if preferred here
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
        >
          <Wallet className="h-4 w-4 mr-2" />
          {walletName || "Wallet"} Connected
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-slate-200">
        <DropdownMenuLabel className="text-cyan-400">{walletName || "Connected Wallet"}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="flex items-center justify-between">
          <span>Address:</span>
          <span className="text-slate-400 text-xs">
            {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "N/A"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-slate-400 hover:bg-slate-700 hover:text-white"
            onClick={handleCopyAddress}
            title="Copy Address"
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy Address</span>
          </Button>
        </DropdownMenuItem>
        {copySuccess && (
          <DropdownMenuItem className="text-green-400 text-xs" disabled>
            Address Copied!
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <span>Balance:</span>
          <span className="text-slate-400">{balance || "N/A"}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 hover:bg-red-900/20 cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect Wallet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

