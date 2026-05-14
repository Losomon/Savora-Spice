
  // Thumbnail switcher
  document.querySelectorAll('.thumb').forEach(t => {
    t.addEventListener('click', function() {
      document.querySelectorAll('.thumb').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('main-emoji').textContent = this.dataset.emoji;
    });
  });

  // Wishlist toggle
  const wishBtn = document.getElementById('wish-btn');
  wishBtn.addEventListener('click', () => {
    if (wishBtn.textContent === '♡') { wishBtn.textContent = '♥'; wishBtn.style.color = '#c0392b'; }
    else { wishBtn.textContent = '♡'; wishBtn.style.color = ''; }
  });

  // Quantity
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });

  // Size selector
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Add to cart
  const addBtn = document.getElementById('add-cart-btn');
  addBtn.addEventListener('click', () => {
    addBtn.textContent = '✓ Added to Cart!';
    addBtn.style.background = '#2d7a3e';
    const badge = document.getElementById('cart-count');
    badge.textContent = parseInt(badge.textContent) + parseInt(qtyInput.value);
    setTimeout(() => { addBtn.textContent = '🛒 Add to Cart'; addBtn.style.background = ''; }, 2000);
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
  });
