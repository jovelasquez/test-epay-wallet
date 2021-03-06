<?php

namespace App\Http\Services;

use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class WalletService
{
    /**
     * Recharge Balance Wallet functino
     *
     * @soap
     * @param string $dni
     * @param string $mobile
     * @param float $amount
     * @return array
     */
    public function recharge(string $dni, string $mobile, int $amount)
    {
        // Validar el monto a recargar
        if ($amount <= 0) {
            return [
                "code" => 422,
                "message" => "El monto de la recarga debe ser mayor a 0",
                "errors" => []
            ];
        }

        // Obtener la billetera del usuario a recargar
        $user = User::findByDniAndMobile($dni, $mobile);
        if (!$user) {
            return [
                "code" => 404,
                "message" => "Los datos sumnistrados no existen.",
                "errors" => []
            ];
        }

        try {
            $wallet = $user->wallet;
            $wallet->balance += $amount;
            $wallet->save();

            return [
                "code" => 200,
                "message" => "Saldo Recargado existosamente",
                "payload" => $wallet->toArray()
            ];
        } catch (ModelNotFoundException $exception) {
            return [
                "code" => 500,
                "message" => "Error recarganod la billetera",
                "errors" => $exception
            ];
        }
    }

    /**
     * Obtine el balance de una wallet function
     *
     * @soap
     * @param string $dni
     * @param string $mobile
     * @return array
     */
    public function getBalance(string $dni, string $mobile)
    {
        // Obtener la billetera del usuario
        $user = User::findByDniAndMobile($dni, $mobile);
        if (!$user) {
            return [
                 "code" => 404,
                 "message" => "Los datos sumnistrados no existen.",
                 "errors" => []
             ];
        }
 
        return [
            "code" => 200,
            "message" => "Su saldo disponible",
            "payload" => $user->wallet->toArray()
        ];
    }
}
