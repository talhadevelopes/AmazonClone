import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

//array of promises - Promise.all()
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value 1');
        });
    }),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
})



//when we create a promise it runs the inner function immediaely
//allows js to do multiple things at the same time
// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value 1');
//     });
// })
//     .then((value) => {
//         console.log(value);
//         return new Promise((resolve) => {
//             loadCart(() => {
//                 resolve();
//             });
//         });
//     })
//     .then(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });


//this is annonymous func - a func without name
// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });
