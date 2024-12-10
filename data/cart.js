import { deliveryOptions } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {

    cart =
        [{
            productId: "123",
            quantity: 2,
            deliveryOption: { id: "fast", deliveryDays: 2, priceCents: 499 }
        }
            , {
            productId: "123",
            quantity: 2,
            deliveryOption: { id: "fast", deliveryDays: 2, priceCents: 499 }
        }

        ];

}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionID: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })

    cart = newCart;
    saveToStorage();
}