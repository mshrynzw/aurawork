<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_roles';

    protected $fillable = [
        'company_id',
        'slug',
        'name',
        'description',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    // リレーション
    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function userRoles()
    {
        return $this->hasMany(UserRole::class, 'role_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'r_user_roles', 'role_id', 'user_id');
    }

    public function rolePermissions()
    {
        return $this->hasMany(RolePermission::class, 'role_id');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'r_role_permissions', 'role_id', 'permission_id');
    }

    public function approvalSteps()
    {
        return $this->hasMany(ApprovalStep::class, 'approver_role_id');
    }
}
