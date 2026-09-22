document.addEventListener('DOMContentLoaded', function() {
  const yearSpan = document.getElementById('year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progress = document.getElementById('progress');
    if(progress) progress.style.width = scrolled + '%';
  });

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if(menuBtn && nav) {
    menuBtn.addEventListener('click', function() {
      if(nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = '#ffffff';
        nav.style.padding = '20px';
        nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
      }
    });
  }
});
