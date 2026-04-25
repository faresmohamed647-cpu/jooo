<?php

namespace Tests\Feature;

use App\Models\Campaign;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CampaignApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_campaign_index_returns_paginated_data(): void
    {
        Campaign::factory()->count(3)->create();

        $this->getJson('/api/campaigns')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'target_amount', 'current_amount', 'progress_percentage', 'is_active'],
                ],
                'meta' => ['current_page', 'last_page', 'per_page', 'total'],
            ]);
    }

    public function test_admin_can_create_campaign(): void
    {
        $admin = User::factory()->admin()->create();
        Sanctum::actingAs($admin);

        $response = $this->postJson('/api/campaigns', [
            'name' => 'Emergency Relief',
            'description' => 'Urgent support campaign',
            'target_amount' => 50000,
            'status' => 'active',
            'start_date' => now()->toDateString(),
            'end_date' => now()->addMonth()->toDateString(),
            'image_url' => 'https://example.com/campaign.jpg',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.name', 'Emergency Relief');

        $this->assertDatabaseHas('campaigns', [
            'name' => 'Emergency Relief',
            'status' => 'active',
        ]);
    }

    public function test_non_admin_cannot_create_campaign(): void
    {
        $user = User::factory()->create([
            'role' => 'user',
        ]);

        Sanctum::actingAs($user);

        $this->postJson('/api/campaigns', [
            'name' => 'Blocked Campaign',
            'target_amount' => 5000,
        ])
            ->assertForbidden()
            ->assertJsonPath('success', false)
            ->assertJsonPath('message', 'Admin access required');
    }
}
