
const links = [...document.querySelectorAll('.menu-item')];
const sidebar = document.querySelector('.sidebar');
const toggle = document.getElementById('toggle');

links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    if (window.innerWidth <= 1100) sidebar.classList.remove('open');
  });
});

toggle?.addEventListener('click', ()=> sidebar.classList.toggle('open'));

const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const setActive = () => {
  let idx = 0;
  const fromTop = window.scrollY + 120;
  sections.forEach((sec,i)=>{ if (sec.offsetTop <= fromTop) idx = i; });
  links.forEach(l => l.classList.remove('active'));
  if (links[idx]) links[idx].classList.add('active');
};
window.addEventListener('scroll', setActive);
setActive();
