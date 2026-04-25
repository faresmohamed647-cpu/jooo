<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_id',
        'campaign_id',
        'amount',
        'payment_method',
        'status',
        'donated_at',
        'reference',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'donated_at' => 'datetime',
        ];
    }

    public function donor()
    {
        return $this->belongsTo(Donor::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    protected static function booted()
    {
        static::creating(function ($donation) {
            if (!$donation->reference) {
                $donation->reference = 'D' . str_pad(static::count() + 1, 5, '0', STR_PAD_LEFT);
            }
            if (!$donation->donated_at) {
                $donation->donated_at = now();
            }
        });
    }
}
