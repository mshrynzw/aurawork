<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'm_permissions';

    protected $fillable = [
        'key',
        'description',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    // リレーション
    public function rolePermissions()
    {
        return $this->hasMany(RolePermission::class, 'permission_id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'r_role_permissions', 'permission_id', 'role_id');
    }
}
