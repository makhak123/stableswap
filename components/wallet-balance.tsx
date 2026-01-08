"use client"

import { Card } from "@/components/ui/card"
import { Wallet, TrendingUp } from "lucide-react"

export function WalletBalance() {
  // Mock wallet data
  const totalValue = 15234.5
  const change24h = 2.34

  return (
    <div className="max-w-xl mx-auto mb-8">
      <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-5 h-5 text-blue-400" />
          <span className="text-slate-400 text-sm font-medium">Total Balance</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl font-bold text-white mb-2">
              ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold">+{change24h}%</span>
              <span className="text-slate-500">24h</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Connected</div>
            <div className="text-xs font-mono text-slate-500 bg-slate-950/50 px-3 py-1 rounded-lg">0x7a4...9c2f</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
