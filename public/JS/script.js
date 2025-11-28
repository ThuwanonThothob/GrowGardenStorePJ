// ===============================================
//          SCRIPT.JS - (อัปเดต v2 - แก้ไขระบบ Order)
// ===============================================

// === ฐานข้อมูลสินค้า ===
const products = [
  { id: 1, name: "Sunflower", price: 300, img: "images/Sunflower.png", gallery: ["images/Sunflower.png","images/Sunflower.png","images/Sunflower.png"], desc: "หอมสดชื่น ช่วยผ่อนคลาย", benefit: "ลดความเครียด ช่วยให้นอนหลับดี ไล่แมลง", care: "รดน้ำ 2-3 วัน/ครั้ง ชอบแดดอ่อน ระบายน้ำดี", season: "ปลูกได้ตลอดปี", location: "ในร่ม หน้าต่าง ระเบียง", category: "ในร่ม" },
  { id: 2, name: "Hydrangea", price: 500, img: "images/Hydrangea.png", gallery: ["images/Hydrangea.png","images/Hydrangea.png","images/Hydrangea.png"], desc: "จัดดอกไม้สดใหม่ทุกวัน", benefit: "ตกแต่งบ้าน วันเกิด ของขวัญ", care: "เปลี่ยนน้ำทุกวัน ตัดก้านเฉียง", season: "ตลอดปี", location: "โต๊ะอาหาร ห้องนั่งเล่น", category: "ดอกไม้" },
  { id: 3, name: "Wild Himalayan Cherry", price: 350, img: "images/Wild Himalayan Cherry.png", gallery: ["images/Wild Himalayan Cherry.png","images/Wild Himalayan Cherry.png","images/Wild Himalayan Cherry.png"], desc: "ทนทาน ดูแลง่าย", benefit: "ฟอกอากาศ ดูดสารพิษ", care: "รดน้ำเมื่อดินแห้ง ชอบแสงรำไร", season: "ในร่ม ตลอดปี", location: "มุมห้อง มุมโต๊ะทำงาน", category: "ในร่ม" },
  { id: 4, name: "Celosia", price: 180, img: "images/Celosia.png", gallery: ["images/Celosia.png","images/Celosia.png","images/Celosia.png"], desc: "เรียกทรัพย์ ปลูกในบ้านได้", benefit: "เสริมโชคลาภ ฮวงจุ้ย", care: "เปลี่ยนน้ำทุก 7 วัน ชอบแสงรำไร", season: "ในร่ม ตลอดปี", location: "โต๊ะทำงาน หน้าประตู", category: "เสริมโชค" },
  { id: 5, name: "Aster Peacock", price: 250, img: "images/Aster Peacock.png", gallery: ["images/Aster Peacock.png","images/Aster Peacock.png","images/Aster Peacock.png"], desc: "สื่อถึงความรัก", benefit: "แสดงความรัก ของขวัญวันวาเลนไทน์", care: "ตัดดอกเก่า รดน้ำเช้า-เย็น", season: "ฤดูหนาว", location: "ระเบียง หน้าต่าง", category: "ดอกไม้" },
  { id: 6, name: "Tulip", price: 400, img: "images/Tulip.png", gallery: ["images/Tulip.png","images/Tulip.png","images/Tulip.png"], desc: "ตกแต่งสวนได้หลากหลาย", benefit: "เพิ่มความเขียวขจี ฟอกอากาศ", care: "รดน้ำวันละครั้ง ใส่ปุ๋ยเดือนละครั้ง", season: "ฤดูฝน-ฤดูหนาว", location: "สวน ระเบียง", category: "กลางแจ้ง" },
  { id: 7, name: "Chrysanthemum", price: 400, img: "images/Chrysanthemum.png", gallery: ["images/Chrysanthemum.png","images/Chrysanthemum.png","images/Chrysanthemum.png"], desc: "ตกแต่งสวนได้หลากหลาย", benefit: "เพิ่มความเขียวขจี ฟอกอากาศ", care: "รดน้ำวันละครั้ง ใส่ปุ๋ยเดือนละครั้ง", season: "ฤดูฝน-ฤดูหนาว", location: "สวน ระเบียง", category: "กลางแจ้ง" },
  { id: 8, name: "Cutter Flower", price: 400, img: "images/Cutter Flower.png", gallery: ["images/Cutter Flower.png","images/Cutter Flower.png","images/Cutter Flower.png"], desc: "ตกแต่งสวนได้หลากหลาย", benefit: "เพิ่มความเขียวขจี ฟอกอากาศ", care: "รดน้ำวันละครั้ง ใส่ปุ๋ยเดือนละครั้ง", season: "ฤดูฝน-ฤดูหนาว", location: "สวน ระเบียง", category: "กลางแจ้ง" },
  { id: 9, name: "Red lily", price: 400, img: "images/Red lily.png", gallery: ["images/Red lily.png","images/Red lily.png","images/Red lily.png"], desc: "ตกแต่งสวนได้หลากหลาย", benefit: "เพิ่มความเขียวขจี ฟอกอากาศ", care: "รดน้ำวันละครั้ง ใส่ปุ๋ยเดือนละครั้ง", season: "ฤดูฝน-ฤดูหนาว", location: "สวน ระเบียง", category: "กลางแจ้ง" }
];

