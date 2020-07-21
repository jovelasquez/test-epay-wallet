<?php

namespace App;

class Payment
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wallet_id',
        'session_token',
        'amount',
        'token'
    ];

    /**
     * Relationship with wallet
     *
     * @return void
     */
    public function payments()
    {
        return $this->hasMany('App\Payment', 'wallet_id', 'id')
            ->orderBy('created_at', 'DESC');
    }
}
