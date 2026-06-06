export let cart = JSON.parse(localStorage.getItem('cart')) || [];


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart (button){
  const productId = button.dataset.productId;
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({productId: productId, quantity:1})
  }
  saveToStorage();
}

export function removeFromCart (link){
  const productId = link.dataset.productId;
  let matchingIndex;
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  console.log(container);
  if (container) {
    container.remove();
  }

}


