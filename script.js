const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

let lang = localStorage.getItem('zargol-lang') || 'en';
const langBtn = $('.lang-toggle');

function applyLanguage(next){
  lang = next;
  const fa = lang === 'fa';
  document.documentElement.lang = lang;
  document.documentElement.dir = fa ? 'rtl' : 'ltr';
  document.title = fa ? 'زرگل | توسعه‌دهنده ارشد کسب‌وکار داده‌محور' : 'Zargol | Data-Oriented Senior Business Developer';
  $$('[data-en][data-fa]').forEach(el => {
    const value = el.dataset[lang];
    if (el.tagName === 'H1' || el.tagName === 'H2') el.innerHTML = value;
    else el.textContent = value;
  });
  $('.lang-en').classList.toggle('active', !fa);
  $('.lang-fa').classList.toggle('active', fa);
  localStorage.setItem('zargol-lang', lang);
}

langBtn?.addEventListener('click', () => applyLanguage(lang === 'en' ? 'fa' : 'en'));
applyLanguage(lang);

const menuToggle = $('.menu-toggle');
const mobileMenu = $('.mobile-menu');
menuToggle?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
$$('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const glow = $('.cursor-glow');
if(glow && matchMedia('(pointer:fine)').matches){
  addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
}

$('#year').textContent = new Date().getFullYear();

// Subtle tilt for interactive cards
$$('.life-card,.cap-card,.result-card,.ai-card,.focus-card,.brand-pill').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    if(!matchMedia('(pointer:fine)').matches) return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-3px)`;
  });
  card.addEventListener('mouseleave',()=>card.style.transform='');
});
