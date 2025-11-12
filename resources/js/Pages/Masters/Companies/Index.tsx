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
import { Plus, Building2 } from 'lucide-react'

//TODO: 値は仮のまま
type Company = {
  id: number
  name: string
  code: string
  timezone: string
  start_of_week: number
}

//TODO: 値は仮のまま
const companies: Company[] = [
  {
    id: 1,
    name: '株式会社サンプル',
    code: 'SAMPLE',
    timezone: 'Asia/Tokyo',
    start_of_week: 1,
  },
  {
    id: 2,
    name: 'テスト商事株式会社',
    code: 'TEST',
    timezone: 'Asia/Tokyo',
    start_of_week: 1,
  },
]

const weekDayLabel = (day: number) => {
  const days = ['日', '月', '火', '水', '木', '金', '土']
  return days[day - 1] || '-'
}

export default function CompaniesIndex() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">会社マスタ</h1>
          <p className="text-muted-foreground">会社情報の管理</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規登録
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            会社一覧
          </CardTitle>
          <CardDescription>登録されている会社の一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>会社コード</TableHead>
                <TableHead>会社名</TableHead>
                <TableHead>タイムゾーン</TableHead>
                <TableHead>週の開始曜日</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell className="font-mono">{company.code}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.timezone}</TableCell>
                  <TableCell>{weekDayLabel(company.start_of_week)}曜日</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/companies/${company.id}/edit`}>編集</Link>
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
(CompaniesIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="会社マスタ">{page}</Layout>
)

