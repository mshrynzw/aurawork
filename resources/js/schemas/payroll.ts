/**
 * 給与関連の型定義
 */

export interface PayRun {
  id: number
  period_start: string
  period_end: string
  pay_date: string
  status: 'draft' | 'calculating' | 'finalized' | 'paid'
  employee_count: number
  total_amount: number
}

export interface PayLine {
  id: number
  pay_item_name: string
  pay_item_kind: 'earning' | 'deduction'
  quantity: number | null
  rate: number | null
  amount: number
  memo: string | null
}

export interface PayItem {
  id: number
  company_id: number
  code: string
  name: string
  kind: 'earning' | 'deduction'
  calc_base: 'hour' | 'day' | 'month' | 'fixed' | 'overtime' | 'night' | 'transport'
  taxable: boolean
  social_insurance: boolean
  order_no: number
}
