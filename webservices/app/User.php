<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'dni', 'name', 'email', 'mobile',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * Relationship with wallet
     *
     * @return void
     */
    public function wallet()
    {
        return $this->hasOne('App\Wallet', 'user_id', 'id');
    }

    /**
     * Get User by dni function
     *
     * @param Builder $query
     * @param string $dni
     * @return Builder
     */
    public function scopeDni($query, $dni)
    {
        return $query->where('dni', $dni);
    }

    /**
     * Get User by mobile function
     *
     * @param Builder $query
     * @param string $mobile
     * @return Builder
     */
    public function scopeMobile($query, $mobile)
    {
        return $query->where('mobile', $mobile);
    }

    /**
     * Undocumented function
     *
     * @param [type] $dni
     * @param [type] $mobile
     * @return void
     */
    public static function findByDniAndMobile($dni, $mobile)
    {
        return (new static)::dni($dni)->mobile($mobile)->first();
    }
}
