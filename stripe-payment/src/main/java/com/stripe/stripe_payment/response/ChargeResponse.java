package com.stripe.stripe_payment.response;

public class ChargeResponse {

    private String id;
    private String status;
    private Long amount;
    private String currency;

    // Constructor
    public ChargeResponse(String id, String status, Long amount, String currency) {
        this.id = id;
        this.status = status;
        this.amount = amount;
        this.currency = currency;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