// === อัปเดตจำนวนตะกร้า ===
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = totalQty;
    el.classList.remove('cart-bounce');
    setTimeout(() => el.classList.add('cart-bounce'), 10);
  });
  
}

// === Toast ===
function showToast(message) {
  document.querySelectorAll('.toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// === เพิ่มลงตะกร้า ===
function addToCartFromModal() {
  const id = window.currentProductId;
  if (!id) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === id);
  const product = products.find(p => p.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} ถูกเพิ่มลงตะกร้า!`);
  document.getElementById('productModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// === หน้า Shop ===
if (document.getElementById('productsGrid')) {
  const grid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  function renderProducts(filtered = products) {
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = '<p style="text-align:center; color:#999; grid-column:1/-1; padding:3rem;">ไม่พบสินค้า</p>';
      return;
    }
    filtered.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product-card';
      div.onclick = () => openModal(p.id);
      div.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="content">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="price">${p.price} บาท</div>
        </div>
      `;
      grid.appendChild(div);
    });
  }

  function filterProducts() {
    const query = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const filtered = products.filter(p => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchCat = cat === 'all' || p.category === cat;
      return matchName && matchCat;
    });
    renderProducts(filtered);
  }

  searchInput.addEventListener('input', filterProducts);
  categoryFilter.addEventListener('change', filterProducts);
  renderProducts();
}

