package com.stripe.stripe_payment.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.stripe_payment.entity.PaymentLog;
import com.stripe.stripe_payment.repository.PaymentLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PaymentLogService {

    private final PaymentLogRepository paymentLogRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public PaymentLogService(PaymentLogRepository paymentLogRepository) {
        this.paymentLogRepository = paymentLogRepository;
        this.objectMapper = new ObjectMapper();  // This is used to deserialize JSON
    }

    public void processPaymentStatus(String message) {
        try {
            // Convert the JSON string to a Map
            Map<String, Object> messageData = objectMapper.readValue(message, Map.class);

            // Extract the necessary fields from the map
            String status = (String) messageData.get("status");
            String chargeId = (String) messageData.get("chargeId");
            Double amount = (Double) messageData.get("amount");
            String currency = (String) messageData.get("currency");

            // Create and save a PaymentLog entity
            PaymentLog paymentLog = new PaymentLog(chargeId, status, amount, currency);
            paymentLogRepository.save(paymentLog);

            System.out.println("Payment log saved successfully: " + paymentLog);
        } catch (Exception e) {
            System.err.println("Failed to process payment status message: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
