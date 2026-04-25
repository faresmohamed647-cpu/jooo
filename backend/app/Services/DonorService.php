<?php

namespace App\Services;

use App\Models\Donor;
use Illuminate\Pagination\LengthAwarePaginator;

class DonorService
{
    public function list(array $filters = []): LengthAwarePaginator
    {
        $query = Donor::query()->withSum(['donations' => fn($q) => $q->where('status', 'completed')], 'amount');

        if (!empty($filters['search'])) {
            $s = $filters['search'];
            $query->where(function ($q) use ($s) {
                $q->where('name', 'like', "%{$s}%")
                  ->orWhere('email', 'like', "%{$s}%")
                  ->orWhere('phone', 'like', "%{$s}%")
                  ->orWhere('address', 'like', "%{$s}%");
            });
        }

        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $allowed = ['name', 'email', 'phone', 'created_at'];
        if (in_array($sortBy, $allowed)) {
            $query->orderBy($sortBy, $sortDir);
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): Donor
    {
        return Donor::create($data);
    }

    public function update(Donor $donor, array $data): Donor
    {
        $donor->update($data);
        return $donor->fresh();
    }

    public function delete(Donor $donor): void
    {
        $donor->delete();
    }

    public function find(int $id): Donor
    {
        return Donor::withSum(['donations' => fn($q) => $q->where('status', 'completed')], 'amount')->findOrFail($id);
    }
}
