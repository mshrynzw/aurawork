<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LeaveBalance extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_leave_balances';

    protected $fillable = [
        'user_id',
        'type',
        'period_start',
        'period_end',
        'granted',
        'taken',
        'carryover',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'period_start' => 'date',
            'period_end' => 'date',
            'granted' => 'decimal:2',
            'taken' => 'decimal:2',
            'carryover' => 'decimal:2',
        ];
    }

    // リレーション
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
