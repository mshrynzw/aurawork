/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import Layout from '@/Components/layout/Layout'
import Form from './Form'
import type { User } from '@/schemas'

interface Props {
  user: User
}

export default function Edit({ user }: Props) {
  const { props } = usePage<{ flash?: { success?: string } }>()
  const flash = props.flash || {}

  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
  })

  const submit = e => {
    e.preventDefault()
    put(`/users/${user.id}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/users" className="text-blue-400 hover:text-blue-300">
          ← Back
        </Link>
        <h2 className="text-xl font-semibold">Edit User #{user.id}</h2>
      </div>

      {flash.success && (
        <div className="rounded border border-green-500/50 bg-green-500/10 p-3 text-green-300">
          {flash.success}
        </div>
      )}
      {errors && Object.keys(errors).length > 0 && (
        <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-red-300">
          {Object.values(errors).join(' / ')}
        </div>
      )}

      <Form
        data={data}
        setData={setData}
        processing={processing}
        onSubmit={submit}
        submitLabel="Update"
      />
    </div>
  )
}

// Inertiaの"per-page layout"パターン
;(
  Edit as React.ComponentType<Props> & { layout?: (page: React.ReactNode) => React.ReactNode }
).layout = (page: React.ReactNode) => <Layout title="Edit User">{page}</Layout>
