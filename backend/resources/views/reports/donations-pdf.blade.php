<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Donations Report</title></head>
<body style="font-family:Arial,sans-serif;padding:20px;">
<h1 style="color:#3b82f6;border-bottom:2px solid #3b82f6;padding-bottom:10px;">Donations Report</h1>
<p>Generated: {{ now()->format('M d, Y H:i') }}</p>
<table style="width:100%;border-collapse:collapse;margin-top:20px;">
    <thead>
        <tr style="background:#3b82f6;color:#fff;">
            <th style="padding:10px;text-align:left;">Ref</th>
            <th style="padding:10px;text-align:left;">Donor</th>
            <th style="padding:10px;text-align:left;">Campaign</th>
            <th style="padding:10px;text-align:right;">Amount</th>
            <th style="padding:10px;text-align:left;">Method</th>
            <th style="padding:10px;text-align:left;">Status</th>
            <th style="padding:10px;text-align:left;">Date</th>
        </tr>
    </thead>
    <tbody>
        @foreach($donations as $d)
        <tr style="border-bottom:1px solid #eee;">
            <td style="padding:8px;">{{ $d->reference }}</td>
            <td style="padding:8px;">{{ $d->donor?->name ?? '-' }}</td>
            <td style="padding:8px;">{{ $d->campaign?->name ?? 'General' }}</td>
            <td style="padding:8px;text-align:right;font-weight:bold;">${{ number_format($d->amount, 2) }}</td>
            <td style="padding:8px;">{{ $d->payment_method }}</td>
            <td style="padding:8px;">{{ ucfirst($d->status) }}</td>
            <td style="padding:8px;">{{ $d->donated_at?->format('Y-m-d') }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
<p style="margin-top:20px;font-weight:bold;">Total: ${{ number_format($donations->sum('amount'), 2) }}</p>
</body>
</html>
