package com.stripe.stripe_payment.controller;

import com.stripe.model.Charge;
import com.stripe.stripe_payment.client.StripeClient;
import com.stripe.stripe_payment.kafka.PaymentStatusProducer;  // Ensure this is imported
import com.stripe.stripe_payment.response.ChargeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private final StripeClient stripeClient;
    private final PaymentStatusProducer paymentStatusProducer;

    @Autowired
    public PaymentGatewayController(StripeClient stripeClient, PaymentStatusProducer paymentStatusProducer) {
        this.stripeClient = stripeClient;
        this.paymentStatusProducer = paymentStatusProducer;
    }

    @PostMapping("/charge")
    public ResponseEntity<ChargeResponse> chargeCard(@RequestHeader(value = "token") String token,
                                                     @RequestHeader(value = "amount") Double amount) {
        try {
            Charge charge = stripeClient.chargeNewCard(token, amount);

            // Send a structured success message to Kafka
            paymentStatusProducer.sendPaymentStatus("successful", charge.getId(), charge.getAmount() / 100.0, charge.getCurrency());

            // Return the response with charge details
            ChargeResponse response = new ChargeResponse(charge.getId(), charge.getStatus(), charge.getAmount(), charge.getCurrency());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Send a structured failure message to Kafka
            paymentStatusProducer.sendPaymentStatus("failed", null, amount, "GBP");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
