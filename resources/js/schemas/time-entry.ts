/**
 * 勤怠関連の型定義
 */

export interface TimeEntry {
  id: number
  work_date: string
  clock_in: string | null
  clock_out: string | null
  break_minutes: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  late_minutes: number
  early_leave_minutes: number
  overtime_minutes: number
}
