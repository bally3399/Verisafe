"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"



// Extend Window interface to include Cardano object
declare global {
  interface Window {
    cardano: any // This will hold the injected wallet objects
  }
}

interface WalletContextType {
  isConnected: boolean
  walletName: string | null
  address: string | null
  balance: number | null
  connectWallet: (walletKey: string) => Promise<void>
  disconnectWallet: () => void
  fetchWalletData: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletName, setWalletName] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  const fetchWalletData = useCallback(async () => {
    console.log("Attempting to fetch wallet data...")
    if (!walletName || typeof window === "undefined" || !window.cardano || !window.cardano[walletName]) {
      console.log("Wallet API not available for fetching data. Disconnecting.")
      setIsConnected(false)
      setAddress(null)
      setBalance(null)
      return
    }

    try {
      const walletApi = await window.cardano[walletName].enable()
      const usedAddresses = await walletApi.getUsedAddresses()
      const balanceLovelace = await walletApi.getBalance()

      // Convert balance from Lovelace to ADA (1 ADA = 1,000,000 Lovelace)
      const balanceAda = Number.parseInt(balanceLovelace, 10) / 1_000_000

      setAddress(usedAddresses[0] || null)
      setBalance(balanceAda)
      setIsConnected(true)
      console.log("Wallet data fetched successfully:", { address: usedAddresses[0], balance: balanceAda })
    } catch (error) {
      console.error("Error fetching wallet data:", error)
      setIsConnected(false)
      setAddress(null)
      setBalance(null)
    }
  }, [walletName])

  const connectWallet = useCallback(
    async (walletKey: string) => {
      console.log(`Attempting to connect to ${walletKey} wallet...`)
      // Reset states at the start of connection attempt
      setIsConnected(false)
      setWalletName(null)
      setAddress(null)
      setBalance(null)

      // if (SIMULATE_V0_PREVIEW) {
      //   // This block will not run if SIMULATE_V0_PREVIEW is false
      //   console.log(`Simulating connection to ${walletKey} wallet for v0 preview...`)
      //   setIsConnected(true)
      //   setWalletName(walletKey)
      //   setAddress(`addr1q9x...${Math.random().toString(36).substring(2, 6)}`) // Dummy address
      //   setBalance(Math.floor(Math.random() * 1000) + 50) // Dummy balance
      //   return // Exit early after simulation
      // }

      // Actual wallet connection logic for local/deployed environments
      if (typeof window === "undefined" || !window.cardano || !window.cardano[walletKey]) {
        const errorMessage = `Cardano wallet extension '${walletKey}' not found. Please install it.`
        console.error(errorMessage)
        // Automatically open the install URL if the wallet is not found
        const walletOption = walletOptions.find((option) => option.cardanoKey === walletKey)
        if (walletOption && walletOption.installUrl) {
          window.open(walletOption.installUrl, "_blank")
        }
        throw new Error(errorMessage) // Re-throw to be caught by the modal
      }

      try {
        console.log(`Enabling wallet API for ${walletKey}...`)
        const walletApi = await window.cardano[walletKey].enable()
        setWalletName(walletKey)
        setIsConnected(true)
        console.log(`${walletKey} wallet enabled. Fetching data...`)
        await fetchWalletData() // Fetch data immediately after connection
        console.log("Wallet connection process completed.")
      } catch (error: any) {
        console.error(`Error enabling wallet ${walletKey}:`, error)
        setIsConnected(false)
        setWalletName(null)
        setAddress(null)
        setBalance(null)
        // CIP-30 error codes:
        // 1: User rejected
        // 2: API not found (should be caught by initial check)
        // 3: Network mismatch
        // 4: Insufficient funds
        // 5: Other error
        let errorMessage = "Failed to connect to wallet."
        if (error.code === 1) {
          errorMessage = "Wallet connection rejected by user."
        } else if (error.message) {
          errorMessage = error.message
        }
        throw new Error(errorMessage) // Re-throw to be caught by the modal
      }
    },
    [fetchWalletData],
  )

  const disconnectWallet = useCallback(() => {
    console.log("Disconnecting wallet...")
    setIsConnected(false)
    setWalletName(null)
    setAddress(null)
    setBalance(null)
    // In a real application, you might want to clear any wallet API instances
  }, [])

  // Effect to handle account changes (e.g., user switches accounts in wallet)
  useEffect(() => {
    if (walletName && typeof window !== "undefined" && window.cardano && window.cardano[walletName]) {
      const walletApi = window.cardano[walletName]
      if (walletApi.onAccountChange) {
        // CIP-30 onAccountChange listener
        const handleAccountChange = () => {
          console.log("Wallet account changed, refetching data...")
          fetchWalletData()
        }
        walletApi.onAccountChange(handleAccountChange)

        // Cleanup function for the listener
        return () => {
          // CIP-30 does not define a standard way to remove specific listeners.
          // In practice, re-registering might overwrite, or relying on component unmount.
          // If a wallet specific API provides a remove method, it should be used here.
          // For now, we acknowledge this limitation.
        }
      }
    }
  }, [walletName, fetchWalletData])

  const value = {
    isConnected,
    walletName,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    fetchWalletData,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Define walletOptions here as well, so it's accessible within useWallet.ts for redirection logic
const walletOptions = [
  { cardanoKey: "nami", installUrl: "https://namiwallet.io/" },
  { cardanoKey: "eternl", installUrl: "https://eternl.io/" },
  { cardanoKey: "flint", installUrl: "https://flintwallet.io/" },
  { cardanoKey: "typhon", installUrl: "https://typhonwallet.io/" },
]
