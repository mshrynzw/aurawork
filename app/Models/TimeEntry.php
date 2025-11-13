<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TimeEntry extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_time_entries';

    protected $fillable = [
        'user_id',
        'work_date',
        'clock_in',
        'clock_out',
        'break_minutes',
        'source',
        'status',
        'late_minutes',
        'early_leave_minutes',
        'overtime_minutes',
        'approval_binding_id',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'work_date' => 'date',
            'clock_in' => 'datetime',
            'clock_out' => 'datetime',
            'break_minutes' => 'integer',
            'late_minutes' => 'integer',
            'early_leave_minutes' => 'integer',
            'overtime_minutes' => 'integer',
        ];
    }

    // リレーション
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function approvalBinding()
    {
        return $this->belongsTo(ApprovalBinding::class, 'approval_binding_id');
    }
}
