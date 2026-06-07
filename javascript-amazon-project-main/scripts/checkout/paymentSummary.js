import { cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";

export function renderPaymentSummary(){
  let itemPrice = 0;
  let shipmentPrice = 0;
  let totalBeforeTaxPrice = 0;
  cart.forEach(element => {
    const productId = element.productId;
    const matchingProduct = getProduct(productId);
    itemPrice += matchingProduct.priceCents*element.quantity;
    const deliveryOption = getDeliveryOption(element.deliveryOptionId);
    console.log(deliveryOption)
    shipmentPrice += deliveryOption.priceCents;
  
})
  totalBeforeTaxPrice = shipmentPrice + itemPrice;
  const taxCents = totalBeforeTaxPrice * 0.1;
  const totalPrice = Number((totalBeforeTaxPrice + taxCents).toFixed(0));
  console.log(itemPrice, shipmentPrice, totalPrice);

  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(itemPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shipmentPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxPrice/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalPrice/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML
}