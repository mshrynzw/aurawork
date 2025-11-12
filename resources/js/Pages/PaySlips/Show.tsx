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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { ArrowLeft, Download } from 'lucide-react'

//TODO: 値は仮のまま
type PayLine = {
  id: number
  pay_item_name: string
  pay_item_kind: 'earning' | 'deduction'
  quantity: number | null
  rate: number | null
  amount: number
  memo: string | null
}

//TODO: 値は仮のまま
const paySlip = {
  id: 1,
  pay_run_id: 2,
  user_name: '田中 太郎',
  period_start: '2025-11-01',
  period_end: '2025-11-30',
  pay_date: '2025-12-25',
  gross_amount: 265000,
  total_deduction: 50000,
  net_amount: 215000,
  currency: 'JPY',
  status: 'finalized',
}

//TODO: 値は仮のまま
const payLines: PayLine[] = [
  {
    id: 1,
    pay_item_name: '基本給',
    pay_item_kind: 'earning',
    quantity: null,
    rate: null,
    amount: 250000,
    memo: null,
  },
  {
    id: 2,
    pay_item_name: '残業手当',
    pay_item_kind: 'earning',
    quantity: 25,
    rate: 2000,
    amount: 50000,
    memo: null,
  },
  {
    id: 3,
    pay_item_name: '交通費',
    pay_item_kind: 'earning',
    quantity: null,
    rate: null,
    amount: 15000,
    memo: null,
  },
  {
    id: 4,
    pay_item_name: '健康保険',
    pay_item_kind: 'deduction',
    quantity: null,
    rate: null,
    amount: 15000,
    memo: null,
  },
  {
    id: 5,
    pay_item_name: '厚生年金',
    pay_item_kind: 'deduction',
    quantity: null,
    rate: null,
    amount: 20000,
    memo: null,
  },
  {
    id: 6,
    pay_item_name: '雇用保険',
    pay_item_kind: 'deduction',
    quantity: null,
    rate: null,
    amount: 5000,
    memo: null,
  },
  {
    id: 7,
    pay_item_name: '所得税',
    pay_item_kind: 'deduction',
    quantity: null,
    rate: null,
    amount: 10000,
    memo: null,
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount)
}

const kindLabel = (kind: PayLine['pay_item_kind']) => {
  return kind === 'earning' ? '支給' : '控除'
}

export default function PaySlipShow() {
  const earnings = payLines.filter(line => line.pay_item_kind === 'earning')
  const deductions = payLines.filter(line => line.pay_item_kind === 'deduction')

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/pay-runs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              一覧に戻る
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">給与明細</h1>
            <p className="text-muted-foreground">
              {new Date(paySlip.period_start).toLocaleDateString('ja-JP')} 〜{' '}
              {new Date(paySlip.period_end).toLocaleDateString('ja-JP')}
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          PDFダウンロード
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{paySlip.user_name}</CardTitle>
              <CardDescription>
                支給日: {new Date(paySlip.pay_date).toLocaleDateString('ja-JP')}
              </CardDescription>
            </div>
            <Badge variant={paySlip.status === 'finalized' ? 'default' : 'secondary'}>
              {paySlip.status === 'finalized' ? '確定済み' : paySlip.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 支給項目 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">支給項目</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>項目名</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>単価</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {earnings.map(line => (
                  <TableRow key={line.id}>
                    <TableCell>{line.pay_item_name}</TableCell>
                    <TableCell>{line.quantity ?? '-'}</TableCell>
                    <TableCell>{line.rate ? formatCurrency(line.rate) : '-'}</TableCell>
                    <TableCell className="text-right">{formatCurrency(line.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold">
                  <TableCell colSpan={3}>支給合計</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(paySlip.gross_amount)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* 控除項目 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">控除項目</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>項目名</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>単価</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deductions.map(line => (
                  <TableRow key={line.id}>
                    <TableCell>{line.pay_item_name}</TableCell>
                    <TableCell>{line.quantity ?? '-'}</TableCell>
                    <TableCell>{line.rate ? formatCurrency(line.rate) : '-'}</TableCell>
                    <TableCell className="text-right">{formatCurrency(line.amount)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-semibold">
                  <TableCell colSpan={3}>控除合計</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(paySlip.total_deduction)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* 差引支給額 */}
          <div className="rounded-lg border bg-muted p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">差引支給額</span>
              <span className="text-2xl font-bold">{formatCurrency(paySlip.net_amount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
;(PaySlipShow as any).layout = (page: React.ReactNode) => <Layout title="給与明細">{page}</Layout>