// === Modal สินค้า ===
function openModal(id) {
  window.currentProductId = id;
  const p = products.find(x => x.id === id);
  document.getElementById('mainImg').src = p.gallery[0];
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalDesc').textContent = p.desc;
  document.getElementById('modalBenefit').textContent = p.benefit;
  document.getElementById('modalCare').textContent = p.care;
  document.getElementById('modalSeason').textContent = p.season;
  document.getElementById('modalLocation').textContent = p.location;
  document.getElementById('modalPrice').textContent = `${p.price} บาท`;

  const thumbs = document.getElementById('thumbnails');
  thumbs.innerHTML = '';
  p.gallery.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'thumb';
    if (i === 0) img.classList.add('active');
    img.onclick = () => {
      document.getElementById('mainImg').src = src;
      thumbs.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      img.classList.add('active');
    };
    thumbs.appendChild(img);
  });

  document.getElementById('productModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

document.querySelector('.close')?.addEventListener('click', () => {
  const modal = document.getElementById('productModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('productModal');
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('productModal');
    if (modal && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
});

// === Checkout ===
if (document.getElementById('cartItems')) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemsDiv = document.getElementById('cartItems');
  const totalSummary = document.getElementById('totalSummary');
  const userInfo = document.getElementById('userInfo');

  function renderCart() {
    itemsDiv.innerHTML = '';
    if (cart.length === 0) {
      itemsDiv.innerHTML = '<p style="text-align:center: center; color:#999; padding:2rem;">ตะกร้าว่างเปล่า</p>';
      totalSummary.style.display = 'none';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; flex:1;">
          <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; border-radius:8px;">
          <span style="font-weight:500;">${item.name}</span>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" onclick="decQty(${index})">-</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn" onclick="incQty(${index})">+</button>
        </div>
        <span style="font-weight: 600; color: #000000; min-width: 80px; text-align: right;">${itemTotal} บาท</span>
        <button onclick="removeFromCart(${index})" style="background:#e53935; color:white; border:none; padding:6px 12px; border-radius:8px; font-size:0.9rem; margin-left:10px;">ลบ</button>
      `;
      itemsDiv.appendChild(div);
    });

    const shipping = 50;
    const tax = total * 0.07;
    const grandTotal = total + shipping + tax;

    totalSummary.style.display = 'block';
    totalSummary.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #000000ff;">
        <span>ราคาสินค้า:</span>
        <span>${total.toFixed(2)} บาท</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #000000ff;">
        <span>ค่าจัดส่ง:</span>
        <span>${shipping} บาท</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: #000000ff;">
        <span>ภาษี 7%:</span>
        <span>${tax.toFixed(2)} บาท</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 700; color: #000000ff;">
        <span>ยอดรวมทั้งสิ้น:</span>
        <span>${grandTotal.toFixed(2)} บาท</span>
      </div>
    `;
  }

  window.incQty = (i) => { cart[i].qty++; localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); renderCart(); };
  window.decQty = (i) => { 
    if (cart[i].qty > 1) { cart[i].qty--; } else { removeFromCart(i); }
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount(); 
    renderCart(); 
  };
  window.removeFromCart = (i) => { 
    cart.splice(i, 1); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateCartCount(); 
    renderCart(); 
  };

  document.getElementById('confirmOrder').onclick = async () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!cart.length || !user) return;

  try {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = 50;
    const tax = total * 0.07;
    const grandTotal = total + shipping + tax;

    const res = await fetch('http://localhost:3001/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        total: grandTotal,
        items: cart.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty
        }))
      })
    });

    const data = await res.json();

    if (data.error) throw new Error(data.error);

    // === เก็บ order ลง localStorage ด้วย ===
    const orderKey = 'orders_' + user.email;
    let orders = JSON.parse(localStorage.getItem(orderKey)) || [];
    const newOrder = {
      id: data.id,
      user,
      cart,
      total: grandTotal,
      date: new Date().toLocaleString()
    };
    orders.push(newOrder);
    localStorage.setItem(orderKey, JSON.stringify(orders));

    // === เก็บ key + id ลง sessionStorage สำหรับ order-success.html ===
    sessionStorage.setItem('lastOrderKey', orderKey);
    sessionStorage.setItem('lastOrderId', data.id);

    // ล้างตะกร้า
    localStorage.removeItem('cart');
    updateCartCount();

    location.href = 'order-success.html';

  } catch (err) {
    alert('เกิดข้อผิดพลาด: ' + err.message);
  }
};

  renderCart();
}

