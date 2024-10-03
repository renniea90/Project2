package com.stripe.stripe_payment.client;

import com.stripe.model.Charge;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class StripeClientTest {
    // Create an instance of the real StripeClient
    private final StripeClient stripeClient = new StripeClient();

    @Test
    void testChargeCard_RealApiCall() throws Exception {
        // Arrange: The card token and the amount to charge
        String cardToken = "tok_visa"; // Test Visa token
        double amountToCharge = 50.0;  // Amount in GBP (50 GBP)

        // Act: Charge the card using the StripeClient
        Charge charge = stripeClient.chargeNewCard(cardToken, amountToCharge);

        // Assert: Verify the charge details
        assertNotNull(charge); // Ensure the charge object is not null
        assertEquals(5000L, charge.getAmount()); // Stripe uses cents (50 GBP = 5000 pence)
        assertEquals("gbp", charge.getCurrency()); // Ensure the currency is GBP
        assertEquals("succeeded", charge.getStatus()); // Ensure the charge succeeded
    }
}

//PURPOSE: Ensure when a customer uses checkout that they are correctly charges using the Stripe API