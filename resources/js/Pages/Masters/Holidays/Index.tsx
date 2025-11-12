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
import { Plus, Calendar } from 'lucide-react'

//TODO: 値は仮のまま
type Holiday = {
  id: number
  company_id: number
  date: string
  name: string
  is_national: boolean
}

//TODO: 値は仮のまま
const holidays: Holiday[] = [
  {
    id: 1,
    company_id: 1,
    date: '2025-01-01',
    name: '元日',
    is_national: true,
  },
  {
    id: 2,
    company_id: 1,
    date: '2025-01-13',
    name: '成人の日',
    is_national: true,
  },
  {
    id: 3,
    company_id: 1,
    date: '2025-12-25',
    name: 'クリスマス',
    is_national: false,
  },
]

export default function HolidaysIndex() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">休日マスタ</h1>
          <p className="text-muted-foreground">休日の管理</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規登録
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            休日一覧
          </CardTitle>
          <CardDescription>登録されている休日の一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>種別</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map(holiday => (
                <TableRow key={holiday.id}>
                  <TableCell>
                    {new Date(holiday.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'short',
                    })}
                  </TableCell>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell>
                    <Badge variant={holiday.is_national ? 'default' : 'secondary'}>
                      {holiday.is_national ? '国民の祝日' : '会社休日'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/holidays/${holiday.id}/edit`}>編集</Link>
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
(HolidaysIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="休日マスタ">{page}</Layout>
)

