package com.legacy.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.legacy.demo.classes.CartItemData;
import com.legacy.demo.entities.Cart;
import com.legacy.demo.repos.CartRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public CartService(CartRepository cartRepository, RestTemplate restTemplate) {
        this.cartRepository = cartRepository;
        this.restTemplate = restTemplate;
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

            // Reserve stock for each item in the cart using HTTP calls to ItemService
            for (CartItemData itemData : cart.getItems()) {
                String itemServiceUrl = "http://item-service-url/item/reserve/" + itemData.getItemId();
                ResponseEntity<?> response = restTemplate.postForEntity(itemServiceUrl, Map.of("quantity", itemData.getQuantity()), ResponseEntity.class);

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
