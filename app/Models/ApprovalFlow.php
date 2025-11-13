<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ApprovalFlow extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_approval_flows';

    protected $fillable = [
        'company_id',
        'name',
        'target',
        'is_active',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    // リレーション
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function approvalSteps()
    {
        return $this->hasMany(ApprovalStep::class, 'approval_flow_id');
    }

    public function approvalBindings()
    {
        return $this->hasMany(ApprovalBinding::class, 'flow_id');
    }
}
