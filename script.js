// Modal setup
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta-line');
const modalDesc = document.getElementById('modal-description');
const modalReadMoreBtn = document.getElementById('modal-read-more');
const modalImageWrap = document.getElementById('modal-image-wrap');
const cards = document.querySelectorAll('.hero-card');
const modalBackdrop = modal.querySelector('.modal-backdrop');
const modalDialog = modal.querySelector('.modal-dialog');

// Extra long-form descriptions per project (multi-paragraph)
// Use the project title as the key; edit these strings to add more content.
const PROJECT_EXTRA_TEXT = {
  'Extend ICA': [
    'The exhibition marks MAD\'s first solo show in the United States, exploring new relationships between institution, city, and public.',
    'Through architectural models, large-scale drawings, and immersive media, the project examines how an extension can act as both a frame and a stage for contemporary art.'
  ],
  'fantova nexus': [
    'This interior concept is structured as a series of light wells that organize circulation and frame views to the surrounding landscape.',
    'Each chapter of the project tests different material atmospheres, from translucent partitions to mirrored ceilings.'
  ],
  'Project Three': [
    'The campus is divided into seven programmatic bands, each anchored by a distinct courtyard condition.',
    'Roof gardens and outdoor terraces stitch these bands together, creating a continuous public promenade.'
  ]
  // Add more entries for other projects as needed
};

let currentBaseDescription = '';
let currentExtraParagraphs = [];
let currentImageUrls = [];
let currentImageIndex = 0;

// Preload all project images once so the first modal open is smoother
function preloadImages() {
  const seen = new Set();

  cards.forEach(card => {
    const { images } = card.dataset;

    let urls = [];
    if (images) {
      urls = images.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (urls.length === 0) {
      const cover = card.querySelector('img');
      if (cover && cover.src) urls.push(cover.src);
    }

    urls.forEach(url => {
      if (!url || seen.has(url)) return;
      seen.add(url);
      const img = new Image();
      img.src = url;
    });
  });
}

function restartAnimation(el, className) {
  if (!el) return;
  el.classList.remove(className);
  // Force reflow so the class removal is applied
  void el.offsetWidth;
  el.classList.add(className);
}

function openModalFromCard(card) {
  const { title, location, year, type, description, images } = card.dataset;

  modalTitle.textContent = title || '';
  modalMeta.textContent = [location, type, year].filter(Boolean).join(' · ');
  currentBaseDescription = description || '';
  currentExtraParagraphs = PROJECT_EXTRA_TEXT[title] || [];

  // Render only the first (short) paragraph initially
  if (modalDesc) {
    modalDesc.innerHTML = '';
    if (currentBaseDescription) {
      const p = document.createElement('p');
      p.textContent = currentBaseDescription;
      modalDesc.appendChild(p);
    }
  }

  // Show or hide the READ MORE button depending on whether extra text exists
  if (modalReadMoreBtn) {
    if (currentExtraParagraphs.length > 0) {
      modalReadMoreBtn.style.display = 'inline-block';
    } else {
      modalReadMoreBtn.style.display = 'none';
    }
  }

  if (modalImageWrap) {
    modalImageWrap.innerHTML = '';

    let urls = [];
    if (images) {
      urls = images.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (urls.length === 0) {
      const coverImg = card.querySelector('img');
      if (coverImg && coverImg.src) urls.push(coverImg.src);
    }

    currentImageUrls = urls;
    currentImageIndex = 0;

    urls.forEach((url, i) => {
      const imgEl = document.createElement('img');
      imgEl.src = url;
      imgEl.alt = `${title || 'Project'} image ${i + 1}`;
      imgEl.dataset.index = String(i);
      imgEl.style.cursor = 'pointer';
      imgEl.addEventListener('click', () => openImageLightbox(i));
      modalImageWrap.appendChild(imgEl);
    });
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  // Restart backdrop and dialog animations every time
  restartAnimation(modalBackdrop, 'is-animating');
  restartAnimation(modalDialog, 'is-animating');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

cards.forEach(card => {
  card.addEventListener('click', () => openModalFromCard(card));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModalFromCard(card);
    }
  });
});

modal.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', closeModal);
});

modal.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    closeModal();
  }
});

