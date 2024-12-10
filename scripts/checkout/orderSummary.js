import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";


let cartSummaryHTML = "";
const today = dayjs();

export function renderOrderSummary() {

    cart.forEach((cartItem) => {

        const productId = cartItem.productId;
        const matchingProduct = products.find((product) => product.id === productId);

        if (matchingProduct) {
            cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dayjs().add(7, "days").format("dddd, MMMM D")}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" />

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
        }
    });


    // Generate delivery options HTML
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        // Ensure deliveryOption is not undefined
        const selectedDeliveryOption = cartItem.deliveryOption || {};

        return deliveryOptions
            .map((deliveryOption) => {
                const deliveryDate = today.add(deliveryOption.deliveryDays, "days").format("dddd, MMMM D");
                const priceString =
                    deliveryOption.priceCents === 0
                        ? "FREE"
                        : `$${formatCurrency(deliveryOption.priceCents)}`;

                // Check if the current option is selected
                const isChecked = deliveryOption.id === selectedDeliveryOption.id;

                return `
      <div class="delivery-option js-delivery-option" 
      data-product-id-"${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}"
      >
        <input type="radio" ${isChecked ? "checked" : ""} 
          class="delivery-option-input" 
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>`;
            })
            .join("");
    }


    // Update the DOM
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

    // Use event delegation for delete functionality
    document.querySelector(".js-order-summary").addEventListener("click", (event) => {
        if (event.target.classList.contains("js-delete-link")) {
            const productId = event.target.dataset.productId;
            removeFromCart(productId);

            // Remove the corresponding cart item container
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            if (container) {
                container.remove();
            }
        }
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {

            const { productId, deliveryOptionID } = element.dataset;
            updateDeliveryOptions(productId, deliveryOptionID);
            renderOrderSummary();
        })
    })
}

