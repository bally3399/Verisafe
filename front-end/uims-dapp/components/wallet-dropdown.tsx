// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Wallet, LogOut, Copy } from "lucide-react"
// import { useWallet } from "@/hooks/useWallet"
// import { useState } from "react"

// export default function WalletDropdown() {
//   const { isConnected, address, balance, walletName, disconnectWallet } = useWallet()
//   const [copySuccess, setCopySuccess] = useState(false)

//   const handleCopyAddress = () => {
//     if (address) {
//       navigator.clipboard.writeText(address)
//       setCopySuccess(true)
//       setTimeout(() => setCopySuccess(false), 2000) // Reset after 2 seconds
//     }
//   }

//   if (!isConnected) {
//     return null // Or render a "Connect Wallet" button if preferred here
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
//         >
//           <Wallet className="h-4 w-4 mr-2" />
//           {walletName || "Wallet"} Connected
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-slate-200">
//         <DropdownMenuLabel className="text-cyan-400">{walletName || "Connected Wallet"}</DropdownMenuLabel>
//         <DropdownMenuSeparator className="bg-slate-700" />
//         <DropdownMenuItem className="flex items-center justify-between">
//           <span>Address:</span>
//           <span className="text-slate-400 text-xs">
//             {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : "N/A"}
//           </span>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-6 w-6 text-slate-400 hover:bg-slate-700 hover:text-white"
//             onClick={handleCopyAddress}
//             title="Copy Address"
//           >
//             <Copy className="h-3 w-3" />
//             <span className="sr-only">Copy Address</span>
//           </Button>
//         </DropdownMenuItem>
//         {copySuccess && (
//           <DropdownMenuItem className="text-green-400 text-xs" disabled>
//             Address Copied!
//           </DropdownMenuItem>
//         )}
//         <DropdownMenuItem>
//           <span>Balance:</span>
//           <span className="text-slate-400">{balance || "N/A"}</span>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator className="bg-slate-700" />
//         <DropdownMenuItem onClick={disconnectWallet} className="text-red-400 hover:bg-red-900/20 cursor-pointer">
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
