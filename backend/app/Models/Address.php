<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'street_address',
        'apartment',
        'city',
        'state',
        'postal_code',
        'country',
        'address_type',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getFullAddressAttribute(): string
    {
        $address = "{$this->street_address}";
        if ($this->apartment) {
            $address .= ", {$this->apartment}";
        }
        $address .= ", {$this->city}, {$this->state} {$this->postal_code}, {$this->country}";
        return $address;
    }
}
