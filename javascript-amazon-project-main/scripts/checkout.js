import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function renderOrderSummary(){
    let fullHTML = '';
cart.forEach((cartItem, index )=>{
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if(productId === product.id) matchingProduct = product; 

  })

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption

  deliveryOptions.forEach((option)=> {
    if (option.id == deliveryOptionId){
      deliveryOption = option;
      console.log(deliveryOption)
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  let html = `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date ">
              Delivert date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="js-delete-link delete-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${getdeliveryOption(index, cartItem)}
                </div>
              </div>
            </div>
          </div>
          `;
          fullHTML += html;
})

document.querySelector('.order-summary').innerHTML = fullHTML;


function getdeliveryOption(index, cartItem) {
  let html = '';
  deliveryOptions.forEach(deliveryOption => {

    const today = dayjs();
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    html += `
    <div class="delivery-option js-delivery-option" data-product-id = "${cartItem.productId}" data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio" 
      ${isChecked && 'checked'}
        class="delivery-option-input"
        name="delivery-option-${index}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `;
  });

  return html;
}


document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', ()=>{
    removeFromCart(link);
  }
)
})

document.querySelectorAll('.js-delivery-option')
.forEach((element) => {
  element.addEventListener('click', ()=> {
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    renderOrderSummary();
  })
})


}

renderOrderSummary();
