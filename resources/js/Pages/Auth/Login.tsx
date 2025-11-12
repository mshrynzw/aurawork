import React from 'react'
import { useForm, router } from '@inertiajs/react'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import AuroraBackground from '@/Components/layout/AuroraBackground'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    router.get('/')
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      {/* ===== 背景レイヤー（黒＋オーロラ） ===== */}
      <AuroraBackground />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle
            className="text-4xl font-semibold tracking-wider animate-dimlight box-reflect self-center"
            data-text="aurawork"
          >
            aurawork
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="tanaka@corp.jp"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                autoComplete="email"
                required
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                autoComplete="current-password"
                required
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>
            {errors.message && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {errors.message}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={processing}>
              {processing ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
