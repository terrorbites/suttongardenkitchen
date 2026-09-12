document.documentElement.classList.add('js');
const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    toggle.focus();
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());

const gallery = [...document.querySelectorAll('[data-gallery]')];
const viewer = document.querySelector('.lightbox');
const viewerImage = document.querySelector('#lightbox-image');
const caption = document.querySelector('#lightbox-caption');
let activePhoto = 0;
let opener;
function displayPhoto(index) {
  activePhoto = (index + gallery.length) % gallery.length;
  const source = gallery[activePhoto].querySelector('img');
  viewerImage.src = source.src;
  viewerImage.alt = source.alt;
  caption.textContent = source.alt;
  document.querySelector('#photo-count').textContent = `${activePhoto + 1} / ${gallery.length}`;
}
gallery.forEach((button, index) => button.addEventListener('click', () => {
  opener = button;
  displayPhoto(index);
  viewer.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.lightbox-close').addEventListener('click', () => viewer.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => displayPhoto(activePhoto - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => displayPhoto(activePhoto + 1));
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); displayPhoto(activePhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); displayPhoto(activePhoto + 1); }
});
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) {
    const rect = viewer.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
  }
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  opener?.focus();
});
