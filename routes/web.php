<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ダッシュボード（ルート）
Route::get('/', function () {
    return Inertia::render('Dashboard/Index');
})->name('dashboard');

// ログイン
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// ユーザー管理
Route::resource('users', UserController::class)->except(['create', 'show']);

// 勤怠関連
Route::get('/time-entries', function () {
    return Inertia::render('TimeEntries/Index');
})->name('time-entries.index');

Route::get('/time-entries/clock', function () {
    return Inertia::render('TimeEntries/Clock');
})->name('time-entries.clock');

// 休暇関連
Route::get('/leave-requests', function () {
    return Inertia::render('LeaveRequests/Index');
})->name('leave-requests.index');

Route::get('/leave-requests/create', function () {
    return Inertia::render('LeaveRequests/Create');
})->name('leave-requests.create');

Route::get('/leave-balances', function () {
    return Inertia::render('LeaveBalances/Index');
})->name('leave-balances.index');

// 承認関連
Route::get('/approvals', function () {
    return Inertia::render('Approvals/Index');
})->name('approvals.index');

// 給与関連
Route::get('/pay-runs', function () {
    return Inertia::render('PayRuns/Index');
})->name('pay-runs.index');

Route::get('/pay-slips/{id}', function ($id) {
    return Inertia::render('PaySlips/Show', ['id' => $id]);
})->name('pay-slips.show');

// マスタ管理
Route::prefix('masters')->group(function () {
    Route::get('/companies', function () {
        return Inertia::render('Masters/Companies/Index');
    })->name('masters.companies.index');

    Route::get('/departments', function () {
        return Inertia::render('Masters/Departments/Index');
    })->name('masters.departments.index');

    Route::get('/employments', function () {
        return Inertia::render('Masters/Employments/Index');
    })->name('masters.employments.index');

    Route::get('/roles', function () {
        return Inertia::render('Masters/Roles/Index');
    })->name('masters.roles.index');

    Route::get('/permissions', function () {
        return Inertia::render('Masters/Permissions/Index');
    })->name('masters.permissions.index');

    Route::get('/pay-items', function () {
        return Inertia::render('Masters/PayItems/Index');
    })->name('masters.pay-items.index');

    Route::get('/holidays', function () {
        return Inertia::render('Masters/Holidays/Index');
    })->name('masters.holidays.index');

    Route::get('/approval-flows', function () {
        return Inertia::render('Masters/ApprovalFlows/Index');
    })->name('masters.approval-flows.index');
});
