"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Clock, ArrowRight } from "lucide-react"

interface Trade {
  id: string
  from: string
  to: string
  fromAmount: number
  toAmount: number
  timestamp: string
  rate: number
}

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    // Load trades from localStorage
    const storedTrades = JSON.parse(localStorage.getItem("trades") || "[]")
    setTrades(storedTrades.slice(0, 5)) // Show last 5 trades
  }, [])

  if (trades.length === 0) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-slate-400" />
          <h2 className="text-xl font-bold text-white">Recent Trades</h2>
        </div>

        <div className="space-y-3">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-4 bg-slate-950/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    PF
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {trade.fromAmount.toFixed(2)} {trade.from}
                    </div>
                    <div className="text-xs text-slate-500">{new Date(trade.timestamp).toLocaleString()}</div>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-600" />

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    $
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {trade.toAmount.toFixed(2)} {trade.to}
                    </div>
                    <div className="text-xs text-slate-500">Rate: {trade.rate}</div>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="text-xs font-semibold text-green-400">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
