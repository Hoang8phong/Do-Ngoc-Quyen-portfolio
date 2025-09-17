const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})

const thumbs = document.querySelectorAll('.thumb img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.closeBtn');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
let index = 0;

function showImage(i){
  index = i;
  lightboxImg.src = thumbs[i].src; 
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

thumbs.forEach((img,i)=> img.addEventListener('click', ()=> showImage(i)));

function closeBox(){
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}
function prev(){ showImage((index - 1 + thumbs.length) % thumbs.length); }
function next(){ showImage((index + 1) % thumbs.length); }

closeBtn.addEventListener('click', closeBox);
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

lightbox.addEventListener('click', e => { if(e.target===lightbox) closeBox(); });

document.addEventListener('keydown', e => {
  if(!lightbox.classList.contains('active')) return;
  if(e.key==='Escape') closeBox();
  if(e.key==='ArrowLeft') prev();
  if(e.key==='ArrowRight') next();
});

// --- Disable right-click site-wide (context menu) ---
(() => {

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, { capture: true });

  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault();
  });
})();
