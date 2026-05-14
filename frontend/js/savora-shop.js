
  // View toggle
  const gridBtn = document.getElementById('grid-btn');
  const listBtn = document.getElementById('list-btn');
  const grid = document.getElementById('products-grid');

  gridBtn.addEventListener('click', () => {
    grid.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  });
  listBtn.addEventListener('click', () => {
    grid.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  });

  // Origin tag toggle
  document.querySelectorAll('.origin-tag').forEach(tag => {
    tag.addEventListener('click', () => tag.classList.toggle('active'));
  });

  // Promo banner close
  document.querySelector('.promo-close').addEventListener('click', e => {
    e.target.closest('.promo-banner').style.display = 'none';
  });

  // Wishlist toggle
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
      btn.style.color = btn.textContent === '♥' ? '#c0392b' : '';
    });
  });

  // Add to cart feedback
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const orig = this.textContent;
      this.textContent = '✓ Added';
      this.style.background = '#2d7a3e';
      setTimeout(() => {
        this.textContent = orig;
        this.style.background = '';
      }, 1500);
    });
  });

  // Pagination
  document.querySelectorAll('.page-btn:not(.arrow)').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
