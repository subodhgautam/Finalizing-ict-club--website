class NewsletterButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        /* include your CSS here */
        .subscribe-btn {
    position: relative;
    background: linear-gradient(135deg, #007bff, #0056b3);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 14px 28px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    transition: all 0.25s ease;
    overflow: hidden;
  }

  .subscribe-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.35);
  }

  /* ====== PLANE SVG ====== */
  .plane {
    width: 20px;
    height: 20px;
    transition: transform 0.8s ease, opacity 0.8s ease;
  }
  .fly {
    transform: translateX(120px) translateY(-40px) rotate(25deg);
    opacity: 0;
  }

  /* ====== CHECKMARK ====== */
  .checkmark {
    width: 18px;
    height: 18px;
    stroke: #fff;
    stroke-width: 3;
    fill: none;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: drawCheck 0.6s forwards;
  }

  @keyframes drawCheck {
    to {
      stroke-dashoffset: 0;
    }
  }

  /* ====== TOAST ====== */
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    color: #0056b3;
    border-left: 5px solid #007bff;
    padding: 14px 20px;
    border-radius: 12px;
    font-weight: 500;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.4s ease;
    z-index: 9999;
  }

  .toast.show {
    opacity: 1;
    transform: translateY(0);
  }

  /* ====== CONFETTI ====== */
  .confetti {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: var(--color);
    opacity: 0.9;
    animation: fall 1.2s ease-out forwards;
  }

  @keyframes fall {
    0% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(var(--x), var(--y)) rotate(720deg);
      opacity: 0;
    }
  }
      </style>

       <!-- ====== BUTTON ====== -->
  <button class="subscribe-btn" id="subscribeBtn">
    <svg id="plane" class="plane" viewBox="0 0 512 512" fill="white">
      <path d="M476 3L36 235c-10 5-9 18 2 21l111 29 41 128c3 9 15 12 21 4l51-63 105 80c8 6 20 2 22-8L493 20c2-10-8-19-17-17z"/>
    </svg>
    <span id="text">Subscribe</span>
  </button>

  <!-- ====== TOAST ====== -->
  <div class="toast" id="toast">You're now subscribed! 🚀</div>
    `;
    // include your JS behavior (plane, confetti, etc.)
     const btn = document.getElementById('subscribeBtn');
    const plane = document.getElementById('plane');
    const text = document.getElementById('text');
    const toast = document.getElementById('toast');

    function showToast() {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function makeConfetti() {
      const colors = ['#007bff', '#00bfff', '#87cefa', '#1e90ff', '#4682b4'];
      for (let i = 0; i < 20; i++) {
        const conf = document.createElement('div');
        conf.classList.add('confetti');
        conf.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        conf.style.setProperty('--x', `${(Math.random() - 0.5) * 400}px`);
        conf.style.setProperty('--y', `${(Math.random() - 0.5) * 400}px`);
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 1200);
      }
    }

    btn.addEventListener('click', () => {
      btn.disabled = true;

      // Animate plane
      plane.classList.add('fly');

      // After plane flies
      setTimeout(() => {
        plane.remove();

        // Insert checkmark
        const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        check.setAttribute('viewBox', '0 0 52 52');
        check.classList.add('checkmark');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M14 27l7 7 17-17');
        check.appendChild(path);
        btn.insertBefore(check, text);
        text.textContent = 'Subscribed';

        // Confetti + Toast
        makeConfetti();
        showToast();

        // Reset
        setTimeout(() => {
          btn.disabled = false;
          check.remove();

          // Restore plane
          const newPlane = plane.cloneNode(true);
          newPlane.classList.remove('fly');
          btn.insertBefore(newPlane, text);
          text.textContent = 'Subscribe';
        }, 4000);
      }, 1000);
    });
  }
 
}
customElements.define('newsletter-button', NewsletterButton);
