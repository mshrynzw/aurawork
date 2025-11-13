<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApprovalStep extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_approval_steps';

    protected $fillable = [
        'approval_flow_id',
        'step_order',
        'approver_type',
        'approver_role_id',
        'approver_user_id',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'step_order' => 'integer',
        ];
    }

    // リレーション
    public function approvalFlow()
    {
        return $this->belongsTo(ApprovalFlow::class, 'approval_flow_id');
    }

    public function approverRole()
    {
        return $this->belongsTo(Role::class, 'approver_role_id');
    }

    public function approverUser()
    {
        return $this->belongsTo(User::class, 'approver_user_id');
    }
}
