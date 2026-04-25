<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\DonorController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\VolunteerController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/auth/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware('signed')
    ->name('verification.verify');
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::post('/auth/email/verification-notification', [AuthController::class, 'sendVerificationEmail'])
    ->middleware(['auth:sanctum', 'throttle:6,1']);

// Public website APIs (no login required)
Route::get('/campaigns', [CampaignController::class, 'index']);
Route::get('/campaigns/{id}', [CampaignController::class, 'show']);
Route::post('/donations', [DonationController::class, 'store']);
Route::post('/volunteers', [VolunteerController::class, 'store']);
Route::post('/notifications/admin-alert', [NotificationController::class, 'adminAlert']);

// Admin dashboard APIs (require admin role)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('donors', DonorController::class);
    Route::apiResource('campaigns', CampaignController::class)->except(['index', 'show']);
    Route::apiResource('donations', DonationController::class)->except(['store']);
    Route::apiResource('volunteers', VolunteerController::class)->except(['store']);
    Route::get('/dashboard/analytics', [DashboardController::class, 'analytics']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('donations', [ReportController::class, 'donations']);
        Route::get('campaigns', [ReportController::class, 'campaigns']);
        Route::get('export/excel', [ReportController::class, 'exportDonationsExcel']);
        Route::get('export/pdf', [ReportController::class, 'exportDonationsPdf']);
        Route::get('export/campaigns/excel', [ReportController::class, 'exportCampaignsExcel']);
        Route::get('export/campaigns/pdf', [ReportController::class, 'exportCampaignsPdf']);
    });
    Route::post('/notifications/send-donation-alert', [NotificationController::class, 'sendDonationAlert']);
    Route::apiResource('users', UserController::class);
});
