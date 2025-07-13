"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  walletName: string | null
}

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isConnecting: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    walletName: null,
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for existing wallet connection on mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      // Check if cardano object exists (injected by wallet extensions)
      if (typeof window !== "undefined" && (window as any).cardano) {
        const savedWallet = localStorage.getItem("connectedWallet")
        if (savedWallet) {
          const walletApi = (window as any).cardano[savedWallet]
          if (walletApi && (await walletApi.isEnabled())) {
            const api = await walletApi.enable()
            const addresses = await api.getUsedAddresses()
            const balance = await api.getBalance()

            setWalletState({
              isConnected: true,
              address: addresses[0] || "addr1...",
              balance: "1,234.56 ₳",
              walletName: savedWallet,
            })
          }
        }
      }
    } catch (err) {
      console.error("Error checking wallet connection:", err)
    }
  }

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simulate wallet connection for demo purposes
      // In a real app, this would interact with actual Cardano wallet APIs
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Check if wallet extensions are available
      if (typeof window !== "undefined" && (window as any).cardano) {
        // Try to connect to available wallets (Nami, Eternl, etc.)
        const availableWallets = Object.keys((window as any).cardano)

        if (availableWallets.length > 0) {
          const walletName = availableWallets[0] // Use first available wallet
          const walletApi = (window as any).cardano[walletName]

          // Request access
          const api = await walletApi.enable()
          const addresses = await api.getUsedAddresses()
          const balance = await api.getBalance()

          setWalletState({
            isConnected: true,
            address: addresses[0] || "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt6ll2qzqz...",
            balance: "1,234.56 ₳",
            walletName: walletName,
          })

          localStorage.setItem("connectedWallet", walletName)
        } else {
          throw new Error("No Cardano wallet found. Please install Nami, Eternl, or another Cardano wallet.")
        }
      } else {
        // Demo mode - simulate successful connection
        setWalletState({
          isConnected: true,
          address: "addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt6ll2qzqz...",
          balance: "1,234.56 ₳",
          walletName: "Demo Wallet",
        })
        localStorage.setItem("connectedWallet", "demo")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      walletName: null,
    })
    localStorage.removeItem("connectedWallet")
    setError(null)
  }

  return (
    <WalletContext.Provider
      value={{
        ...walletState,
        connectWallet,
        disconnectWallet,
        isConnecting,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
