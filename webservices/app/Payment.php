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
}
