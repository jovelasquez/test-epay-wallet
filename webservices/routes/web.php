<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $data = ['name' => "demo"];
    $validator = Validator::make($data, [
        'name' => 'required|max:255',
        'dni' => 'required',
        'email' => 'required',
        'mobile' => 'required',
    ]);
    dump($validator->errors());
    return view('welcome');
});

Route::get('/webservices/{service}/soap', 'WebServiceController@server')->name('soap.wsdl');
Route::post('/webservices/{service}/soap', 'WebServiceController@server')->name('soap');
