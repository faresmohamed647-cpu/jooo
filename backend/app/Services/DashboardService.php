<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\Donor;
use App\Models\Campaign;
use App\Models\Volunteer;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getStats(): array
    {
        $totalDonations = Donation::where('status', 'completed')->sum('amount');
        $totalDonors = Donor::count();
        $totalCampaigns = Campaign::count();
        $activeCampaigns = Campaign::active()->count();
        $totalVolunteers = Volunteer::count();

        // Monthly chart (last 6 months)
        $monthlyChart = Donation::where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw("strftime('%m', created_at) as month_num"),
                DB::raw("SUM(amount) as total")
            )
            ->groupBy('month_num')
            ->orderBy('month_num')
            ->get()
            ->map(function ($item) {
                $months = ['01'=>'Jan','02'=>'Feb','03'=>'Mar','04'=>'Apr','05'=>'May','06'=>'Jun',
                           '07'=>'Jul','08'=>'Aug','09'=>'Sep','10'=>'Oct','11'=>'Nov','12'=>'Dec'];
                return [
                    'month' => $months[$item->month_num] ?? $item->month_num,
                    'total' => (float) $item->total,
                ];
            });

        // Recent donations
        $recentDonations = Donation::with(['donor', 'campaign'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($d) => [
                'id' => $d->id,
                'donor_name' => $d->donor?->name ?? 'Anonymous',
                'amount' => (float) $d->amount,
                'campaign' => $d->campaign?->name ?? 'General',
                'date' => $d->created_at->format('Y-m-d'),
            ]);

        // Top campaigns
        $topCampaigns = Campaign::orderBy('current_amount', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'target' => (float) $c->target_amount,
                'collected' => (float) $c->current_amount,
                'progress' => $c->progress_percentage,
            ]);

        return [
            'total_donations' => (float) $totalDonations,
            'total_donors' => $totalDonors,
            'total_campaigns' => $totalCampaigns,
            'active_campaigns' => $activeCampaigns,
            'total_volunteers' => $totalVolunteers,
            'monthly_chart' => $monthlyChart,
            'recent_donations' => $recentDonations,
            'top_campaigns' => $topCampaigns,
        ];
    }
}
