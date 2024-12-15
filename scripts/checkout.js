import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


//this is annonymous func - a func without name
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
