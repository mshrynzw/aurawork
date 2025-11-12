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
import { Plus, Briefcase } from 'lucide-react'

//TODO: 値は仮のまま
type Employment = {
  id: number
  user_name: string
  employment_type: 'fulltime' | 'contract' | 'parttime' | 'intern'
  base_hourly_rate: number | null
  base_monthly_salary: number | null
  work_hours_per_week: number
  effective_from: string
  effective_to: string | null
}

//TODO: 値は仮のまま
const employments: Employment[] = [
  {
    id: 1,
    user_name: '田中 太郎',
    employment_type: 'fulltime',
    base_hourly_rate: null,
    base_monthly_salary: 300000,
    work_hours_per_week: 40,
    effective_from: '2025-04-01',
    effective_to: null,
  },
  {
    id: 2,
    user_name: '佐藤 花子',
    employment_type: 'parttime',
    base_hourly_rate: 1200,
    base_monthly_salary: null,
    work_hours_per_week: 20,
    effective_from: '2025-04-01',
    effective_to: null,
  },
]

const employmentTypeLabel = (type: Employment['employment_type']) => {
  switch (type) {
    case 'fulltime':
      return '正社員'
    case 'contract':
      return '契約社員'
    case 'parttime':
      return 'パートタイム'
    case 'intern':
      return 'インターン'
  }
}

const formatCurrency = (amount: number | null) => {
  if (amount === null) return '-'
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(amount)
}

export default function EmploymentsIndex() {
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
            <Briefcase className="h-5 w-5" />
            雇用情報一覧
          </CardTitle>
          <CardDescription>登録されている雇用情報の一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ユーザー名</TableHead>
                <TableHead>雇用区分</TableHead>
                <TableHead>基本時給</TableHead>
                <TableHead>基本月給</TableHead>
                <TableHead>週所定労働時間</TableHead>
                <TableHead>適用開始日</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employments.map(employment => (
                <TableRow key={employment.id}>
                  <TableCell>{employment.user_name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {employmentTypeLabel(employment.employment_type)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(employment.base_hourly_rate)}</TableCell>
                  <TableCell>{formatCurrency(employment.base_monthly_salary)}</TableCell>
                  <TableCell>{employment.work_hours_per_week}時間</TableCell>
                  <TableCell>
                    {new Date(employment.effective_from).toLocaleDateString('ja-JP')}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/employments/${employment.id}/edit`}>編集</Link>
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
(EmploymentsIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="雇用情報マスタ">{page}</Layout>
)

