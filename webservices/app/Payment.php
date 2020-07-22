<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
class Payment extends Model
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
