<?php

namespace Tests\Feature;

use App\Mail\AdminDonationNotification;
use App\Mail\DonationConfirmation;
use App\Models\Campaign;
use App\Models\Donation;
use App\Models\Donor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class DonationApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_donation_creates_donor_and_updates_campaign_total(): void
    {
        Mail::fake();

        $campaign = Campaign::factory()->create([
            'current_amount' => 100,
            'target_amount' => 5000,
            'status' => 'active',
        ]);

        $response = $this->postJson('/api/donations', [
            'donor_name' => 'Ali Hassan',
            'donor_email' => 'ali@example.com',
            'donor_phone' => '01000000000',
            'campaign_id' => $campaign->id,
            'amount' => 250,
            'payment_method' => 'card',
            'status' => 'completed',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.amount', 250);

        $this->assertDatabaseHas('donors', [
            'name' => 'Ali Hassan',
            'email' => 'ali@example.com',
        ]);

        $this->assertDatabaseHas('donations', [
            'campaign_id' => $campaign->id,
            'amount' => 250,
            'status' => 'completed',
        ]);

        $campaign->refresh();
        $this->assertSame('350.00', $campaign->current_amount);

        Mail::assertQueued(DonationConfirmation::class);
        Mail::assertQueued(AdminDonationNotification::class);
    }

    public function test_admin_can_update_donation_and_campaign_total_is_adjusted(): void
    {
        $admin = User::factory()->admin()->create();
        $campaign = Campaign::factory()->create([
            'current_amount' => 100,
            'status' => 'active',
        ]);
        $donor = Donor::factory()->create();
        $donation = Donation::factory()->create([
            'donor_id' => $donor->id,
            'campaign_id' => $campaign->id,
            'amount' => 100,
            'status' => 'completed',
        ]);

        Sanctum::actingAs($admin);

        $this->putJson("/api/donations/{$donation->id}", [
            'donor_id' => $donor->id,
            'campaign_id' => $campaign->id,
            'amount' => 300,
            'payment_method' => 'bank_transfer',
            'status' => 'completed',
        ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.amount', 300);

        $campaign->refresh();
        $this->assertSame('300.00', $campaign->current_amount);
    }
}
