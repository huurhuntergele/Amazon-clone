export const cart = [];

export function addToCart (button){
  const productId = button.dataset.productId;
  let matchingItem = null;
  cart.forEach((cartItem) => {
  matchingItem = productId === cartItem.productId && cartItem;
  })
  matchingItem && (matchingItem.quantity += 1);
  !matchingItem && (cart.push({productId: productId, quantity:1}));
}