// === Order Success ===
if (document.getElementById('orderSummary')) {

  const lastOrderId = sessionStorage.getItem('lastOrderId');
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  console.log('lastOrderId:', lastOrderId);
  console.log('currentUser:', user);

  if (!lastOrderId || !user.id) {
    document.getElementById('orderSummary').innerHTML = '<p>ไม่พบข้อมูลคำสั่งซื้อล่าสุด</p>';
  } else {
    fetch(`http://localhost:3001/api/orders/${user.id}`)
      .then(res => res.json())
      .then(orders => {
        console.log('fetched orders:', orders);

        const order = orders.find(o => o.id == lastOrderId);
        if (!order) {
          document.getElementById('orderSummary').innerHTML = '<p>ไม่พบข้อมูลคำสั่งซื้อล่าสุด</p>';
          return;
        }

        let itemsHTML = '';
        order.items.forEach(i => {
          itemsHTML += `<li>${i.name} (x${i.qty}) - ${i.price * i.qty} บาท</li>`;
        });

        document.getElementById('orderSummary').innerHTML = `
          <p><strong>เลขคำสั่งซื้อ:</strong> #${order.id}</p>
          <p><strong>ชื่อลูกค้า:</strong> ${user.firstName || ''} ${user.lastName || ''}</p>
          <p><strong>รวมทั้งหมด:</strong> ${order.total} บาท</p>
          <p><strong>สั่งซื้อเมื่อ:</strong> ${new Date(order.created_at).toLocaleString()}</p>
          <ul style="margin-top:1rem; text-align:left;">${itemsHTML}</ul> 
        `;

        sessionStorage.removeItem('lastOrderId');
      })
      .catch(err => {
        console.error(err);
        document.getElementById('orderSummary').innerHTML = '<p>ไม่พบข้อมูลคำสั่งซื้อล่าสุด</p>';
      });
  }
}

// === หน้า orders.html ===
let userOrders = []; // [แก้ไข] สร้างตัวแปร global เพื่อให้ modal ใช้งานได้

