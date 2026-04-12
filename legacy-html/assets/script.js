
const menuToggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');
if(menuToggle && menu){
  menuToggle.addEventListener('click', ()=> menu.classList.toggle('open'));
}

document.querySelectorAll('[data-meter]').forEach(el=>{
  const value = Number(el.getAttribute('data-meter')) || 0;
  requestAnimationFrame(()=> { el.style.width = value + '%'; });
});

const countdownEls = document.querySelectorAll('[data-countdown]');
function updateCountdown(){
  countdownEls.forEach(wrap=>{
    const target = new Date(wrap.getAttribute('data-countdown')).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff / (1000*60*60)) % 24);
    const mins = Math.floor((diff / (1000*60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    const units = wrap.querySelectorAll('.unit strong');
    if(units.length === 4){
      units[0].textContent = days;
      units[1].textContent = hours;
      units[2].textContent = mins;
      units[3].textContent = secs;
    }
  });
}
if(countdownEls.length){ updateCountdown(); setInterval(updateCountdown, 1000); }

const faqSearch = document.querySelector('[data-faq-search]');
if(faqSearch){
  faqSearch.addEventListener('input', e=>{
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.faq details').forEach(item=>{
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? '' : 'none';
    });
  });
}
