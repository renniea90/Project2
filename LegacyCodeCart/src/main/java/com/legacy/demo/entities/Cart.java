package com.legacy.demo.entities;

import com.legacy.demo.classes.CartItemData;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.List;
import java.util.UUID;

@Entity
public class Cart {

    @Id
    private String cartId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItemData> items;

    private String status;

    // Constructor to automatically generate a UUID for cartId
    public Cart() {
        this.cartId = UUID.randomUUID().toString();
    }

    // Getters and setters
    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public List<CartItemData> getItems() {
        return items;
    }

    public void setItems(List<CartItemData> items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
