/* ============================================================
   TV PARTY GAMES — HOMEPAGE LOGIC
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  /* --- Staggered card entrance animation --- */
  const cards = document.querySelectorAll('.game-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.6s ease ${i * 0.15 + 0.3}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15 + 0.3}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);
  });
  /* --- Title entrance --- */
  const titleParts = document.querySelectorAll('.title-tv, .title-party, .title-games');
  titleParts.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-30px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.2}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.2}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
  /* --- Card click ripple effect --- */
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        width: 10px; height: 10px;
        top: ${e.offsetY - 5}px;
        left: ${e.offsetX - 5}px;
        transform: scale(0);
        animation: rippleOut 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 10;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });
  /* --- Inject ripple keyframe --- */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleOut {
      to { transform: scale(60); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
});