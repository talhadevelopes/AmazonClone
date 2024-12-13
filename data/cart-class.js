class Cart {
    cartItems = [];
    localStorageKey = '';

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey; // Use the provided key
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const storedItems = localStorage.getItem(this.localStorageKey);
            this.cartItems = storedItems ? JSON.parse(storedItems) : this.getDefaultItems();
        } catch (error) {
            console.error('Failed to load cart items from storage:', error);
            this.cartItems = this.getDefaultItems();
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        } catch (error) {
            console.error('Failed to save cart items to storage:', error);
        }
    }

    addToCart(productId) {
        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

        if (matchingItem) {
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        } else {
            console.error(`Product with ID ${productId} not found.`);
        }
    }

    getDefaultItems() {
        return [
            { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1' },
            { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2' }
        ];
    }
}

// Create separate cart instances with unique localStorage keys
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// Logging the cart instances
console.log('Cart:', cart);
console.log('Business Cart:', businessCart);
