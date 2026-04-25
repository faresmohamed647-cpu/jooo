<?php

namespace App\Services;

use App\Models\Campaign;
use Illuminate\Pagination\LengthAwarePaginator;

class CampaignService
{
    public function list(array $filters = []): LengthAwarePaginator
    {
        $query = Campaign::query();

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['active_only'])) {
            $query->active();
        }

        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('description', 'like', "%{$s}%");
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): Campaign
    {
        $data['current_amount'] = $data['current_amount'] ?? 0;
        $data['start_date'] = $data['start_date'] ?? now()->format('Y-m-d');
        return Campaign::create($data);
    }

    public function update(Campaign $campaign, array $data): Campaign
    {
        $campaign->update($data);
        return $campaign->fresh();
    }

    public function delete(Campaign $campaign): void
    {
        $campaign->delete();
    }

    public function find(int $id): Campaign
    {
        return Campaign::findOrFail($id);
    }
}