if (document.getElementById('ordersList')) {
  const ordersList = document.getElementById('ordersList');
  
  // [แก้ไข] ดึงข้อมูล user ปัจจุบัน
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user || !user.email) {
    ordersList.innerHTML = `<p style="text-align:center; color:#999;">กรุณาล็อกอินเพื่อดูประวัติคำสั่งซื้อ</p>`;
  } else {
    // [แก้ไข] ดึงคำสั่งซื้อจาก key ที่ผูกกับอีเมล
    const orderKey = 'orders_' + user.email;
    userOrders = JSON.parse(localStorage.getItem(orderKey)) || []; // [แก้ไข] กำหนดค่าให้ตัวแปร global

    if (userOrders.length === 0) {
      ordersList.innerHTML = `
        <div style="text-align:center; padding: 3rem; color: #999;">
          <i class="fas fa-receipt" style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;"></i>
          <p style="font-size: 1.2rem;">ยังไม่มีคำสั่งซื้อ</p>
          <a href="shop.html" style="color: #2e7d32; text-decoration: underline;">ไปช้อปปิ้งเลย!</a>
        </div>
      `;
    } else {
      userOrders.slice().reverse().forEach(order => { // [แก้ไข] ใช้ userOrders และ .slice() เพื่อไม่ให้ reverse กระทบต้นฉบับ
        const div = document.createElement('div');
        div.className = 'order-card';
        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <strong>คำสั่งซื้อ #${order.id}</strong><br>
              <small>${order.date}</small>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 600; color: #000000ff;">${order.total.toFixed(2)} บาท</div>
              <button onclick="openOrderModal('${order.id}')" style="margin-top: 0.5rem; background: #2e7d32; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 0.9rem;">
                ดูรายละเอียด
              </button>
            </div>
          </div>
        `;
        ordersList.appendChild(div);
      });
    }
  }

  window.openOrderModal = (orderId) => {
    // [แก้ไข] ค้นหาจาก userOrders
    const order = userOrders.find(o => o.id == orderId); // ใช้ == จะ match string กับ number
    if (!order) return;

    document.getElementById('modalOrderId').textContent = `คำสั่งซื้อ #${order.id}`;
    document.getElementById('modalDate').textContent = order.date;
    document.getElementById('modalName').textContent = `${order.user.firstName} ${order.user.lastName}`;
    document.getElementById('modalAddress').textContent = `${order.user.address}, ${order.user.province}`;

    const itemsDiv = document.getElementById('modalItems');
    itemsDiv.innerHTML = '';
    order.cart.forEach(item => {
      itemsDiv.innerHTML += `
        <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
          <span>${item.name} (x${item.qty})</span>
          <span>${(item.price * item.qty).toFixed(2)} บาท</span>
        </div>
      `;
    });

    document.getElementById('modalTotal').textContent = order.total.toFixed(2);
    document.getElementById('orderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  document.querySelector('#orderModal .close').onclick = () => {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  window.onclick = (e) => {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };
}


// ===============================================
// ระบบสมัครสมาชิก + ล็อกอินด้วย Email & Password (แบบสมบูรณ์)
// (ส่วนนี้จะทำงานร่วมกับ index.html ใหม่)
// ===============================================

const authForm = document.getElementById('authForm');
const registerFields = document.getElementById('registerFields');
const formTitle = document.getElementById('formTitle');
const formDesc = document.getElementById('formDesc');
const submitBtn = document.getElementById('submitBtn');
const toggleText = document.getElementById('toggleText');

let isLoginMode = true; // [แก้ไข] เริ่มต้นเป็นโหมดล็อกอิน

// ถ้าเคยสมัครแล้ว → เปิดหน้าเป็น "เข้าสู่ระบบ" ทันที
// [แก้ไข] ปรับปรุง: ถ้ายังไม่เคยมีใครสมัครเลย ให้เริ่มที่ "สมัครสมาชิก"
if (!localStorage.getItem('users')) {
  isLoginMode = false;
}

function updateFormMode() {
  if (isLoginMode) {
    registerFields.style.display = 'none';
    formTitle.textContent = 'ยินดีต้อนรับกลับ';
    formDesc.textContent = 'เข้าสู่ระบบ GrowGarden Store';
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ';
    toggleText.innerHTML = 'ยังไม่มีบัญชี? <a href="#" id="toggleLink" style="color:#2e7d32; text-decoration:underline;">สมัครสมาชิกที่นี่</a>';
    
    // ทำให้ช่อง register ไม่ required ตอนล็อกอิน
    registerFields.querySelectorAll('input, select, textarea').forEach(el => el.required = false);
  } else {
    registerFields.style.display = 'flex';
    formTitle.textContent = 'สมัครสมาชิก GrowGarden';
    formDesc.textContent = 'กรอกข้อมูลเพื่อเริ่มช้อปปิ้งครั้งแรก';
    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> สมัครสมาชิก';
    toggleText.innerHTML = 'มีบัญชีอยู่แล้ว? <a href="#" id="toggleLink" style="color:#2e7d32; text-decoration:underline;">เข้าสู่ระบบที่นี่</a>';
    
    // ทำให้ช่อง register กลับมา required ตอนสมัคร
    registerFields.querySelectorAll('input, select, textarea').forEach(el => {
        if(el.id !== 'age') el.required = true; // 'age' เป็น number อาจจะไม่ต้อง required
    });
    // ยกเว้น input ที่ซ่อนอยู่ (ถ้ามี)
    document.getElementById('firstName').required = true;
    document.getElementById('lastName').required = true;
    document.getElementById('gender').required = true;
    document.getElementById('age').required = true;
    document.getElementById('address').required = true;
    document.getElementById('province').required = true;
  }
  
  // ต้องผูก event ใหม่ทุกครั้งที่ toggleText ถูกเขียนทับ
  document.getElementById('toggleLink').onclick = (e) => {
      e.preventDefault();
      isLoginMode = !isLoginMode;
      updateFormMode();
  };
}

// สลับโหมด สมัคร ↔ ล็อกอิน (เรียกใช้ครั้งแรก)
if (toggleText) {
    updateFormMode();
}


// ส่งฟอร์ม (สมัครหรือล็อกอิน)
if (authForm) {
  authForm.onsubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // === ล็อกอินผ่าน API ===
      try {
        // เรียก API users ทั้งหมด (ในอนาคตสามารถทำ login API แยกได้)
        const res = await fetch('http://localhost:3001/api/users');
        const users = await res.json();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;


        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
  // แปลง field ให้ตรงกับ frontend
  const currentUser = {
    id: user.id,
    firstName: user.first_name || user.firstName,
    lastName: user.last_name || user.lastName,
    email: user.email,
    gender: user.gender,
    age: user.age,
    address: user.address,
    province: user.province
  };

  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  localStorage.setItem('loggedIn', 'true');
  showToast(`ยินดีต้อนรับกลับ ${currentUser.firstName}!`);
  setTimeout(() => location.href = 'home.html', 1200);
}
 else {
          alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        }
      } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
      }

    } else {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      // === สมัครสมาชิกผ่าน API ===
      if (password.length < 6) return alert('รหัสผ่านต้อง 6 ตัวอักษรขึ้นไป');

      const newUser = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: email,           
        password: password,     
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value.trim(),
        province: document.getElementById('province').value
      };

      console.log('ส่งข้อมูลไป server:', newUser);


      try {
        const res = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });

        const data = await res.json();

        if (data.error) {
          alert(data.error); // ถ้า email ซ้ำ หรือ error อื่น ๆ
          return;
        }

        if (data.id) {
          // ใช้ข้อมูลที่ตอบจาก server สำหรับ localStorage
          const savedUser = { ...newUser, id: data.id };
          localStorage.setItem('currentUser', JSON.stringify(savedUser));
          localStorage.setItem('loggedIn', 'true');
          showToast('สมัครสมาชิกสำเร็จ! กำลังพาไปหน้าหลัก');
          setTimeout(() => location.href = 'home.html', 1200);
        } else {
          alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }

      } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
      }
    }
  };
}



