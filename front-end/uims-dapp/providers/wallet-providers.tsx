"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

interface WalletContextType {
  isConnected: boolean
  walletName: string | null
  address: string | null
  balance: string | null
  connectWallet: (walletKey: string) => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletName, setWalletName] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  // Function to convert hex address to bech32 (simplified, requires a library like @emurgo/cardano-serialization-lib-asmjs for full conversion)
  // For now, we'll just use the raw hex or a truncated version.
  const hexToBech32 = (hex: string) => {
    // This is a placeholder. Real conversion requires a library.
    // For demonstration, we'll just return the hex.
    return hex
  }

  const connectWallet = useCallback(async (walletKey: string) => {
    if (typeof window === "undefined" || !window.cardano || !window.cardano[walletKey]) {
      throw new Error(`Cardano wallet extension for ${walletKey} not found.`)
    }

    try {
      const api = await window.cardano[walletKey].enable()
      const usedAddresses = await api.getUsedAddresses()
      const walletBalance = await api.getBalance()

      if (usedAddresses.length > 0) {
        setAddress(hexToBech32(usedAddresses[0])) // Use the first address
      } else {
        setAddress("No address found")
      }

      // Basic balance conversion (assuming ADA in lovelaces)
      // This is a very simplified conversion. Real dApps would use BigInt and proper unit conversion.
      const lovelaces = Number.parseInt(walletBalance, 16) // Assuming balance is hex-encoded lovelaces
      setBalance(`${(lovelaces / 1_000_000).toFixed(2)} ADA`)

      setIsConnected(true)
      setWalletName(walletKey.charAt(0).toUpperCase() + walletKey.slice(1)) // Capitalize wallet name
      console.log(`Connected to ${walletKey} wallet.`)
    } catch (error: any) {
      console.error("Error connecting to wallet:", error)
      setIsConnected(false)
      setWalletName(null)
      setAddress(null)
      setBalance(null)
      throw new Error(`Connection failed: ${error.info || error.message || "Unknown error"}`)
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setIsConnected(false)
    setWalletName(null)
    setAddress(null)
    setBalance(null)
    console.log("Wallet disconnected.")
  }, [])

  // Check initial connection status (e.g., if user was already connected)
  useEffect(() => {
    const checkInitialConnection = async () => {
      if (typeof window !== "undefined" && window.cardano) {
        for (const walletKey in window.cardano) {
          if (window.cardano[walletKey] && window.cardano[walletKey].isEnabled) {
            try {
              const api = await window.cardano[walletKey].enable() // Re-enable to get API
              const usedAddresses = await api.getUsedAddresses()
              const walletBalance = await api.getBalance()

              if (usedAddresses.length > 0) {
                setAddress(hexToBech32(usedAddresses[0]))
              }
              const lovelaces = Number.parseInt(walletBalance, 16)
              setBalance(`${(lovelaces / 1_000_000).toFixed(2)} ADA`)

              setIsConnected(true)
              setWalletName(walletKey.charAt(0).toUpperCase() + walletKey.slice(1))
              console.log(`Initially connected to ${walletKey} wallet.`)
              return // Found a connected wallet, stop checking
            } catch (error) {
              console.warn(`Could not re-enable ${walletKey}:`, error)
            }
          }
        }
      }
    }
    checkInitialConnection()
  }, [connectWallet]) // Dependency on connectWallet to ensure it's stable

  const value = React.useMemo(
    () => ({
      isConnected,
      walletName,
      address,
      balance,
      connectWallet,
      disconnectWallet,
    }),
    [isConnected, walletName, address, balance, connectWallet, disconnectWallet],
  )

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Extend Window interface for Cardano wallets
declare global {
  interface Window {
    cardano: {
      [key: string]: {
        enable: () => Promise<any> // Returns the wallet API object
        isEnabled: boolean
        name: string
        icon: string
        version: string
      }
    }
  }
}
