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

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'session_token',
        'token'
    ];
    
    /**
     * Relationship with wallet
     *
     * @return void
     */
    public function wallet()
    {
        return $this->belongsTo('App\Wallet');
    }

    /**
     * FindBy Session & token function
     *
     * @param string $session
     * @param string $token
     * @return
     */
    public static function findBySessionAndToken($session, $token)
    {
        return (new static)::where("session_token", $session)
            ->where('token', $token)
            ->first();
    }
}
