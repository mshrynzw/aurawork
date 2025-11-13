<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaySlip extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_pay_slips';

    protected $fillable = [
        'pay_run_id',
        'user_id',
        'gross_amount',
        'total_deduction',
        'net_amount',
        'currency',
        'status',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'gross_amount' => 'decimal:2',
            'total_deduction' => 'decimal:2',
            'net_amount' => 'decimal:2',
        ];
    }

    // リレーション
    public function payRun()
    {
        return $this->belongsTo(PayRun::class, 'pay_run_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payLines()
    {
        return $this->hasMany(PayLine::class, 'pay_slip_id');
    }
}
