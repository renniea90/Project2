package com.stripe.stripe_payment.repository;

import com.stripe.stripe_payment.entity.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {
}
