<?php

namespace App\Services;

use App\Models\Donor;
use App\Models\Donation;
use Illuminate\Pagination\LengthAwarePaginator;

class DonationService
{
    public function list(array $filters = []): LengthAwarePaginator
    {
        $query = Donation::with(['donor', 'campaign']);

        if (!empty($filters['campaign_id'])) {
            $query->where('campaign_id', $filters['campaign_id']);
        }

        if (!empty($filters['donor_id'])) {
            $query->where('donor_id', $filters['donor_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%");
            });
        }

        return $query->orderBy('created_at', 'desc')->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): Donation
    {
        if (empty($data['donor_id'])) {
            $donor = Donor::create([
                'name' => $data['donor_name'],
                'email' => $data['donor_email'] ?? null,
                'phone' => $data['donor_phone'] ?? null,
            ]);

            $data['donor_id'] = $donor->id;
        }

        unset($data['donor_name'], $data['donor_email'], $data['donor_phone']);

        return Donation::create($data)->load(['donor', 'campaign']);
    }

    public function update(Donation $donation, array $data): Donation
    {
        $donation->update($data);
        return $donation->fresh();
    }

    public function delete(Donation $donation): void
    {
        $donation->delete();
    }

    public function find(int $id): Donation
    {
        return Donation::with(['donor', 'campaign'])->findOrFail($id);
    }
}
