<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __construct(protected DashboardService $service) {}

    public function analytics(): JsonResponse
    {
        $stats = $this->service->getStats();

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    public function stats(): JsonResponse
    {
        return $this->analytics();
    }
}
