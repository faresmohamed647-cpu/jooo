<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDonorRequest;
use App\Http\Requests\UpdateDonorRequest;
use App\Http\Resources\DonorResource;
use App\Services\DonorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DonorController extends Controller
{
    public function __construct(protected DonorService $service) {}

    public function index(Request $request): JsonResponse
    {
        $donors = $this->service->list($request->all());

        return response()->json([
            'success' => true,
            'data' => DonorResource::collection($donors)->response()->getData(true)['data'],
            'meta' => [
                'current_page' => $donors->currentPage(),
                'last_page' => $donors->lastPage(),
                'per_page' => $donors->perPage(),
                'total' => $donors->total(),
            ],
        ]);
    }

    public function store(StoreDonorRequest $request): JsonResponse
    {
        $donor = $this->service->create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Donor created successfully',
            'data' => new DonorResource($donor),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $donor = $this->service->find($id);

        return response()->json([
            'success' => true,
            'data' => new DonorResource($donor),
        ]);
    }

    public function update(UpdateDonorRequest $request, int $id): JsonResponse
    {
        $donor = $this->service->find($id);
        $donor = $this->service->update($donor, $request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Donor updated successfully',
            'data' => new DonorResource($donor),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $donor = $this->service->find($id);
        $this->service->delete($donor);

        return response()->json([
            'success' => true,
            'message' => 'Donor deleted successfully',
        ]);
    }
}
