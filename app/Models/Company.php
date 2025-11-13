<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_companies';

    protected $fillable = [
        'name',
        'code',
        'timezone',
        'start_of_week',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function casts(): array
    {
        return [
            'start_of_week' => 'integer',
        ];
    }

    // リレーション
    public function departments()
    {
        return $this->hasMany(Department::class, 'company_id');
    }

    public function users()
    {
        return $this->hasMany(User::class, 'company_id');
    }

    public function roles()
    {
        return $this->hasMany(Role::class, 'company_id');
    }

    public function payItems()
    {
        return $this->hasMany(PayItem::class, 'company_id');
    }

    public function holidays()
    {
        return $this->hasMany(Holiday::class, 'company_id');
    }

    public function approvalFlows()
    {
        return $this->hasMany(ApprovalFlow::class, 'company_id');
    }

    public function payRuns()
    {
        return $this->hasMany(PayRun::class, 'company_id');
    }
}
