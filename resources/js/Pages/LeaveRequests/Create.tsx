import React from 'react'
import { useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import Layout from '@/Components/layout/Layout'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Textarea } from '@/Components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Calendar } from 'lucide-react'

export default function LeaveRequestCreate() {
  const { data, setData, post, processing, errors } = useForm({
    type: 'annual' as 'annual' | 'sick' | 'special' | 'unpaid',
    start_date: '',
    end_date: '',
    days: '',
    reason: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/api/leave-requests', {
      onSuccess: () => {
        // 成功時の処理
      },
    })
  }

  //TODO: 値は仮のまま
  const leaveTypes = [
    { value: 'annual', label: '年次有給休暇' },
    { value: 'sick', label: '病休' },
    { value: 'special', label: '特別休暇' },
    { value: 'unpaid', label: '無給休暇' },
  ]

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/leave-requests">一覧に戻る</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>申請内容</CardTitle>
          <CardDescription>休暇の詳細を入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">休暇区分</Label>
              <Select
                value={data.type}
                onValueChange={value =>
                  setData('type', value as 'annual' | 'sick' | 'special' | 'unpaid')
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="休暇区分を選択" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive">{errors.type}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start_date">開始日</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start_date"
                    type="date"
                    value={data.start_date}
                    onChange={e => setData('start_date', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.start_date && (
                  <p className="text-sm text-destructive">{errors.start_date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">終了日</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end_date"
                    type="date"
                    value={data.end_date}
                    onChange={e => setData('end_date', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                {errors.end_date && (
                  <p className="text-sm text-destructive">{errors.end_date}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">日数</Label>
              <Input
                id="days"
                type="number"
                step="0.5"
                min="0.5"
                placeholder="1.0"
                value={data.days}
                onChange={e => setData('days', e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                0.5単位で入力可能（例: 1.0, 1.5, 2.0）
              </p>
              {errors.days && (
                <p className="text-sm text-destructive">{errors.days}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">理由（任意）</Label>
              <Textarea
                id="reason"
                placeholder="休暇の理由を入力してください"
                value={data.reason}
                onChange={e => setData('reason', e.target.value)}
                rows={4}
              />
              {errors.reason && (
                <p className="text-sm text-destructive">{errors.reason}</p>
              )}
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {Object.values(errors).join(' / ')}
              </div>
            )}

            <div className="flex gap-2">
              <Button type="submit" disabled={processing}>
                {processing ? '申請中...' : '申請する'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/leave-requests">キャンセル</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
(LeaveRequestCreate as any).layout = (page: React.ReactNode) => (
  <Layout title="休暇申請">{page}</Layout>
)

