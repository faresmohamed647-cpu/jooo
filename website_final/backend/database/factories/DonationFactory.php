<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Donation;
use App\Models\Donor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Donation>
 */
class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition(): array
    {
        return [
            'donor_id' => Donor::factory(),
            'campaign_id' => Campaign::factory(),
            'amount' => fake()->numberBetween(50, 5000),
            'payment_method' => fake()->randomElement(['card', 'bank_transfer', 'cash']),
            'status' => fake()->randomElement(['completed', 'pending', 'failed']),
            'donated_at' => now()->subDays(fake()->numberBetween(0, 20)),
        ];
    }
}