// === ป้องกันเข้าหน้าโดยไม่ล็อกอิน ===
const protectedPages = ['home.html', 'shop.html', 'checkout.html', 'orders.html', 'order-success.html'];
const currentPage = location.pathname.split('/').pop();

if (protectedPages.includes(currentPage)) {
  if (localStorage.getItem('loggedIn') !== 'true') {
    alert('กรุณาเข้าสู่ระบบก่อน');
    location.href = 'index.html';
  }
}
// [แก้ไข] ถ้าล็อกอินแล้ว เข้าหน้า index.html ให้เด้งไป home
if (currentPage === 'index.html' && localStorage.getItem('loggedIn') === 'true') {
  location.href = 'home.html';
}


// === ปุ่ม LOGOUT ===
document.querySelectorAll('#loginLink').forEach(link => {
  if (localStorage.getItem('loggedIn') === 'true') {
    link.textContent = 'LOGOUT';
    link.href = '#';
    link.onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('cart');
      // [แก้ไข] ล้าง session storage ด้วย
      sessionStorage.removeItem('lastOrderKey');
      sessionStorage.removeItem('lastOrderId');
      showToast('ออกจากระบบแล้ว');
      setTimeout(() => location.href = 'index.html', 1000);
    };
  } else {
    link.textContent = 'เข้าสู่ระบบ';
    link.href = 'index.html';
  }
});

// === แสดงข้อมูลผู้ใช้ใน Checkout ===
if (document.getElementById('userInfo')) {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (user.email) {
    document.getElementById('userInfo').innerHTML = `
      <div style="background:#00000; padding:1rem; border-radius:12px; margin-bottom:1rem; border:1px solid #a8e6a8;">
        <p style="margin:0.4rem 0; font-weight:600; color:#000000;">ข้อมูลการจัดส่ง</p>
        <p style="margin:0.3rem 0;"><strong>ชื่อ:</strong> ${user.firstName} ${user.lastName}</p>
        <p style="margin:0.3rem 0;"><strong>อีเมล:</strong> ${user.email}</p>
        <p style="margin:0.3rem 0;"><strong>ที่อยู่:</strong> ${user.address}, ${user.province}</p>
      </div>
    `;
  }
}


// === เริ่มต้นอัปเดตตะกร้า ===
// ตรวจสอบว่าหน้านี้ไม่ใช่หน้า index.html ก่อนอัปเดตตะกร้า (เพราะอาจจะยังไม่ได้ล็อกอิน)
if (currentPage !== 'index.html') {
    updateCartCount();
}


// console command เพื่อลบข้อมูล ordersทั้งหมด ของusersตามgmail localStorage.removeItem('orders_???@gmail.com');