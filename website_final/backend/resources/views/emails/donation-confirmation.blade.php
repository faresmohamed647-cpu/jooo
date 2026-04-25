<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
<div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <h1 style="color:#16a34a;margin-bottom:10px;">Thank You for Your Donation!</h1>
    <p>Dear {{ $donation->donor?->name ?? 'Valued Donor' }},</p>
    <p>We have received your donation and are incredibly grateful for your generosity.</p>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Reference</td><td style="padding:8px;border-bottom:1px solid #eee;">{{ $donation->reference }}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Amount</td><td style="padding:8px;border-bottom:1px solid #eee;">${{ number_format($donation->amount, 2) }}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Campaign</td><td style="padding:8px;border-bottom:1px solid #eee;">{{ $donation->campaign?->name ?? 'General Fund' }}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Date</td><td style="padding:8px;border-bottom:1px solid #eee;">{{ $donation->donated_at?->format('M d, Y') }}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Status</td><td style="padding:8px;color:#16a34a;font-weight:bold;">{{ ucfirst($donation->status) }}</td></tr>
    </table>
    <p>Your contribution makes a real difference. Thank you for your kindness!</p>
    <p style="color:#888;font-size:0.85em;">— Nour Al-Kheir Team</p>
</div>
</body>
</html>
