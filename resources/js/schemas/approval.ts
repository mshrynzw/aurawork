/**
 * 承認関連の型定義
 */

export interface Approval {
  id: number
  target_type: 'time_entry' | 'leave_request' | 'generic'
  target_id: number
  applicant_name: string
  target_date: string
  current_step: number
  total_steps: number
  status: 'draft' | 'in_review' | 'approved' | 'rejected'
  description: string
}

export interface ApprovalFlow {
  id: number
  company_id: number
  name: string
  target: 'time_entry' | 'leave_request' | 'generic'
  is_active: boolean
  step_count: number
}
