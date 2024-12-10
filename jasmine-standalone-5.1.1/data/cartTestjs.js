import { addToCart, cart, loadFromStorage } from "../../data/cart.js";


describe('test suite: add to cart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); // Mock an empty cart in storage
        });

        loadFromStorage(); // Initialize cart from mocked storage

        const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        addToCart(productId); // Add the product to the cart

        // Assert the cart has the expected product
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId);

        // Verify localStorage interactions
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });

    it('increments quantity of an existing product in the cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                { id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 1 }
            ]); // Mock a cart with one product
        });

        loadFromStorage(); // Initialize cart from mocked storage

        const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        addToCart(productId); // Add the same product again

        // Assert the product quantity was incremented
        expect(cart.length).toEqual(2); // Still one product in the cart
        expect(cart[0].quantity).toEqual(1); // Quantity updated

        // Verify localStorage interactions
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    });
});
