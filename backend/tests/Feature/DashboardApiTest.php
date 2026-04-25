<?php

namespace Tests\Feature;

use App\Models\Campaign;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_view_dashboard_stats(): void
    {
        $admin = User::factory()->admin()->create();
        $campaign = Campaign::factory()->create([
            'status' => 'active',
            'current_amount' => 1200,
            'target_amount' => 5000,
        ]);
        $donor = Donor::factory()->create();
        Donation::factory()->create([
            'donor_id' => $donor->id,
            'campaign_id' => $campaign->id,
            'amount' => 1200,
            'status' => 'completed',
            'donated_at' => now()->subDay(),
        ]);
        Volunteer::create([
            'name' => 'Volunteer One',
            'email' => 'volunteer@example.com',
            'phone' => '0123456789',
            'skills' => 'Field support',
        ]);

        Sanctum::actingAs($admin);

        $this->getJson('/api/dashboard/stats')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.total_donations', 1200)
            ->assertJsonPath('data.total_donors', 1)
            ->assertJsonPath('data.total_campaigns', 1)
            ->assertJsonPath('data.active_campaigns', 1)
            ->assertJsonPath('data.total_volunteers', 1)
            ->assertJsonCount(1, 'data.top_campaigns');
    }
}
