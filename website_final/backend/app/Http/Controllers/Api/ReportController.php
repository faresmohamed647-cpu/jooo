<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use App\Models\Campaign;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReportController extends Controller
{
    public function donations(Request $request): JsonResponse
    {
        $query = Donation::with(['donor', 'campaign']);

        if ($request->has('from')) {
            $query->where('donated_at', '>=', $request->from);
        }
        if ($request->has('to')) {
            $query->where('donated_at', '<=', $request->to);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $donations = $query->orderBy('donated_at', 'desc')->get();

        $summary = [
            'total_amount' => $donations->sum('amount'),
            'total_count' => $donations->count(),
            'completed' => $donations->where('status', 'completed')->count(),
            'pending' => $donations->where('status', 'pending')->count(),
            'failed' => $donations->where('status', 'failed')->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'summary' => $summary,
                'donations' => $donations->map(fn($d) => [
                    'reference' => $d->reference,
                    'donor' => $d->donor?->name ?? 'Anonymous',
                    'campaign' => $d->campaign?->name ?? 'General',
                    'amount' => (float) $d->amount,
                    'method' => $d->payment_method,
                    'status' => $d->status,
                    'date' => $d->donated_at?->format('Y-m-d'),
                ]),
            ],
        ]);
    }

    public function campaigns(Request $request): JsonResponse
    {
        $campaigns = Campaign::orderBy('current_amount', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $campaigns->map(fn($c) => [
                'name' => $c->name,
                'target' => (float) $c->target_amount,
                'collected' => (float) $c->current_amount,
                'progress' => $c->progress_percentage,
                'status' => $c->status,
                'start_date' => $c->start_date?->format('Y-m-d'),
                'end_date' => $c->end_date?->format('Y-m-d'),
            ]),
        ]);
    }

    public function exportDonationsExcel(Request $request)
    {
        $donations = Donation::with(['donor', 'campaign'])->orderBy('donated_at', 'desc')->get();

        $csv = "Reference,Donor,Campaign,Amount,Method,Status,Date\n";
        foreach ($donations as $d) {
            $csv .= implode(',', [
                $d->reference,
                '"' . ($d->donor?->name ?? '-') . '"',
                '"' . ($d->campaign?->name ?? 'General') . '"',
                $d->amount,
                $d->payment_method,
                $d->status,
                $d->donated_at?->format('Y-m-d'),
            ]) . "\n";
        }

        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="donations-report.csv"');
    }

    public function exportDonationsPdf(Request $request)
    {
        $donations = Donation::with(['donor', 'campaign'])->orderBy('donated_at', 'desc')->get();
        $pdf = Pdf::loadView('reports.donations-pdf', compact('donations'));
        return $pdf->download('donations-report.pdf');
    }

    public function exportCampaignsExcel(Request $request)
    {
        $campaigns = Campaign::orderBy('current_amount', 'desc')->get();

        $csv = "Campaign,Target,Collected,Progress,Status,Start Date,End Date\n";
        foreach ($campaigns as $c) {
            $csv .= implode(',', [
                '"' . $c->name . '"',
                $c->target_amount,
                $c->current_amount,
                $c->progress_percentage . '%',
                $c->status,
                $c->start_date?->format('Y-m-d') ?? '-',
                $c->end_date?->format('Y-m-d') ?? '-',
            ]) . "\n";
        }

        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="campaigns-report.csv"');
    }

    public function exportCampaignsPdf(Request $request)
    {
        $campaigns = Campaign::orderBy('current_amount', 'desc')->get();
        $pdf = Pdf::loadView('reports.campaigns-pdf', compact('campaigns'));
        return $pdf->download('campaigns-report.pdf');
    }
}
