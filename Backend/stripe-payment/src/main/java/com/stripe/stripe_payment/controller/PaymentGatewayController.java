package com.stripe.stripe_payment.controller;

import com.stripe.model.Charge;
import com.stripe.stripe_payment.client.StripeClient;
import com.stripe.stripe_payment.kafka.PaymentStatusProducer;
import com.stripe.stripe_payment.response.ChargeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentGatewayController.class);

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
            logger.info("Attempting to charge card with token: {} and amount: {}", token, amount);

            // Call the Stripe client to charge the card
            Charge charge = stripeClient.chargeNewCard(token, amount);
            logger.info("Charge successful: {}", charge);

            // Send a success message to Kafka
            paymentStatusProducer.sendPaymentStatus("successful", charge.getId(), charge.getAmount() / 100.0, charge.getCurrency());
            logger.info("Payment status sent to Kafka: successful");

            // Return the charge response
            ChargeResponse response = new ChargeResponse(charge.getId(), charge.getStatus(), charge.getAmount(), charge.getCurrency());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Log the exception with detailed information
            logger.error("Payment failed for token: {} and amount: {}. Error: {}", token, amount, e.getMessage(), e);

            // Send a failure message to Kafka if the producer is not null
            if (paymentStatusProducer != null) {
                paymentStatusProducer.sendPaymentStatus("failed", null, amount, "GBP");
                logger.info("Payment status sent to Kafka: failed");
            }

            // Return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
