package com.stripe.stripe_payment.kafka;

import com.stripe.stripe_payment.service.PaymentLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentStatusConsumer {

    private final PaymentLogService paymentLogService;

    @Autowired
    public PaymentStatusConsumer(PaymentLogService paymentLogService) {
        this.paymentLogService = paymentLogService;
    }

    @KafkaListener(topics = "payment-status", groupId = "payment_group")
    public void listen(String message) {
        System.out.println("Received Message: " + message);

        // Delegate the processing of the message to the PaymentLogService
        paymentLogService.processPaymentStatus(message);
    }
}
