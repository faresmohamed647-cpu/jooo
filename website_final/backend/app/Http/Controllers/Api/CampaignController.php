<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Http\Resources\CampaignResource;
use App\Services\CampaignService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function __construct(protected CampaignService $service) {}

    public function index(Request $request): JsonResponse
    {
        $campaigns = $this->service->list($request->all());

        return response()->json([
            'success' => true,
            'data' => CampaignResource::collection($campaigns)->response()->getData(true)['data'],
            'meta' => [
                'current_page' => $campaigns->currentPage(),
                'last_page' => $campaigns->lastPage(),
                'per_page' => $campaigns->perPage(),
                'total' => $campaigns->total(),
            ],
        ]);
    }

    public function store(StoreCampaignRequest $request): JsonResponse
    {
        $campaign = $this->service->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Campaign created successfully',
            'data' => new CampaignResource($campaign),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $campaign = $this->service->find($id);

        return response()->json([
            'success' => true,
            'data' => new CampaignResource($campaign),
        ]);
    }

    public function update(UpdateCampaignRequest $request, int $id): JsonResponse
    {
        $campaign = $this->service->find($id);
        $campaign = $this->service->update($campaign, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Campaign updated successfully',
            'data' => new CampaignResource($campaign),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $campaign = $this->service->find($id);
        $this->service->delete($campaign);

        return response()->json([
            'success' => true,
            'message' => 'Campaign deleted successfully',
        ]);
    }
}
