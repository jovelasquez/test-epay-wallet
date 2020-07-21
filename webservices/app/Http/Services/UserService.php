<?php

namespace App\Http\Services;

use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class UserService
{
    /**
     * Create user function
     *
     * @soap
     * @param string $name
     * @param string $dni
     * @param string $email
     * @param string $mobile
     * @return array
     */
    public function createUser(string $name, string $dni, string $email, string $mobile)
    {
        $validator = $this->validator([
            "name" => $name,
            "dni" => $dni,
            "email" => $email,
            "mobile" => $mobile
        ]);
        
        if ($validator->fails()) {
            return [
                "code" => 422,
                "message" => "Verifique los datos de usuario",
                "errors" => $validator->errors()->toArray()
            ];
        }

        try {

            // Crear usuario
            $user = User::create([
                'name' => $name,
                'dni' => $dni,
                'email' => $email,
                'mobile' => $mobile
            ]);

            if ($user) {
                $user->wallet()->create([ 'balance' => 0 ]);
            }

            return [
                "code" => 200, "message" => "Usuario creado exitosamente",
                "payload" => $user->toArray()
            ];
        } catch (ModelNotFoundException $exception) {
            return [
                "code" => 404, "message" => "Error creando el usuario",
                "errors" => $exception
            ];
        }
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'dni' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'mobile' => 'required|string',
        ]);
    }
}
