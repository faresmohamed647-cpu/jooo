<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVolunteerRequest;
use App\Http\Resources\VolunteerResource;
use App\Models\Volunteer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VolunteerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Volunteer::query();

        if ($request->has('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('skills', 'like', "%{$s}%");
            });
        }

        $volunteers = $query->orderBy('created_at', 'desc')->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => VolunteerResource::collection($volunteers)->response()->getData(true)['data'],
            'meta' => [
                'current_page' => $volunteers->currentPage(),
                'last_page' => $volunteers->lastPage(),
                'per_page' => $volunteers->perPage(),
                'total' => $volunteers->total(),
            ],
        ]);
    }

    public function store(StoreVolunteerRequest $request): JsonResponse
    {
        $volunteer = Volunteer::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Volunteer registered successfully',
            'data' => new VolunteerResource($volunteer),
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $volunteer = Volunteer::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new VolunteerResource($volunteer),
        ]);
    }

    public function update(StoreVolunteerRequest $request, int $id): JsonResponse
    {
        $volunteer = Volunteer::findOrFail($id);
        $volunteer->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Volunteer updated successfully',
            'data' => new VolunteerResource($volunteer->fresh()),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $volunteer = Volunteer::findOrFail($id);
        $volunteer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Volunteer deleted successfully',
        ]);
    }
}
