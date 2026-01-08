"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, TrendingUp } from "lucide-react"

interface SwapInterfaceProps {
  onSwapComplete?: () => void
}

export function SwapInterface({ onSwapComplete }: SwapInterfaceProps) {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isSwapping, setIsSwapping] = useState(false)

  // Mock exchange rate: 1 PFUN = 0.98 USDC
  const exchangeRate = 0.98

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    if (value && !isNaN(Number.parseFloat(value))) {
      setToAmount((Number.parseFloat(value) * exchangeRate).toFixed(2))
    } else {
      setToAmount("")
    }
  }

  const handleSwap = async () => {
    if (!fromAmount || Number.parseFloat(fromAmount) <= 0) return

    setIsSwapping(true)
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store trade in localStorage
    const trade = {
      id: Date.now().toString(),
      from: "PFUN",
      to: "USDC",
      fromAmount: Number.parseFloat(fromAmount),
      toAmount: Number.parseFloat(toAmount),
      timestamp: new Date().toISOString(),
      rate: exchangeRate,
    }

    const trades = JSON.parse(localStorage.getItem("trades") || "[]")
    localStorage.setItem("trades", JSON.stringify([trade, ...trades]))

    setIsSwapping(false)
    setFromAmount("")
    setToAmount("")

    if (onSwapComplete) {
      onSwapComplete()
    }
  }

  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      {/* From Token */}
      <div className="mb-2">
        <label className="text-sm text-slate-400 mb-2 block">You Pay</label>
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="bg-transparent text-3xl font-semibold text-white outline-none w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                PF
              </div>
              <div>
                <div className="text-white font-semibold">PFUN</div>
                <div className="text-xs text-slate-500">Pump.fun Stable</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Balance</div>
              <div className="text-white font-semibold">10,000.00</div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Direction Indicator */}
      <div className="flex justify-center -my-2 relative z-10">
        <div className="bg-slate-900 border-4 border-slate-950 rounded-xl p-2">
          <ArrowDownUp className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      {/* To Token */}
      <div className="mb-6">
        <label className="text-sm text-slate-400 mb-2 block">You Receive</label>
        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <input
              type="number"
              placeholder="0.00"
              value={toAmount}
              readOnly
              className="bg-transparent text-3xl font-semibold text-white outline-none w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                $
              </div>
              <div>
                <div className="text-white font-semibold">USDC</div>
                <div className="text-xs text-slate-500">USD Coin</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">Balance</div>
              <div className="text-white font-semibold">5,234.50</div>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      {fromAmount && (
        <div className="mb-4 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Exchange Rate</span>
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              <TrendingUp className="w-4 h-4" />1 PFUN = {exchangeRate} USDC
            </div>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <Button
        onClick={handleSwap}
        disabled={!fromAmount || Number.parseFloat(fromAmount) <= 0 || isSwapping}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSwapping ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Swapping...
          </div>
        ) : (
          "Swap Now"
        )}
      </Button>
    </Card>
  )
}
