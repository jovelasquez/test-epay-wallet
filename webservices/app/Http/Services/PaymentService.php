<?php

namespace App\Http\Services;

use App\User;
use Illuminate\Support\Str;
use App\Mail\PaymentConfirm;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PaymentService
{
    /**
     * Pay a ticket function
     *
     * @soap
     * @param string $dni
     * @param string $mobile
     * @param float $amount
     * @return array
     */
    public function pay(string $dni, string $mobile, int $amount)
    {
        // Validar el monto a recargar
        if ($amount <= 0) {
            return [
                "code" => 422,
                "message" => "El monto del pago debe ser mayor a 0",
                "errors" => []
            ];
        }

        // Obtener la billetera del usuario
        $user = User::findByDniAndMobile($dni, $mobile);
        if (!$user) {
            return [
                "code" => 404,
                "message" => "Los datos sumnistrados no existen.",
                "errors" => []
            ];
        }
        
        $wallet = $user->wallet;
        if ($wallet->balance < $amount) {
            return [
                "code" => 422,
                "message" => "Saldo no disponible",
                "errors" => []
            ];
        }

        try {
            // Registrar un pago
            $pay = $wallet->payments()
                ->create([
                    'session_token' => session()->getId(),
                    'token'=> strtoupper(Str::random(6)),
                    'amount' => $amount,
                ]);

            // Email de confirmacion
            Mail::to($user->email)->send(new PaymentConfirm($pay));

            return [
                "code" => 200,
                "message" => "Usuario creado exitosamente",
                "payload" => $pay->toArray()
            ];
        } catch (ModelNotFoundException $exception) {
            return [
                "code" => 404,
                "message" => "Error creando el pago a la billetera",
                "errors" => $exception
            ];
        }
    }

    /**
     * Payment Confirmation function
     *
     * @soap
     * @param string $sessionToken
     * @param string $token
     * @return array
     */
    public function paymentConfirm(string $sessionToken, string $token)
    {
        return [
            "code" => 201,
            "message" => "Usuario creado exitosamente",
            "payload" => $user->wallet->toArray()
        ];
    }
}
