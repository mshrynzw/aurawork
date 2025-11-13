<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayRun extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_pay_runs';

    protected $fillable = [
        'company_id',
        'period_start',
        'period_end',
        'pay_date',
        'status',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'period_start' => 'date',
            'period_end' => 'date',
            'pay_date' => 'date',
        ];
    }

    // リレーション
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function paySlips()
    {
        return $this->hasMany(PaySlip::class, 'pay_run_id');
    }
}
