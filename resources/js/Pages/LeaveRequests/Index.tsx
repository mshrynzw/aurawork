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
import { Calendar, Plus } from 'lucide-react'

//TODO: 値は仮のまま
type LeaveRequest = {
  id: number
  type: 'annual' | 'sick' | 'special' | 'unpaid'
  start_date: string
  end_date: string
  days: number
  reason: string | null
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
}

//TODO: 値は仮のまま
const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    type: 'annual',
    start_date: '2025-12-01',
    end_date: '2025-12-03',
    days: 3.0,
    reason: '私用',
    status: 'submitted',
  },
  {
    id: 2,
    type: 'sick',
    start_date: '2025-11-05',
    end_date: '2025-11-05',
    days: 1.0,
    reason: '体調不良',
    status: 'approved',
  },
  {
    id: 3,
    type: 'annual',
    start_date: '2025-10-15',
    end_date: '2025-10-15',
    days: 1.0,
    reason: null,
    status: 'approved',
  },
]

const typeLabel = (type: LeaveRequest['type']) => {
  switch (type) {
    case 'annual':
      return '年次有給休暇'
    case 'sick':
      return '病休'
    case 'special':
      return '特別休暇'
    case 'unpaid':
      return '無給休暇'
  }
}

const statusBadgeVariant = (status: LeaveRequest['status']) => {
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

const statusLabel = (status: LeaveRequest['status']) => {
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

export default function LeaveRequestsIndex() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">休暇申請一覧</h1>
          <p className="text-muted-foreground">休暇申請の確認と管理</p>
        </div>
        <Button asChild>
          <Link href="/leave-requests/create">
            <Plus className="mr-2 h-4 w-4" />
            新規申請
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>申請一覧</CardTitle>
          <CardDescription>過去の休暇申請一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>区分</TableHead>
                <TableHead>開始日</TableHead>
                <TableHead>終了日</TableHead>
                <TableHead>日数</TableHead>
                <TableHead>理由</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>{typeLabel(request.type)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(request.start_date).toLocaleDateString('ja-JP')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(request.end_date).toLocaleDateString('ja-JP')}
                  </TableCell>
                  <TableCell>{request.days}日</TableCell>
                  <TableCell>{request.reason || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(request.status)}>
                      {statusLabel(request.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/leave-requests/${request.id}`}>詳細</Link>
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
(LeaveRequestsIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="休暇申請一覧">{page}</Layout>
)

