<?php

namespace Database\Factories;

use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Campaign>
 */
class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition(): array
    {
        $target = fake()->numberBetween(5000, 100000);
        $current = fake()->numberBetween(0, $target);

        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'target_amount' => $target,
            'current_amount' => $current,
            'start_date' => now()->subDays(fake()->numberBetween(1, 30))->toDateString(),
            'end_date' => now()->addDays(fake()->numberBetween(10, 60))->toDateString(),
            'status' => fake()->randomElement(['active', 'inactive', 'completed']),
            'image_url' => fake()->imageUrl(1200, 675, 'charity'),
        ];
    }
}
