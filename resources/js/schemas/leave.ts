/**
 * 休暇関連の型定義
 */

export interface LeaveRequest {
  id: number
  type: 'annual' | 'sick' | 'special' | 'unpaid'
  start_date: string
  end_date: string
  days: number
  reason: string | null
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
}

export interface LeaveBalance {
  type: 'annual' | 'sick' | 'special'
  period_start: string
  period_end: string
  granted: number
  taken: number
  carryover: number
}
