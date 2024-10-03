package com.stripe.stripe_payment.controller;

import com.stripe.model.Charge;
import com.stripe.stripe_payment.client.StripeClient;
import com.stripe.stripe_payment.kafka.PaymentStatusProducer;
import com.stripe.stripe_payment.response.ChargeResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class PaymentGatewayControllerTest {

    @Mock
    private StripeClient stripeClient; // Mocked StripeClient

    @Mock
    private PaymentStatusProducer paymentStatusProducer; // Mocked Kafka Producer

    @InjectMocks
    private PaymentGatewayController controller; // Controller that uses mocked dependencies

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initializes the mocks
    }

    @Test
    void testCheckoutChargeCard_MockApiCall() throws Exception {
        // Arrange: Mock the Stripe charge response
        Charge mockCharge = new Charge();
        mockCharge.setId("ch_test_id");
        mockCharge.setAmount(5000L); // 5000 pence = 50 GBP
        mockCharge.setCurrency("gbp");
        mockCharge.setStatus("succeeded");

        // Simulate the StripeClient returning a successful charge
        when(stripeClient.chargeNewCard(any(String.class), any(Double.class))).thenReturn(mockCharge);

        // Act: Simulate the checkout process and charge the card
        ResponseEntity<ChargeResponse> response = controller.chargeCard("tok_visa", 50.0);

        // Assert: Check the response and the charge status
        assertNotNull(response.getBody()); // Ensure the response body is not null
        assertEquals(200, response.getStatusCodeValue()); // Ensure the HTTP status is 200 (OK)
        assertEquals("succeeded", response.getBody().getStatus()); // Ensure the charge status is 'succeeded'
        assertEquals(5000L, response.getBody().getAmount()); // Amount in pence (5000 pence = 50 GBP)
        assertEquals("gbp", response.getBody().getCurrency()); // Ensure the currency is GBP
    }
}
