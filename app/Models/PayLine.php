<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayLine extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 't_pay_lines';

    protected $fillable = [
        'pay_slip_id',
        'pay_item_id',
        'quantity',
        'rate',
        'amount',
        'memo',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:2',
            'rate' => 'decimal:2',
            'amount' => 'decimal:2',
        ];
    }

    // リレーション
    public function paySlip()
    {
        return $this->belongsTo(PaySlip::class, 'pay_slip_id');
    }

    public function payItem()
    {
        return $this->belongsTo(PayItem::class, 'pay_item_id');
    }
}
