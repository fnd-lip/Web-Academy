const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');
const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');


const images = [
  { src: 'pic1.jpg', alt: 'Mangá 1' },
  { src: 'pic2.jpg', alt: 'Mangá 2' },
  { src: 'pic3.jpg', alt: 'Manga 3' },
  { src: 'pic4.jpg', alt: 'Manga 5' },
  { src: 'pic5.jpg', alt: 'Manga 6' }
];

images.forEach(({ src, alt }) => {
  const img = document.createElement('img');
  img.src = `images/${src}`;
  img.alt = alt;
  img.addEventListener('click', () => {
    displayedImage.src = img.src;
    displayedImage.alt = img.alt;
  });
  thumbBar.appendChild(img);
});

btn.addEventListener('click', () => {
  const isDark = btn.classList.contains('dark');
  btn.className = isDark ? 'light' : 'dark';
  btn.textContent = isDark ? 'Light' : 'Dark';
  overlay.style.backgroundColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)';
});
