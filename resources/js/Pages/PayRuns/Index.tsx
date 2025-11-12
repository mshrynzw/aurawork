import React from 'react'
import { Link } from '@inertiajs/react'
import Layout from '@/Components/layout/Layout'
import { Button } from '@/Components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'
import { Badge } from '@/Components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Calendar, DollarSign } from 'lucide-react'

//TODO: 値は仮のまま
type PayRun = {
  id: number
  period_start: string
  period_end: string
  pay_date: string
  status: 'draft' | 'calculating' | 'finalized' | 'paid'
  employee_count: number
  total_amount: number
}

//TODO: 値は仮のまま
const payRuns: PayRun[] = [
  {
    id: 1,
    period_start: '2025-10-01',
    period_end: '2025-10-31',
    pay_date: '2025-11-25',
    status: 'paid',
    employee_count: 50,
    total_amount: 12500000,
  },
  {
    id: 2,
    period_start: '2025-11-01',
    period_end: '2025-11-30',
    pay_date: '2025-12-25',
    status: 'finalized',
    employee_count: 50,
    total_amount: 13250000,
  },
  {
    id: 3,
    period_start: '2025-12-01',
    period_end: '2025-12-31',
    pay_date: '2026-01-25',
    status: 'draft',
    employee_count: 50,
    total_amount: 0,
  },
]

const statusBadgeVariant = (status: PayRun['status']) => {
  switch (status) {
    case 'paid':
      return 'default'
    case 'finalized':
      return 'secondary'
    case 'calculating':
      return 'outline'
    default:
      return 'outline'
  }
}

const statusLabel = (status: PayRun['status']) => {
  switch (status) {
    case 'paid':
      return '支給済み'
    case 'finalized':
      return '確定済み'
    case 'calculating':
      return '計算中'
    default:
      return '下書き'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount)
}

export default function PayRunsIndex() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">給与締め一覧</h1>
          <p className="text-muted-foreground">給与締め処理の確認と管理</p>
        </div>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          新規締め処理
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>締め処理一覧</CardTitle>
          <CardDescription>過去の給与締め処理一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>締め期間</TableHead>
                <TableHead>支給日</TableHead>
                <TableHead>対象人数</TableHead>
                <TableHead>総支給額</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payRuns.map(payRun => (
                <TableRow key={payRun.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(payRun.period_start).toLocaleDateString('ja-JP')} 〜{' '}
                      {new Date(payRun.period_end).toLocaleDateString('ja-JP')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(payRun.pay_date).toLocaleDateString('ja-JP')}
                  </TableCell>
                  <TableCell>{payRun.employee_count}名</TableCell>
                  <TableCell>
                    {payRun.total_amount > 0 ? formatCurrency(payRun.total_amount) : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(payRun.status)}>
                      {statusLabel(payRun.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/pay-runs/${payRun.id}`}>詳細</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
(PayRunsIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="給与締め一覧">{page}</Layout>
)

