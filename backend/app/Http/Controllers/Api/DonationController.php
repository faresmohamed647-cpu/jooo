<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonationRequest;
use App\Http\Resources\DonationResource;
use App\Services\DonationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Mail\DonationConfirmation;
use App\Mail\AdminDonationNotification;
use Illuminate\Support\Facades\Mail;
use Throwable;

class DonationController extends Controller
{
    public function __construct(protected DonationService $service) {}

    public function index(Request $request): JsonResponse
    {
        $donations = $this->service->list($request->all());

        return response()->json([
            'success' => true,
            'data' => DonationResource::collection($donations)->response()->getData(true)['data'],
            'meta' => [
                'current_page' => $donations->currentPage(),
                'last_page' => $donations->lastPage(),
                'per_page' => $donations->perPage(),
                'total' => $donations->total(),
            ],
        ]);
    }

    public function store(StoreDonationRequest $request): JsonResponse
    {
        $donation = $this->service->create($request->validated());

        if ($donation->campaign_id) {
            $campaign = Campaign::find($donation->campaign_id);
            if ($campaign) {
                $campaign->increment('current_amount', $donation->amount);
            }
        }

        $donorEmail = $donation->donor?->email;

        try {
            if ($donorEmail) {
                Mail::to($donorEmail)->queue(new DonationConfirmation($donation));
            }
            Mail::to('admin@charity.com')->queue(new AdminDonationNotification($donation));
        } catch (Throwable $exception) {
            report($exception);
        }

        return response()->json([
            'success' => true,
            'message' => 'Donation created successfully',
            'data' => new DonationResource($donation),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $donation = $this->service->find($id);

        return response()->json([
            'success' => true,
            'data' => new DonationResource($donation),
        ]);
    }

    public function update(StoreDonationRequest $request, int $id): JsonResponse
    {
        $donation = $this->service->find($id);
        $oldAmount = $donation->amount;
        $oldCampaignId = $donation->campaign_id;
        $donation = $this->service->update($donation, $request->validated());

        if ($oldCampaignId && $oldCampaignId !== $donation->campaign_id) {
            Campaign::find($oldCampaignId)?->decrement('current_amount', $oldAmount);
            if ($donation->campaign_id) {
                Campaign::find($donation->campaign_id)?->increment('current_amount', $donation->amount);
            }
        } elseif ($donation->campaign_id && $donation->amount != $oldAmount) {
            Campaign::find($donation->campaign_id)?->increment('current_amount', $donation->amount - $oldAmount);
        }

        return response()->json([
            'success' => true,
            'message' => 'Donation updated successfully',
            'data' => new DonationResource($donation),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $donation = $this->service->find($id);
        $amount = $donation->amount;
        $campaignId = $donation->campaign_id;

        $this->service->delete($donation);

        if ($campaignId) {
            Campaign::find($campaignId)?->decrement('current_amount', $amount);
        }

        return response()->json([
            'success' => true,
            'message' => 'Donation deleted successfully',
        ]);
    }
}
