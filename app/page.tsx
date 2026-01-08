"use client"

import { useState } from "react"
import { SwapInterface } from "@/components/swap-interface"
import { TradeHistory } from "@/components/trade-history"
import { WalletBalance } from "@/components/wallet-balance"
import { ArrowRightLeft } from "lucide-react"

export default function Page() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSwapComplete = () => {
    // Refresh components after swap
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <ArrowRightLeft className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">StableCoin Swap</h1>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto text-balance">
            Seamlessly exchange pump.fun stablecoins for USDC with instant settlements
          </p>
        </header>

        {/* Wallet Balance */}
        <WalletBalance key={`balance-${refreshKey}`} />

        {/* Main Swap Interface */}
        <div className="max-w-xl mx-auto mb-8">
          <SwapInterface onSwapComplete={handleSwapComplete} />
        </div>

        {/* Trade History */}
        <TradeHistory key={`history-${refreshKey}`} />
      </div>
    </main>
  )
}
