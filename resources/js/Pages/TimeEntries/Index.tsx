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
import { Calendar, Clock } from 'lucide-react'
import type { TimeEntry } from '@/schemas'

//TODO: 値は仮のまま

//TODO: 値は仮のまま
const timeEntries: TimeEntry[] = [
  {
    id: 1,
    work_date: '2025-11-12',
    clock_in: '2025-11-12 09:00:00',
    clock_out: '2025-11-12 18:00:00',
    break_minutes: 60,
    status: 'approved',
    late_minutes: 0,
    early_leave_minutes: 0,
    overtime_minutes: 0,
  },
  {
    id: 2,
    work_date: '2025-11-11',
    clock_in: '2025-11-11 09:15:00',
    clock_out: '2025-11-11 18:00:00',
    break_minutes: 60,
    status: 'submitted',
    late_minutes: 15,
    early_leave_minutes: 0,
    overtime_minutes: 0,
  },
  {
    id: 3,
    work_date: '2025-11-10',
    clock_in: '2025-11-10 08:45:00',
    clock_out: '2025-11-10 20:30:00',
    break_minutes: 60,
    status: 'approved',
    late_minutes: 0,
    early_leave_minutes: 0,
    overtime_minutes: 105,
  },
]

const statusBadgeVariant = (status: TimeEntry['status']) => {
  switch (status) {
    case 'approved':
      return 'default'
    case 'submitted':
      return 'secondary'
    case 'rejected':
      return 'destructive'
    default:
      return 'outline'
  }
}

const statusLabel = (status: TimeEntry['status']) => {
  switch (status) {
    case 'approved':
      return '承認済み'
    case 'submitted':
      return '申請中'
    case 'rejected':
      return '却下'
    default:
      return '下書き'
  }
}

const formatTime = (dateTime: string | null) => {
  if (!dateTime) return '-'
  return new Date(dateTime).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const calculateWorkHours = (entry: TimeEntry) => {
  if (!entry.clock_in || !entry.clock_out) return '-'
  const start = new Date(entry.clock_in)
  const end = new Date(entry.clock_out)
  const diff = (end.getTime() - start.getTime()) / (1000 * 60) - entry.break_minutes
  const hours = Math.floor(diff / 60)
  const minutes = diff % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}`
}

export default function TimeEntriesIndex() {
  return (
    <div className="w-full space-y-6">
      {/* 今月のサマリー */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>今月のサマリー</CardTitle>
              <CardDescription>2025年11月</CardDescription>
            </div>
            <Button asChild>
              <Link href="/time-entries/clock">
                <Clock className="mr-2 h-4 w-4" />
                打刻
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">総労働時間</div>
              <div className="text-2xl font-bold">175時間</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">残業時間</div>
              <div className="text-2xl font-bold">25時間</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">遅刻回数</div>
              <div className="text-2xl font-bold">2回</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">早退回数</div>
              <div className="text-2xl font-bold">0回</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 勤怠一覧テーブル */}
      <Card>
        <CardHeader>
          <CardTitle>勤怠実績</CardTitle>
          <CardDescription>過去の勤務実績一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>対象日</TableHead>
                <TableHead>出勤</TableHead>
                <TableHead>退勤</TableHead>
                <TableHead>休憩</TableHead>
                <TableHead>労働時間</TableHead>
                <TableHead>残業</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeEntries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(entry.work_date).toLocaleDateString('ja-JP', {
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short',
                      })}
                    </div>
                  </TableCell>
                  <TableCell>{formatTime(entry.clock_in)}</TableCell>
                  <TableCell>{formatTime(entry.clock_out)}</TableCell>
                  <TableCell>{entry.break_minutes}分</TableCell>
                  <TableCell>{calculateWorkHours(entry)}</TableCell>
                  <TableCell>
                    {entry.overtime_minutes > 0 ? (
                      <span className="text-orange-500">
                        {Math.floor(entry.overtime_minutes / 60)}:
                        {(entry.overtime_minutes % 60).toString().padStart(2, '0')}
                      </span>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(entry.status)}>
                      {statusLabel(entry.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/time-entries/${entry.id}/edit`}>編集</Link>
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
;(
  TimeEntriesIndex as React.ComponentType<Record<string, never>> & {
    layout?: (page: React.ReactNode) => React.ReactNode
  }
).layout = (page: React.ReactNode) => <Layout title="勤怠一覧">{page}</Layout>
