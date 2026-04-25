<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'reference' => $this->reference,
            'donor_id' => $this->donor_id,
            'campaign_id' => $this->campaign_id,
            'amount' => (float) $this->amount,
            'payment_method' => $this->payment_method,
            'status' => $this->status,
            'donated_at' => $this->donated_at?->toISOString(),
            'donor' => new DonorResource($this->whenLoaded('donor')),
            'campaign' => new CampaignResource($this->whenLoaded('campaign')),
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
