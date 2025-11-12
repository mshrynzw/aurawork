import React from 'react'
import Layout from '@/Components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { Progress } from '@/Components/ui/progress'

//TODO: 値は仮のまま
type LeaveBalance = {
  type: 'annual' | 'sick' | 'special'
  period_start: string
  period_end: string
  granted: number
  taken: number
  carryover: number
}

//TODO: 値は仮のまま
const leaveBalances: LeaveBalance[] = [
  {
    type: 'annual',
    period_start: '2025-04-01',
    period_end: '2026-03-31',
    granted: 20,
    taken: 5,
    carryover: 0,
  },
  {
    type: 'sick',
    period_start: '2025-04-01',
    period_end: '2026-03-31',
    granted: 5,
    taken: 0,
    carryover: 0,
  },
  {
    type: 'special',
    period_start: '2025-04-01',
    period_end: '2026-03-31',
    granted: 3,
    taken: 1,
    carryover: 0,
  },
]

const typeLabel = (type: LeaveBalance['type']) => {
  switch (type) {
    case 'annual':
      return '年次有給休暇'
    case 'sick':
      return '病休'
    case 'special':
      return '特別休暇'
  }
}

const calculateRemaining = (balance: LeaveBalance) => {
  return balance.granted + balance.carryover - balance.taken
}

const calculateUsageRate = (balance: LeaveBalance) => {
  const total = balance.granted + balance.carryover
  if (total === 0) return 0
  return (balance.taken / total) * 100
}

export default function LeaveBalancesIndex() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold">休暇残高</h1>
        <p className="text-muted-foreground">各種休暇の残高状況を確認</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {leaveBalances.map(balance => {
          const remaining = calculateRemaining(balance)
          const usageRate = calculateUsageRate(balance)

          return (
            <Card key={balance.type}>
              <CardHeader>
                <CardTitle>{typeLabel(balance.type)}</CardTitle>
                <CardDescription>
                  {new Date(balance.period_start).toLocaleDateString('ja-JP')} 〜{' '}
                  {new Date(balance.period_end).toLocaleDateString('ja-JP')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">残高</span>
                    <Badge variant="secondary" className="text-lg">
                      {remaining}日
                    </Badge>
                  </div>
                  <Progress value={usageRate} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">付与日数</span>
                    <span className="font-medium">{balance.granted}日</span>
                  </div>
                  {balance.carryover > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">繰越日数</span>
                      <span className="font-medium">{balance.carryover}日</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">取得日数</span>
                    <span className="font-medium">{balance.taken}日</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
(LeaveBalancesIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="休暇残高">{page}</Layout>
)

