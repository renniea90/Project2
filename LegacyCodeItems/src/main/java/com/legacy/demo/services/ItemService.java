package com.legacy.demo.services;

import com.legacy.demo.dtos.ItemDto;
import com.legacy.demo.entities.Item;
import com.legacy.demo.repos.ItemRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepo repo;

    public ItemService(ItemRepo repo) {
        this.repo = repo;
    }

    public List<ItemDto> getAll() {
        return repo.findAll().stream().map(ItemDto::new).toList();
    }

    public ResponseEntity<?> getItem(Integer id) {
        Optional<Item> item = repo.findById(id);
        if (item.isPresent()) {
            return ResponseEntity.ok(new ItemDto(item.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Updated method to return the newly created item as an ItemDto
    public ResponseEntity<ItemDto> addItem(Item item) {
        Item savedItem = repo.save(item); // Save the item and return the saved instance
        return ResponseEntity.ok(new ItemDto(savedItem)); // Return the saved item as an ItemDto response
    }

    public ResponseEntity<?> removeItem(Integer id) {
        repo.deleteById(id);
        return ResponseEntity.ok("Item removed successfully");
    }

    public ResponseEntity<?> ItemUpdate(Integer id, String name, Double price, Integer quantity, String imageUrl) {
        Optional<Item> optionalItem = repo.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setName(name);
            item.setPrice(price);
            item.setQuantity(quantity);
            item.setImageUrl(imageUrl);
            repo.save(item);
            return ResponseEntity.ok("Item updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> reserveStock(Integer id, int quantity) {
        Optional<Item> optionalItem = repo.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            Integer currentQuantity = item.getQuantity();

            if (currentQuantity == null) {
                return ResponseEntity.status(500).body("Item quantity is not initialized.");
            }

            if (currentQuantity >= quantity) {
                item.setQuantity(currentQuantity - quantity);
                repo.save(item);
                return ResponseEntity.ok(new ItemDto(item));
            } else {
                return ResponseEntity.badRequest().body("Insufficient stock");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> releaseStock(Integer id, int quantity) {
        Optional<Item> optionalItem = repo.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            Integer currentQuantity = item.getQuantity();

            if (currentQuantity == null) {
                return ResponseEntity.status(500).body("Item quantity is not initialized.");
            }

            item.setQuantity(currentQuantity + quantity);
            repo.save(item);
            return ResponseEntity.ok(new ItemDto(item));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
