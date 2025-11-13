<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PayItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_pay_items';

    protected $fillable = [
        'company_id',
        'code',
        'name',
        'kind',
        'calc_base',
        'taxable',
        'social_insurance',
        'order_no',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'taxable' => 'boolean',
            'social_insurance' => 'boolean',
            'order_no' => 'integer',
        ];
    }

    // リレーション
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function payLines()
    {
        return $this->hasMany(PayLine::class, 'pay_item_id');
    }
}
