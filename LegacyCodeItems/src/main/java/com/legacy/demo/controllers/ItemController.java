package com.legacy.demo.controllers;

import com.legacy.demo.entities.Item;
import com.legacy.demo.services.ItemService;
import com.legacy.demo.dtos.ItemDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/item")  // This sets the base URL for all endpoints in this controller
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping("/getAll")
    public List<ItemDto> getAll() {
        return this.service.getAll();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getItem(@PathVariable Integer id) {
        return this.service.getItem(id);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody Item item) {
        return this.service.addItem(item);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeItem(@PathVariable Integer id) {
        return this.service.removeItem(id);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Integer id, @RequestBody Item itemUpdate) {
        return this.service.ItemUpdate(id, itemUpdate.getName(), itemUpdate.getPrice(), itemUpdate.getQuantity(), itemUpdate.getImageUrl());
    }

    // Endpoint to reserve stock
    @PostMapping("/reserve/{id}")
    public ResponseEntity<?> reserveStock(@PathVariable Integer id, @RequestBody Map<String, Integer> request) {
        Integer quantity = request.get("quantity");
        return this.service.reserveStock(id, quantity);
    }

    // Endpoint to release stock
    @PostMapping("/release/{id}")
    public ResponseEntity<?> releaseStock(@PathVariable Integer id, @RequestBody Map<String, Integer> request) {
        Integer quantity = request.get("quantity");
        return this.service.releaseStock(id, quantity);
    }
}
