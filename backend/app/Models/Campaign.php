<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'target_amount',
        'current_amount',
        'start_date',
        'end_date',
        'status',
        'image_url',
    ];

    protected function casts(): array
    {
        return [
            'target_amount' => 'decimal:2',
            'current_amount' => 'decimal:2',
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function getProgressPercentageAttribute(): float
    {
        if ($this->target_amount <= 0) return 0;
        return min(round(($this->current_amount / $this->target_amount) * 100, 1), 100);
    }

    public function getIsActiveAttribute(): bool
    {
        if ($this->status !== 'active') return false;
        if ($this->end_date && $this->end_date->isPast()) return false;
        return true;
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')
                     ->where(function ($q) {
                         $q->whereNull('end_date')
                           ->orWhere('end_date', '>=', now());
                     });
    }
}
