<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'balance'
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
