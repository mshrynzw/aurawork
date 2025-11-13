<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_employments';

    protected $fillable = [
        'user_id',
        'employment_type',
        'base_hourly_rate',
        'base_monthly_salary',
        'work_hours_per_week',
        'effective_from',
        'effective_to',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'base_hourly_rate' => 'decimal:2',
            'base_monthly_salary' => 'decimal:2',
            'work_hours_per_week' => 'decimal:2',
            'effective_from' => 'date',
            'effective_to' => 'date',
        ];
    }

    // リレーション
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