// Expand modal description with extra paragraphs when READ MORE is clicked
if (modalReadMoreBtn) {
  modalReadMoreBtn.addEventListener('click', () => {
    if (!modalDesc) return;

    modalDesc.innerHTML = '';
    const allParagraphs = [];
    if (currentBaseDescription) allParagraphs.push(currentBaseDescription);
    allParagraphs.push(...currentExtraParagraphs);

    allParagraphs.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      modalDesc.appendChild(p);
    });

    // After expanding once, hide the button
    modalReadMoreBtn.style.display = 'none';
  });
}

// ==========================
// Image lightbox (fullscreen viewer)
// ==========================

const imageLightbox = document.getElementById('image-lightbox');
const imageLightboxImg = document.getElementById('image-lightbox-img');
const imageLightboxPrev = document.getElementById('image-lightbox-prev');
const imageLightboxNext = document.getElementById('image-lightbox-next');
const imageLightboxBackdrop = document.querySelector('.image-lightbox-backdrop');

function showLightboxImage(index) {
  if (!currentImageUrls.length || !imageLightboxImg) return;
  const safeIndex = ((index % currentImageUrls.length) + currentImageUrls.length) % currentImageUrls.length;
  currentImageIndex = safeIndex;
  imageLightboxImg.src = currentImageUrls[safeIndex];
}

function openImageLightbox(startIndex) {
  if (!imageLightbox) return;
  if (!currentImageUrls.length) return;

  showLightboxImage(startIndex || 0);
  imageLightbox.classList.add('is-open');
  imageLightbox.setAttribute('aria-hidden', 'false');
}

function closeImageLightbox() {
  if (!imageLightbox) return;
  imageLightbox.classList.remove('is-open');
  imageLightbox.setAttribute('aria-hidden', 'true');
}

if (imageLightboxPrev) {
  imageLightboxPrev.addEventListener('click', () => {
    showLightboxImage(currentImageIndex - 1);
  });
}

if (imageLightboxNext) {
  imageLightboxNext.addEventListener('click', () => {
    showLightboxImage(currentImageIndex + 1);
  });
}

if (imageLightboxBackdrop) {
  imageLightboxBackdrop.addEventListener('click', closeImageLightbox);
}

document.querySelectorAll('[data-lightbox-close]').forEach(btn => {
  btn.addEventListener('click', closeImageLightbox);
});

// Close lightbox with Esc and navigate with arrow keys
document.addEventListener('keydown', (e) => {
  if (!imageLightbox || !imageLightbox.classList.contains('is-open')) return;

  if (e.key === 'Escape') {
    closeImageLightbox();
  } else if (e.key === 'ArrowLeft') {
    showLightboxImage(currentImageIndex - 1);
  } else if (e.key === 'ArrowRight') {
    showLightboxImage(currentImageIndex + 1);
  }
});

// Start preloading after the page is loaded
if (document.readyState === 'complete') {
  preloadImages();
} else {
  window.addEventListener('load', preloadImages);
}

// Category tabs: switch between different layout "pages"
const categoryTabs = document.querySelectorAll('.category-tab');
const categoryViews = document.querySelectorAll('[data-category-view]');

categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.category;

    categoryTabs.forEach(t => {
      t.classList.toggle('is-active', t === tab);
    });

    categoryViews.forEach(view => {
      const viewCategory = view.dataset.categoryView;
      if (viewCategory === target) {
        view.removeAttribute('hidden');
      } else {
        view.setAttribute('hidden', 'true');
      }
    });
  });
});

// Ensure "Projects" nav link scrolls all the way to top
const projectsNavLink = document.querySelector('.site-nav a[href="#projects"]');

if (projectsNavLink) {
  projectsNavLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Scroll to very top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Also reset to the "All" category view
    const allTab = document.querySelector('.category-tab[data-category="all"]');
    if (allTab) {
      categoryTabs.forEach(t => t.classList.toggle('is-active', t === allTab));
    }

    categoryViews.forEach(view => {
      const viewCategory = view.dataset.categoryView;
      if (viewCategory === 'all') {
        view.removeAttribute('hidden');
      } else {
        view.setAttribute('hidden', 'true');
      }
    });
  });
}