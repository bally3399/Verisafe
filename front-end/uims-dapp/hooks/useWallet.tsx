"use client"

import { useState, createContext, useContext, type ReactNode } from "react"

type WalletContextType = {
  isConnected: boolean
  address: string | null
  balance: string | null
  walletName: string | null
  error: string | null
  connectWallet: (walletKey: string, name: string) => Promise<void>
  disconnectWallet: () => void
  setError: (message: string | null) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

declare global {
  interface Window {
    cardano: any
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [walletName, setWalletName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchWalletData = async (api: any, name: string) => {
    try {
      const usedAddresses = await api.getUsedAddresses()
      const walletBalance = await api.getBalance() // This might return BigNum or similar, needs conversion

      setIsConnected(true)
      setWalletName(name)
      setAddress(usedAddresses[0] || "N/A")
      // Assuming walletBalance is a BigInt or similar, convert to string for display
      setBalance(walletBalance.toString() + " ADA" || "0 ADA")
      setError(null) // Clear any previous errors
      console.log(`Successfully fetched data for ${name} wallet.`)
    } catch (dataFetchError: any) {
      console.error("Failed to fetch wallet data:", dataFetchError)
      setError(`Failed to fetch wallet data: ${dataFetchError.message || dataFetchError}`)
      setIsConnected(false)
      setAddress(null)
      setBalance(null)
      setWalletName(null)
    }
  }

  const connectWallet = async (walletKey: string, name: string) => {
    setError(null)
    try {
      if (!window.cardano || !window.cardano[walletKey]) {
        throw new Error(`Wallet ${name} not found. Please install it.`)
      }

      // Attempt to enable the wallet. This will prompt the user if not already enabled
      // or if the account has changed and requires re-permission.
      const api = await window.cardano[walletKey].enable()

      // If enable() succeeds, fetch the data
      await fetchWalletData(api, name)
    } catch (err: any) {
      console.error("Failed to connect wallet:", err)
      let errorMessage = "Failed to connect wallet. Please try again."

      if (err.message) {
        if (err.message.includes("account changed")) {
          errorMessage = `Wallet account changed. Please re-connect or switch back to the previously connected account in ${name}.`
        } else if (err.message.includes("user rejected")) {
          errorMessage = "Wallet connection rejected by user."
        } else if (err.message.includes("not found")) {
          errorMessage = `Wallet ${name} not found. Please install it.`
        } else {
          errorMessage = err.message
        }
      }

      setError(errorMessage)
      setIsConnected(false)
      setAddress(null)
      setBalance(null)
      setWalletName(null)
    }
  }

  const disconnectWallet = () => {
    console.log("Disconnecting wallet...")
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
    setWalletName(null)
    setError(null)
  }

  return (
    <WalletContext.Provider
      value={{ isConnected, address, balance, walletName, error, connectWallet, disconnectWallet, setError }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}