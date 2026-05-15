
  // Topic selector buttons
  function setTopic(btn) {
    document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const topic = btn.dataset.topic;
    const subjectEl = document.getElementById('subject');
    subjectEl.value = topic !== 'general' ? topic : '';
    // Show order field if order topic
    document.getElementById('order-field').style.display = topic === 'order' ? 'flex' : 'none';
  }

  function selectTopic(topic) {
    document.querySelectorAll('.topic-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.topic === topic);
    });
    document.getElementById('subject').value = topic;
    document.getElementById('order-field').style.display = topic === 'order' ? 'flex' : 'none';
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // File upload name display
  function showFileName(input) {
    const el = document.getElementById('file-name');
    if (input.files && input.files[0]) {
      el.textContent = '📎 ' + input.files[0].name;
      el.style.display = 'block';
    }
  }

  // Form submission
  function submitForm() {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;

    if (!firstName || !email || !message || !consent) {
      alert('Please fill in all required fields and accept the privacy policy.');
      return;
    }

    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = '<span>Sending…</span>';
    btn.style.background = 'var(--forest-light)';
    btn.disabled = true;

    setTimeout(() => {
      document.getElementById('contact-form').style.display = 'none';
      const successMsg = document.getElementById('success-msg');
      document.getElementById('success-name').textContent = firstName + ' ' + lastName;
      document.getElementById('success-email').textContent = email;
      successMsg.classList.add('show');
    }, 1500);
  }

  // FAQ toggle
  function toggleFaq(el) {
    const item = el.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').classList.remove('open');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
    }
  }
