import React from 'react'
import { useForm } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import Layout from '@/Components/layout/Layout'
import { Button } from '@/Components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Clock as ClockIcon, LogIn, LogOut } from 'lucide-react'

export default function TimeClock() {
  const { post, processing } = useForm({})

  const handleClockIn = () => {
    post('/api/time-entries/clock-in', {
      preserveScroll: true,
    })
  }

  const handleClockOut = () => {
    post('/api/time-entries/clock-out', {
      preserveScroll: true,
    })
  }

  //TODO: 値は仮のまま
  const currentStatus = {
    clockedIn: false,
    clockInTime: null as string | null,
    workDate: '2025-11-12',
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">打刻</h1>
          <p className="text-muted-foreground">出勤・退勤の打刻を行います</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/time-entries">一覧に戻る</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              現在の状態
            </CardTitle>
            <CardDescription>今日の打刻状況</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">対象日</div>
              <div className="text-2xl font-bold">
                {new Date(currentStatus.workDate).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">出勤時刻</div>
              <div className="text-xl">
                {currentStatus.clockInTime
                  ? new Date(currentStatus.clockInTime).toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '未打刻'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">状態</div>
              <div className="text-lg font-semibold">
                {currentStatus.clockedIn ? '出勤中' : '退勤済み'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>打刻操作</CardTitle>
            <CardDescription>出勤・退勤の打刻を行います</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!currentStatus.clockedIn ? (
              <Button
                onClick={handleClockIn}
                disabled={processing}
                className="w-full h-24 text-lg"
                size="lg"
              >
                <LogIn className="mr-2 h-6 w-6" />
                出勤打刻
              </Button>
            ) : (
              <Button
                onClick={handleClockOut}
                disabled={processing}
                variant="destructive"
                className="w-full h-24 text-lg"
                size="lg"
              >
                <LogOut className="mr-2 h-6 w-6" />
                退勤打刻
              </Button>
            )}
            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-2">注意事項</p>
              <ul className="list-disc list-inside space-y-1">
                <li>打刻時刻は自動で記録されます</li>
                <li>誤って打刻した場合は、一覧画面から修正申請を行ってください</li>
                <li>出勤打刻後、退勤打刻までが1日の勤務として記録されます</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
(TimeClock as any).layout = (page: React.ReactNode) => <Layout title="打刻">{page}</Layout>

