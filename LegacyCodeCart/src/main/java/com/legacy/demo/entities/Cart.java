package com.legacy.demo.entities;

import com.legacy.demo.classes.CartItemData;
import jakarta.persistence.*;
import org.springframework.data.annotation.Id;


import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItemData> items;

    private String status;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
