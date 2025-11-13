<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Schedule extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_schedules';

    protected $fillable = [
        'user_id',
        'work_date',
        'start_time',
        'end_time',
        'break_minutes',
        'note',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'work_date' => 'date',
            'break_minutes' => 'integer',
        ];
    }

    // リレーション
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
