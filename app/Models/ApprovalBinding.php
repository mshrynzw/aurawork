<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApprovalBinding extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_approval_bindings';

    protected $fillable = [
        'flow_id',
        'target_table',
        'target_id',
        'current_step',
        'status',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'current_step' => 'integer',
        ];
    }

    // リレーション
    public function approvalFlow()
    {
        return $this->belongsTo(ApprovalFlow::class, 'flow_id');
    }

    public function approvals()
    {
        return $this->hasMany(Approval::class, 'binding_id');
    }

    public function timeEntries()
    {
        return $this->hasMany(TimeEntry::class, 'approval_binding_id');
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class, 'approval_binding_id');
    }
}
