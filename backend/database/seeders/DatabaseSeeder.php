 يد<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Campaign;
use App\Models\Donor;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AuthSeeder::class);
        
        Donor::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+1234567890',
        ]);

        Campaign::create([
            'name' => 'Build School in Village',
            'description' => 'Help us build education facility.',
            'target_amount' => 50000.00,
            'current_amount' => 12500.00,
            'start_date' => now()->subDays(30),
            'end_date' => now()->addDays(60),
            'status' => 'active',
            'image_url' => 'https://example.com/school.jpg',
        ]);
    }
}