<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
<div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    <h1 style="color:#3b82f6;margin-bottom:10px;">🔔 New Donation Received</h1>
    <p>A new donation has been received on the platform.</p>
    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Donor</td><td style="padding:8px;border-bottom:1px solid #eee;">{{ $donation->donor?->name ?? 'Anonymous' }}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Amount</td><td style="padding:8px;border-bottom:1px solid #eee;color:#16a34a;font-weight:bold;">${{ number_format($donation->amount, 2) }}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Campaign</td><td style="padding:8px;border-bottom:1px solid #eee;">{{ $donation->campaign?->name ?? 'General Fund' }}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Payment</td><td style="padding:8px;border-bottom:1px solid #eee;">{{ $donation->payment_method }}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;">Reference</td><td style="padding:8px;">{{ $donation->reference }}</td></tr>
    </table>
    <p style="color:#888;font-size:0.85em;">— Nour Al-Kheir System</p>
</div>
</body>
</html>
