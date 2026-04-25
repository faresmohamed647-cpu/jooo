<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'address',
    ];

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function getTotalDonationsAttribute()
    {
        return $this->donations()->where('status', 'completed')->sum('amount');
    }
}
