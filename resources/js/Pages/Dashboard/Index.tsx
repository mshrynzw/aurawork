import React from 'react'
import Layout from '@/Components/layout/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/Components/ui/chart'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'

//TODO: 値は仮のまま
const attendanceData = [
  { month: '1月', hours: 160 },
  { month: '2月', hours: 165 },
  { month: '3月', hours: 170 },
  { month: '4月', hours: 168 },
  { month: '5月', hours: 172 },
  { month: '6月', hours: 175 },
]

//TODO: 値は仮のまま
const salaryData = [
  { month: '1月', gross: 250000, net: 215000 },
  { month: '2月', gross: 255000, net: 220000 },
  { month: '3月', gross: 250000, net: 215000 },
  { month: '4月', gross: 260000, net: 225000 },
  { month: '5月', gross: 255000, net: 220000 },
  { month: '6月', gross: 265000, net: 230000 },
]

//TODO: 値は仮のまま
const leaveBalanceData = {
  annual: { granted: 20, taken: 5, remaining: 15 },
  sick: { granted: 5, taken: 0, remaining: 5 },
  special: { granted: 3, taken: 1, remaining: 2 },
}

//TODO: 値は仮のまま
const pendingApprovals = [
  { id: 1, type: '休暇申請', applicant: '田中 太郎', date: '2025-11-15', status: 'submitted' },
  { id: 2, type: '勤怠修正', applicant: '佐藤 花子', date: '2025-11-14', status: 'submitted' },
]

const chartConfig = {
  hours: {
    label: '労働時間',
    color: 'hsl(217.2 91.2% 59.8%)',
  },
  gross: {
    label: '総支給額',
    color: 'hsl(142.1 76.2% 36.3%)',
  },
  net: {
    label: '差引支給額',
    color: 'hsl(221.2 83.2% 53.3%)',
  },
}

export default function Dashboard() {
  return (
    <div className="w-full space-y-6">
      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今月の労働時間</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">175時間</div>
            <p className="text-xs text-muted-foreground">先月比 +3時間</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今月の給与</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥265,000</div>
            <p className="text-xs text-muted-foreground">差引支給額</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">有給残高</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15日</div>
            <p className="text-xs text-muted-foreground">年次有給休暇</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">承認待ち</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2件</div>
            <p className="text-xs text-muted-foreground">未処理の申請</p>
          </CardContent>
        </Card>
      </div>

      {/* グラフ */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>労働時間の推移</CardTitle>
            <CardDescription>過去6ヶ月の月間労働時間</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill={chartConfig.hours.color} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>給与の推移</CardTitle>
            <CardDescription>過去6ヶ月の給与推移</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gross"
                    stroke={chartConfig.gross.color}
                    name="総支給額"
                  />
                  <Line
                    type="monotone"
                    dataKey="net"
                    stroke={chartConfig.net.color}
                    name="差引支給額"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 休暇残高 */}
      <Card>
        <CardHeader>
          <CardTitle>休暇残高</CardTitle>
          <CardDescription>各種休暇の残高状況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">年次有給休暇</span>
                <Badge variant="secondary">{leaveBalanceData.annual.remaining}日</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                付与: {leaveBalanceData.annual.granted}日 / 取得: {leaveBalanceData.annual.taken}日
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">病休</span>
                <Badge variant="secondary">{leaveBalanceData.sick.remaining}日</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                付与: {leaveBalanceData.sick.granted}日 / 取得: {leaveBalanceData.sick.taken}日
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">特別休暇</span>
                <Badge variant="secondary">{leaveBalanceData.special.remaining}日</Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                付与: {leaveBalanceData.special.granted}日 / 取得: {leaveBalanceData.special.taken}
                日
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 承認待ち一覧 */}
      <Card>
        <CardHeader>
          <CardTitle>承認待ち</CardTitle>
          <CardDescription>承認が必要な申請一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map(approval => (
              <div
                key={approval.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="font-medium">{approval.type}</div>
                  <div className="text-sm text-muted-foreground">
                    {approval.applicant} - {approval.date}
                  </div>
                </div>
                <Badge variant={approval.status === 'submitted' ? 'default' : 'secondary'}>
                  {approval.status === 'submitted' ? '承認待ち' : approval.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
;(Dashboard as any).layout = (page: React.ReactNode) => (
  <Layout title="ダッシュボード">{page}</Layout>
)
