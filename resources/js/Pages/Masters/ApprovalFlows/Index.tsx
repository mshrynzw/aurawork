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
import { Plus, Workflow } from 'lucide-react'
import type { ApprovalFlow } from '@/schemas'

//TODO: 値は仮のまま

//TODO: 値は仮のまま
const approvalFlows: ApprovalFlow[] = [
  {
    id: 1,
    company_id: 1,
    name: '年次有給休暇承認フロー',
    target: 'leave_request',
    is_active: true,
    step_count: 2,
  },
  {
    id: 2,
    company_id: 1,
    name: '勤怠修正承認フロー',
    target: 'time_entry',
    is_active: true,
    step_count: 1,
  },
  {
    id: 3,
    company_id: 1,
    name: '一般承認フロー',
    target: 'generic',
    is_active: false,
    step_count: 3,
  },
]

const targetLabel = (target: ApprovalFlow['target']) => {
  switch (target) {
    case 'time_entry':
      return '勤怠'
    case 'leave_request':
      return '休暇'
    case 'generic':
      return 'その他'
  }
}

export default function ApprovalFlowsIndex() {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                承認フロー一覧
              </CardTitle>
              <CardDescription>登録されている承認フローの一覧</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規登録
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>対象</TableHead>
                <TableHead>承認段階数</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvalFlows.map(flow => (
                <TableRow key={flow.id}>
                  <TableCell>{flow.name}</TableCell>
                  <TableCell>{targetLabel(flow.target)}</TableCell>
                  <TableCell>{flow.step_count}段階</TableCell>
                  <TableCell>
                    <Badge variant={flow.is_active ? 'default' : 'secondary'}>
                      {flow.is_active ? '有効' : '無効'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/masters/approval-flows/${flow.id}/edit`}>編集</Link>
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
  ApprovalFlowsIndex as React.ComponentType<Record<string, never>> & {
    layout?: (page: React.ReactNode) => React.ReactNode
  }
).layout = (page: React.ReactNode) => <Layout title="承認フローマスタ">{page}</Layout>
