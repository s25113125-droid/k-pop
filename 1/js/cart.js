// js/cart.js

// 這邊是購物車（存放使用者選購的商品）
let cart = [];

/**
 * 將商品加入購物車
 * @param {Object} product - 商品物件
 */
function addItemToCart(product) {
  //檢查購物車內有沒有該商品
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // 如果沒有，複製商品資料並加上原始數量 1
    cart.push({ ...product, quantity: 1 });
  }
}

/**
 * 從購物車移除商品
 * @param {string} productId - 商品 ID
 */
function removeItemFromCart(productId) {
  // 找到索引位置
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    // 使用 刪除 移除該筆資料
    cart.splice(index, 1);
  }
}

/**
 * 調整購物車內商品數量
 * @param {string} productId - 商品 ID
 * @param {number} amount - 變更數量 (+1 或 -1)
 */
function updateItemQuantity(productId, amount) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  if (item.quantity + amount <= 0) {
    alert("商品數量至少要為 1！若要刪除請點選刪除按鈕。");
    return;
  }

  item.quantity += amount;
}

/**
 * 計算購物車總金額 %%
 * @returns {number} 總金額
 */
function calculateTotal() {
  // 使用 累加（單價 * 數量）%%
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * 清空購物車內所有商品
 */
function clearAllCart() {
  cart = []; // 將購物車陣列重置為空陣列
}