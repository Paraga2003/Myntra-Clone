
let bagItemObjects;
onload();
function onload(){
  loadBagItems();
  displayBagItems();
  displayBagSummary();
}
function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  if(!bagSummaryElement) {
    return;
  } 
  if(bagItemObjects.length === 0) {
    bagSummaryElement.innerHTML = '<h2 class="empty-bag">Your bag is empty</h2>';
    return;
  }
  let totalItems = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
  bagItemObjects.forEach(item => {
    totalMRP += item.original_price;
    totalDiscount += (item.original_price - item.current_price);
    finalPayment += item.current_price;
  });
  finalPayment += 99; // Adding convenience fee
  bagSummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItems}) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
  let checkoutButton = document.querySelector('.checkout-button');
  if(checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      alert('Checkout functionality is not implemented yet.');
    });
  }
}
function loadBagItems() {
  bagItemObjects=bagItems.map(itemId => {
    for(let i=0; i < items.length; i++) {
      if(itemId==items[i].id) {
        return items[i];
      }
    }
  });
  console.log(bagItemObjects);
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  if(!containerElement) {
    return;
  }
  if(bagItemObjects.length === 0) {
    containerElement.innerHTML = '<h2 class="empty-bag">Your bag is empty</h2>';
    return;
  }
  containerElement.innerHTML = '';
  let innerHtml = '';
  bagItemObjects.forEach(bagItem => {
    innerHtml += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHtml;
  
}
function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagitemId => bagitemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItems();
  displayBagItems();
  updateBagCount();
  displayBagSummary();
}
function generateItemHTML(item){
  return`
          <div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}" alt="item image">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage})</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})" >X</div>
          </div>

        </div>`;

}