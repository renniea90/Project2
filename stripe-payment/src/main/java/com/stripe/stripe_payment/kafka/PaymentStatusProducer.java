package com.stripe.stripe_payment.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentStatusProducer {

    private static final String TOPIC = "payment-status";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(String message) {
        kafkaTemplate.send(TOPIC, message);
    }
}

//PaymentStatusConsumer & PaymentStatusProducer: These are Kafka services that listen for or send messages about the payment status. The producer sends updates, and the consumer processes messages received from the "payment-status" topic.