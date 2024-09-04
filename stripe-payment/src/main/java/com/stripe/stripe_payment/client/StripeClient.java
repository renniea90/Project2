package com.stripe.stripe_payment.client;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class StripeClient {

    @Autowired
    public StripeClient() {
        Stripe.apiKey = "sk_test_51PuYbP1u1GNBLV0cJPkTYlh4Fb229rD8LnzMY28aF3wS648QEM0QTAm5l02ugvCaq7EUnlHGgU269FKT4ndx9KNK00LRfCatUM";
    }

    public Customer createCustomer(String token, String email) throws Exception {
        Map<String, Object> customerParams = new HashMap<>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }

    public Charge chargeNewCard(String token, double amount) throws Exception {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int)(amount * 100));
        chargeParams.put("currency", "GBP");  // Set currency to GBP for Pounds Sterling
        chargeParams.put("source", token);
        return Charge.create(chargeParams);
    }
}

//StripeClient: Handles payment interactions with Stripe. It creates customers and charges credit cards via Stripe's API.