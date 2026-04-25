<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function adminAlert(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['nullable', 'string', 'max:1000'],
        ]);

        $message = $validated['message'] ?? 'New notification';

        \Log::info('Admin Alert: ' . $message);

        return response()->json([
            'success' => true,
            'message' => 'Notification received',
        ]);
    }

    public function sendDonationAlert(Request $request): JsonResponse
    {
        return $this->adminAlert($request);
    }
}
