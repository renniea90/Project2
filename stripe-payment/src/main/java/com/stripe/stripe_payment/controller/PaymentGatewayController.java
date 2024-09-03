package com.stripe.stripe_payment.controller;

import com.stripe.model.Charge;
import com.stripe.stripe_payment.client.StripeClient;
import com.stripe.stripe_payment.response.ChargeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private final StripeClient stripeClient;

    @Autowired
    public PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/charge")
    public ChargeResponse chargeCard(@RequestHeader(value="token") String token,
                                     @RequestHeader(value="amount") Double amount) throws Exception {
        Charge charge = stripeClient.chargeNewCard(token, amount);
        return new ChargeResponse(charge.getId(), charge.getStatus(), charge.getAmount(), charge.getCurrency());
    }
}
