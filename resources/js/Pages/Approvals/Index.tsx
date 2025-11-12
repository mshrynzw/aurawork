import React from 'react'
import { useForm } from '@inertiajs/react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/ui/dialog'
import { Textarea } from '@/Components/ui/textarea'
import { Label } from '@/Components/ui/label'
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react'

//TODO: 値は仮のまま
type Approval = {
  id: number
  target_type: 'time_entry' | 'leave_request' | 'generic'
  target_id: number
  applicant_name: string
  target_date: string
  current_step: number
  total_steps: number
  status: 'draft' | 'in_review' | 'approved' | 'rejected'
  description: string
}

//TODO: 値は仮のまま
const approvals: Approval[] = [
  {
    id: 1,
    target_type: 'leave_request',
    target_id: 1,
    applicant_name: '田中 太郎',
    target_date: '2025-12-01',
    current_step: 1,
    total_steps: 2,
    status: 'in_review',
    description: '年次有給休暇申請（3日間）',
  },
  {
    id: 2,
    target_type: 'time_entry',
    target_id: 5,
    applicant_name: '佐藤 花子',
    target_date: '2025-11-14',
    current_step: 1,
    total_steps: 1,
    status: 'in_review',
    description: '勤怠修正申請',
  },
]

const targetTypeLabel = (type: Approval['target_type']) => {
  switch (type) {
    case 'time_entry':
      return '勤怠'
    case 'leave_request':
      return '休暇'
    case 'generic':
      return 'その他'
  }
}

const statusBadgeVariant = (status: Approval['status']) => {
  switch (status) {
    case 'approved':
      return 'default'
    case 'in_review':
      return 'secondary'
    case 'rejected':
      return 'destructive'
    default:
      return 'outline'
  }
}

const statusLabel = (status: Approval['status']) => {
  switch (status) {
    case 'approved':
      return '承認済み'
    case 'in_review':
      return '承認待ち'
    case 'rejected':
      return '却下'
    default:
      return '下書き'
  }
}

function ApprovalActionDialog({ approval }: { approval: Approval }) {
  const { data, setData, post, processing } = useForm({
    action: 'approve' as 'approve' | 'reject',
    comment: '',
  })

  const handleSubmit = (action: 'approve' | 'reject') => {
    setData('action', action)
    post(`/api/approvals/${approval.id}/action`, {
      preserveScroll: true,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          承認/却下
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>承認操作</DialogTitle>
          <DialogDescription>
            {approval.description} - {approval.applicant_name}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment">コメント（任意）</Label>
            <Textarea
              id="comment"
              placeholder="コメントを入力してください"
              value={data.comment}
              onChange={e => setData('comment', e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="destructive"
            onClick={() => handleSubmit('reject')}
            disabled={processing}
          >
            <XCircle className="mr-2 h-4 w-4" />
            却下
          </Button>
          <Button
            onClick={() => handleSubmit('approve')}
            disabled={processing}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            承認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ApprovalsIndex() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold">承認一覧</h1>
        <p className="text-muted-foreground">承認が必要な申請の確認と処理</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>承認待ち一覧</CardTitle>
          <CardDescription>承認が必要な申請一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>種別</TableHead>
                <TableHead>申請者</TableHead>
                <TableHead>内容</TableHead>
                <TableHead>対象日</TableHead>
                <TableHead>承認段階</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map(approval => (
                <TableRow key={approval.id}>
                  <TableCell>{targetTypeLabel(approval.target_type)}</TableCell>
                  <TableCell>{approval.applicant_name}</TableCell>
                  <TableCell>{approval.description}</TableCell>
                  <TableCell>
                    {new Date(approval.target_date).toLocaleDateString('ja-JP')}
                  </TableCell>
                  <TableCell>
                    {approval.current_step} / {approval.total_steps}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(approval.status)}>
                      {statusLabel(approval.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {approval.status === 'in_review' && (
                      <ApprovalActionDialog approval={approval} />
                    )}
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
(ApprovalsIndex as any).layout = (page: React.ReactNode) => (
  <Layout title="承認一覧">{page}</Layout>
)

