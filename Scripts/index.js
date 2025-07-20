
let bagItems;
onload();
function onload() {
  bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
  displayItemsonHomePage();
  updateBagCount();
}

function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  updateBagCount();
}
function updateBagCount() {
  let bagCountElement = document.querySelector('.bag-count');
  if(bagItems.length >0) {
    bagCountElement.style.visibility = 'visible';
    bagCountElement.innerText = bagItems.length;
  } else {
    bagCountElement.style.visibility = 'hidden';
  }
}
function displayItemsonHomePage(){
  let itemsContainerElement = document.querySelector('.items-container');
  if(!itemsContainerElement) {
    return;
  }
  let innerHTML = '';
  items.forEach(item => {
      innerHTML+=`
        <div class="item-container">
                  <img class="item-image" src="${item.image}" alt="item image">
                  <div class="rating">
                      ${item.rating.stars}⭐ | ${item.rating.count}
                  </div>
                  <div class="company-name">
                      ${item.company}
                  </div>
                  <div class="item-name">
                      ${item.item_name}
                  </div>
                  <div class="price">
                      <span class="current-price">Rs${item.current_price}</span>
                      <span class="original-price">Rs${item.original_price}</span>
                      <span class="discount">(${item.discount_percentage}% OFF)</span>
                  </div>
                  <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to bad</button>
              </div>`;
  });
  itemsContainerElement.innerHTML = innerHTML;

}

