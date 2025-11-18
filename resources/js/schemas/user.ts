/**
 * ユーザー関連の型定義
 */

import type { FormEvent } from 'react'

export interface User {
  id: number
  name: string
  email: string
  created_at?: string
}

export interface UserFormData {
  name: string
  email: string
  password: string
}

export interface UserFormProps {
  data: UserFormData
  setData: (key: keyof UserFormData, value: string) => void
  processing: boolean
  onSubmit: (e: FormEvent) => void
  submitLabel?: string
}

export interface UsersPageProps {
  users: {
    data: User[]
    links: { url: string | null; label: string; active: boolean }[]
  }
}
