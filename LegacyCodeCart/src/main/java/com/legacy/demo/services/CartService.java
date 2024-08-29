package com.legacy.demo.services;

import com.legacy.demo.classes.CartItemData;
import com.legacy.demo.entities.Cart;
import com.legacy.demo.repos.CartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ItemService itemService;  // Ensure this is properly imported

    public CartService(CartRepository cartRepository, ItemService itemService) {
        this.cartRepository = cartRepository;
        this.itemService = itemService;
    }

    public List<CartItemData> getCart(String cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        return cartOptional.map(Cart::getItems).orElseThrow(() -> new RuntimeException("Cart not found"));
    }

    public String createCartWithItems(List<CartItemData> items) {
        Cart cart = new Cart();
        cart.setItems(items);
        Cart savedCart = cartRepository.save(cart);
        return savedCart.getId();
    }

    public ResponseEntity<?> updateCart(String cartId, List<CartItemData> items, String status) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            cart.setItems(items);
            cart.setStatus(status);
            cartRepository.save(cart);
            return ResponseEntity.ok("Cart updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<?> checkoutCart(String cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (cartOptional.isPresent()) {
            Cart cart = cartOptional.get();

            // Reserve stock for each item in the cart
            for (CartItemData itemData : cart.getItems()) {
                ResponseEntity<?> response = itemService.reserveStock(itemData.getItemId(), itemData.getQuantity());
                if (!response.getStatusCode().is2xxSuccessful()) {
                    return ResponseEntity.badRequest().body("Checkout failed due to insufficient stock for item ID: " + itemData.getItemId());
                }
            }

            cart.setStatus("CHECKED_OUT");
            cartRepository.save(cart);
            return ResponseEntity.ok("Checkout complete");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
