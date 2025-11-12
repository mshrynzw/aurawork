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
import { Plus, Coins } from 'lucide-react'

//TODO: 値は仮のまま
type PayItem = {
  id: number
  company_id: number
  code: string
  name: string
  kind: 'earning' | 'deduction'
  calc_base: 'hour' | 'day' | 'month' | 'fixed' | 'overtime' | 'night' | 'transport'
  taxable: boolean
  social_insurance: boolean
  order_no: number
}

//TODO: 値は仮のまま
const payItems: PayItem[] = [
  {
    id: 1,
    company_id: 1,
    code: 'BASE',
    name: '基本給',
    kind: 'earning',
    calc_base: 'month',
    taxable: true,
    social_insurance: true,
    order_no: 1,
  },
  {
    id: 2,
    company_id: 1,
    code: 'OVERTIME',
    name: '残業手当',
    kind: 'earning',
    calc_base: 'overtime',
    taxable: true,
    social_insurance: true,
    order_no: 2,
  },
  {
    id: 3,
    company_id: 1,
    code: 'HEALTH',
    name: '健康保険',
    kind: 'deduction',
    calc_base: 'fixed',
    taxable: false,
    social_insurance: false,
    order_no: 10,
  },
]

const kindLabel = (kind: PayItem['kind']) => {
  return kind === 'earning' ? '支給' : '控除'
}

const calcBaseLabel = (base: PayItem['calc_base']) => {
  switch (base) {
    case 'hour':
      return '時給'
    case 'day':
      return '日給'
    case 'month':
      return '月給'
    case 'fixed':
      return '固定'
    case 'overtime':
      return '残業'
    case 'night':
      return '深夜'
    case 'transport':
      return '交通費'
  }
}

export default function PayItemsIndex() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規登録
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            賃金項目一覧
          </CardTitle>
          <CardDescription>登録されている賃金項目の一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>コード</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>種別</TableHead>
                <TableHead>計算基礎</TableHead>
                <TableHead>課税</TableHead>
                <TableHead>社保</TableHead>
                <TableHead>表示順</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono">{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant={item.kind === 'earning' ? 'default' : 'secondary'}>
                      {kindLabel(item.kind)}
                    </Badge>
                  </TableCell>
                  <TableCell>{calcBaseLabel(item.calc_base)}</TableCell>
                  <TableCell>{item.taxable ? '○' : '-'}</TableCell>
                  <TableCell>{item.social_insurance ? '○' : '-'}</TableCell>
                  <TableCell>{item.order_no}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/pay-items/${item.id}/edit`}>編集</Link>
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
(PayItemsIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="賃金項目マスタ">{page}</Layout>
)

