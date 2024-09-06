package com.stripe.stripe_payment.controller;

import com.stripe.stripe_payment.entity.PaymentLog;
import com.stripe.stripe_payment.repository.PaymentLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/api/payment-logs")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PaymentLogController {

    private final PaymentLogRepository paymentLogRepository;

    @Autowired
    public PaymentLogController(PaymentLogRepository paymentLogRepository) {
        this.paymentLogRepository = paymentLogRepository;
    }

    @GetMapping
    public ResponseEntity<List<PaymentLog>> getAllPaymentLogs() {
        List<PaymentLog> logs = paymentLogRepository.findAll();
        return new ResponseEntity<>(logs, HttpStatus.OK);
    }
}
