// The document and its anchor navigation remain usable without JavaScript.
const chapters = [...document.querySelectorAll('.chapter')];
const links = [...document.querySelectorAll('.contents nav a')];
let scheduled = false;

function updateChapter() {
  const threshold = window.matchMedia('(max-width: 760px)').matches ? 130 : 100;
  let current = chapters[0];
  for (const chapter of chapters) {
    if (chapter.getBoundingClientRect().top <= threshold) current = chapter;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
    current = chapters[chapters.length - 1];
  }
  for (const link of links) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}

function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateChapter);
  }
}
window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
window.addEventListener('pageshow', scheduleUpdate);
updateChapter();
