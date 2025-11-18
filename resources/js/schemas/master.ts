/**
 * マスタデータ関連の型定義
 */

export interface Company {
  id: number
  name: string
  code: string
  timezone: string
  start_of_week: number
}

export interface Department {
  id: number
  company_id: number
  name: string
  code: string
  parent_id: number | null
  parent_name: string | null
}

export interface Role {
  id: number
  company_id: number
  slug: string
  name: string
  description: string | null
}

export interface Permission {
  id: number
  key: string
  description: string | null
}

export interface Holiday {
  id: number
  company_id: number
  date: string
  name: string
  is_national: boolean
}

export interface Employment {
  id: number
  user_name: string
  employment_type: 'fulltime' | 'contract' | 'parttime' | 'intern'
  base_hourly_rate: number | null
  base_monthly_salary: number | null
  work_hours_per_week: number
  effective_from: string
  effective_to: string | null
}
