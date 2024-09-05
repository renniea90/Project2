package com.stripe.stripe_payment.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentStatusProducer {

    private static final String TOPIC = "payment-status";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendPaymentStatus(String status, String chargeId, Double amount, String currency) {
        try {
            // Create a structured message using a Map
            Map<String, Object> message = new HashMap<>();
            message.put("status", status);
            message.put("chargeId", chargeId);
            message.put("amount", amount);
            message.put("currency", currency);

            // Convert the message map to JSON
            String messageJson = new ObjectMapper().writeValueAsString(message);

            // Send the JSON message to Kafka
            kafkaTemplate.send(TOPIC, messageJson);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
