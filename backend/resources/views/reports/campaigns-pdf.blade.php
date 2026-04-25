<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Campaigns Report</title></head>
<body style="font-family:Arial,sans-serif;padding:20px;">
<h1 style="color:#16a34a;border-bottom:2px solid #16a34a;padding-bottom:10px;">Campaigns Report</h1>
<p>Generated: {{ now()->format('M d, Y H:i') }}</p>
<table style="width:100%;border-collapse:collapse;margin-top:20px;">
    <thead>
        <tr style="background:#16a34a;color:#fff;">
            <th style="padding:10px;text-align:left;">Campaign</th>
            <th style="padding:10px;text-align:right;">Target</th>
            <th style="padding:10px;text-align:right;">Collected</th>
            <th style="padding:10px;text-align:right;">Progress</th>
            <th style="padding:10px;text-align:left;">Status</th>
            <th style="padding:10px;text-align:left;">Start</th>
            <th style="padding:10px;text-align:left;">End</th>
        </tr>
    </thead>
    <tbody>
        @foreach($campaigns as $c)
        <tr style="border-bottom:1px solid #eee;">
            <td style="padding:8px;font-weight:bold;">{{ $c->name }}</td>
            <td style="padding:8px;text-align:right;">${{ number_format($c->target_amount, 2) }}</td>
            <td style="padding:8px;text-align:right;color:#16a34a;">${{ number_format($c->current_amount, 2) }}</td>
            <td style="padding:8px;text-align:right;">{{ $c->progress_percentage }}%</td>
            <td style="padding:8px;">{{ ucfirst($c->status) }}</td>
            <td style="padding:8px;">{{ $c->start_date?->format('Y-m-d') ?? '-' }}</td>
            <td style="padding:8px;">{{ $c->end_date?->format('Y-m-d') ?? '-' }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
</body>
</html>
