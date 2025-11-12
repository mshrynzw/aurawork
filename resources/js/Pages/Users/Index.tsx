import React from 'react'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import Layout from '@/Components/layout/Layout'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Components/ui/table'

type User = {
  id: number
  name: string
  email: string
  created_at: string
}

type UsersPageProps = {
  users: {
    data: User[]
    links: { url: string | null; label: string; active: boolean }[]
  }
}

export default function Index({ users }: UsersPageProps) {
  const { data, setData, post, reset, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/users', { onSuccess: () => reset() })
  }

  return (
    <div className="w-full space-y-4">
      <form onSubmit={submit} className="flex gap-2">
        <Input
          placeholder="Name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          autoComplete="name"
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData('password', e.target.value)}
          autoComplete="new-password"
          required
        />
        <Button
          type="submit"
          variant="outline"
          disabled={processing}
        >
          Create
        </Button>
      </form>

      {errors && Object.keys(errors).length > 0 && (
        <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-red-300">
          {Object.values(errors).join(' / ')}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map(u => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Link href={`/users/${u.id}/edit`} className="text-blue-400 hover:text-blue-300">
                  Edit
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Inertiaの"per-page layout"パターン
(Index as any).layout = (page: React.ReactNode) => <Layout>{page}</Layout>