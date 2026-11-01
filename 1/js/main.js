// js/main.js

// --- 選取 各個組件的 元素 ---
const groupButtonsEl = document.getElementById("group-buttons");
const currentGroupTitleEl = document.getElementById("current-group-title");
const productListEl = document.getElementById("product-list");
const cartListEl = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");

// --- 團體分類按鈕 ---
function renderGroupNav() {
  groupButtonsEl.innerHTML = "";
  
  kpopData.forEach(group => {
    const btn = document.createElement("button");
    btn.className = "nav-btn";
    btn.textContent = group.groupName;
    
    // 點擊團體按鈕時，會顯示該團體的商品
    btn.addEventListener("click", () => {
      displayProductsByGroup(group.groupId);
    });
    
    groupButtonsEl.appendChild(btn);
  });
}

// --- 依據團體的ID 渲染商品列表 ---
function displayProductsByGroup(groupId) {
  const groupObj = kpopData.find(g => g.groupId === groupId);
  if (!groupObj) return;

  currentGroupTitleEl.textContent = `${groupObj.groupName} 周邊商品`;
  productListEl.innerHTML = "";

  groupObj.products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>分類：${product.category}</p>
      <p class="price">NT$ ${product.price}</p>
      <button onclick="handleAddToCart('${groupObj.groupId}', '${product.id}')">加入購物車</button>
    `;
    productListEl.appendChild(card);
  });
}

// --- 這裡是用來處理加入購物車的點擊事件 ---
function handleAddToCart(groupId, productId) {
  const groupObj = kpopData.find(g => g.groupId === groupId);
  const product = groupObj.products.find(p => p.id === productId);

  if (product) {
    addItemToCart(product); // 呼叫 cart.js 的函式
    renderCartView();       // 更新購物車的畫面
  }
}

// --- 渲染(把程式碼轉化成使用者肉眼看得見的畫面過程)購物車畫面與更新金額 ---
function renderCartView() {
  cartListEl.innerHTML = "";

  // 異常處理：購物車無資料時，會出現目前購物車沒有選購商品
  if (cart.length === 0) {
    cartListEl.innerHTML = "<p class='empty-text'>目前購物車沒有選購商品</p>";
    totalPriceEl.textContent = "0";
    return;
  }

  cart.forEach(item => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div>NT$ ${item.price}</div>
      </div>
      <div class="controls">
        <button onclick="handleQuantityChange('${item.id}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="handleQuantityChange('${item.id}', 1)">+</button>
        <button onclick="handleRemoveItem('${item.id}')" class="del-btn">刪除</button>
      </div>
    `;
    cartListEl.appendChild(itemEl);
  });

  // 更新總金額
  totalPriceEl.textContent = calculateTotal();
}

// --- 處理數量調整 ---
function handleQuantityChange(productId, amount) {
  updateItemQuantity(productId, amount);
  renderCartView();
}

// --- 處理刪除商品（跳出確認視窗） ---
function handleRemoveItem(productId) {
  if (confirm("確定要將此周邊商品從購物車移除嗎？")) {
    removeItemFromCart(productId);
    renderCartView();
  }
}

/**
 * 處理刪除全部（清空購物車）
 */
function handleClearCart() {
  if (cart.length === 0) {
    alert("購物車已經是空的囉！");
    return;
  }

  if (confirm("確定要清空購物車內的所有周邊商品嗎？")) {
    clearAllCart();   // 呼叫 cart.js 的清空函式
    renderCartView(); // 重新渲染畫面
  }
}

/**
 * 處理結帳按鈕
 */
function handleCheckout() {
  if (cart.length === 0) {
    alert("購物車是空的，無法進行結帳！");
    return;
  }

  const total = calculateTotal();
  alert(`感謝您的購買！本次結帳總金額為：NT$ ${total}\n訂單已成立！`);
  
  clearAllCart();
  renderCartView();
}

// 綁定按鈕點擊事件
clearCartBtn.addEventListener("click", handleClearCart);
checkoutBtn.addEventListener("click", handleCheckout);

// --- 初始化執行 ---
renderGroupNav();
// 預設載入第一個團體的商品
if (kpopData.length > 0) {
  displayProductsByGroup(kpopData[0].groupId);
}
renderCartView();