package com.stripe.stripe_payment.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentStatusConsumer {

    @KafkaListener(topics = "payment-status", groupId = "payment_group")
    public void listen(String message) {
        System.out.println("Received Message: " + message);
        // Add logic to save to the database or handle payment status
    }
}
