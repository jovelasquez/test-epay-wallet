<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentConfirm extends Mailable
{
    use Queueable, SerializesModels;

    protected $payment;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($payment)
    {
        $this->payment = $payment;
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.payments.confirm')
            ->with([
                'token' => $this->payment->token,
                'url' => env('APP_CLIENT_URL') .
                    "/wallet/payment/complete?sessionToken={$this->payment->session_token}" .
                    "&token={$this->payment->token}",
            ]);
    }
}
