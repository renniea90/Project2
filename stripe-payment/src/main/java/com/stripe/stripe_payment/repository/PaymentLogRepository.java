package com.stripe.stripe_payment.repository;

import com.stripe.stripe_payment.entity.PaymentLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {

    // Find payment logs by payment status and filter by date range
    Page<PaymentLog> findByPaymentStatusContainingAndTimestampBetween(
            String paymentStatus,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Pageable pageable
    );

    // Optional: Find payment logs by status without date range
    Page<PaymentLog> findByPaymentStatusContaining(
            String paymentStatus,
            Pageable pageable
    );
}
