// Modal setup
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta-line');
const modalDesc = document.getElementById('modal-description');
const modalReadMoreBtn = document.getElementById('modal-read-more');
const modalTextCol = document.querySelector('.modal-text');
const modalImageWrap = document.getElementById('modal-image-wrap');
const cards = document.querySelectorAll('.hero-card');
const modalBackdrop = modal.querySelector('.modal-backdrop');
const modalDialog = modal.querySelector('.modal-dialog');

// Prevent background page from scrolling when overlays are open
// Uses a fixed-position body pattern so it also works on iOS browsers.
let scrollLockScrollTop = 0;

function lockBodyScroll() {
  scrollLockScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  document.body.style.top = `-${scrollLockScrollTop}px`;
  document.body.classList.add('body-lock-scroll');
}

function unlockBodyScroll() {
  document.body.classList.remove('body-lock-scroll');
  const restoreY = scrollLockScrollTop || 0;
  document.body.style.top = '';
  window.scrollTo(0, restoreY);
}

// Extra long-form descriptions per project (multi-paragraph)
// Use the project title as the key; edit these strings to add more content.
const PROJECT_EXTRA_TEXT = {
  'extend ica': [
    'Contemporary art no longer conforms to the spatial assumptions of conventional exhibition architecture. As practices expand across media, scale, and modes of perception, the museum organized as a sequence of homogeneous white galleries becomes increasingly inadequate.',
    'This project proposes an extension of the Institute of Contemporary Art (ICA) that treats exhibition space not as a neutral container, but as a packaged object. Architecture operates as a packaging apparatus—organizing, fixing, and enclosing exhibition spaces within a single architectural system.',
    'Developed from the research project Stacked & Packed, the design translates packaging from an object-based logic to an architectural one. Walls, slabs, stairs, and structure function as packaging mechanisms, while exhibition spaces are conceived as discrete volumes embedded within the building.',
    'Rather than extending the ICA through repetitive floor plates, the project assembles exhibition volumes that are stacked, offset, and interlocked. Structural elements lock these volumes into position and simultaneously generate circulation, producing an interior condition in which structure, movement, and exhibition are inseparable.',
    'Circulation becomes a viewing instrument. Visitors encounter artworks from shifting heights and angles as perception unfolds through movement rather than fixed viewpoints. Floor plates operate as thresholds rather than levels, separating exhibition spaces of different heights while maintaining spatial continuity.',
    'The extension is enclosed within a unified shell that minimizes engagement with the surrounding campus. Natural light is introduced selectively at circulation spaces, creating moments of pause within an otherwise controlled interior environment.',
    'The existing ICA core is preserved and extended, anchoring the new architecture while acting as a spatial divider between distinct exhibition environments. Through this strategy, the project maintains structural continuity while introducing a fundamentally different spatial logic.',
    'By conceiving exhibition spaces as packaged objects and architecture as an organizing apparatus, the ICA extension proposes an alternative model for exhibition architecture—one defined by spatial difference, embodied movement, and controlled perception rather than neutrality or flexibility.',

    'Studio Instructor: Andrew Holder',

  ],
  'stacked & packed': [
    'Stacked & Packed begins with a simple task—designing a packaging system—but quickly reframes packaging as an active spatial process rather than a disposable shell. Assigned a tape measure as the object, the project asks how unpacking itself can become meaningful, turning removal into a sequence of spatial actions.',
    'The packaging system is composed of four interlocking boxes that stabilize one another through stacking and geometry. Instead of adhesives or fasteners, locking occurs through rotation and vertical lifting. The system can be repeatedly assembled, disassembled, and reused, with the tape measure held in place by spatial tension rather than padding.',
    'An intentionally plain outer package encloses this internal mechanism. From a narrow opening, the measuring tape itself is pulled outward, wraps once around the package, and returns to the interior. Rather than acting as an external binding element, the tape operates as both object and connector—simultaneously securing the system and revealing how it is held together. The tape measure thus links object, package, and user action into a single continuous loop.',
    'If packaging can function as a spatial system at the scale of an object, the project asks how this logic translates when scale shifts. Using the original packaging components, a series of axonometric studies were produced through pencil, charcoal, and spray paint. These drawings explore stacking, locking, and vertical continuity, revealing how mechanical connections begin to operate as spatial thresholds.',
    'The locking elements are then translated into horizontal plates that connect and divide four primary spatial volumes derived from the original boxes. Movement through the system echoes the act of unpacking: space is revealed through shifts in level, compression, and alignment rather than through open continuity.',
    'Finally, the packaging envelope is reinterpreted as an architectural wrapper. Acting as both façade and container, it alternately compresses and releases the interior, producing moments of enclosure and openness. What began as a packaging exercise becomes an architectural proposition—one in which space is assembled, unlocked, and understood through use.',
    
    'Instructor: Andrew Holder'

  ],
  'fantova nexus': [
    'Located in Fantova, a small village in northern Spain situated along a popular hiking network, the site occupies a paradoxical position. While the surrounding trails attract hikers for their scenic landscapes, the village itself remains largely bypassed. Despite its rich local traditions and cultural heritage, Fantova lacks spaces for rest, gathering, or prolonged stay. As a result, the village functions primarily for residents, rarely becoming part of the hikers’ lived experience.',
    'Commissioned by the Gaudí Foundation, the project proposes a new cultural and spatial infrastructure that reconnects the village to the hiking routes while introducing programs for artistic production and temporary habitation. Rather than inserting a singular destination object, the project redefines the hiking path itself—allowing it to bend, enter, and pass through the architecture.',
    'The architectural complex is organized as a continuous nexus between village and landscape. A central exhibition and communal space anchors the site, flanked by artist studios, hostel units, and shaded public platforms. The hiking route is not terminated at the building, but rather woven through it, enabling hikers to pause, observe village life, encounter artistic production, or continue onward.',
    'Formally, all architectural elements—roofs, shelters, housing units, and exhibition spaces—are generated from the same system of decomposed cubic volumes. These geometries adapt to programmatic needs and environmental conditions, becoming lightweight shading canopies, inhabitable volumes, or porous thresholds. The repeated transformation of the cube establishes a coherent formal language while allowing variation across scales and functions.',
    'Ultimately, Fantova Nexus is not conceived as an isolated building, but as a spatial mediator—one that translates abstract geometry into lived experience, and reconnects landscape, culture, and movement into a single continuous system.'
  ],

  'arlington library': [
    'Originally elevated above street level and isolated by a fenced garden, the Arlington Library in Brooklyn presents itself as a closed object rather than a civic invitation. Upon my first visit, several spatial problems became immediately apparent: the raised garden separates the library from everyday street life; the central atrium is sealed, cutting off daylight and visual continuity; and the basement remains largely unused, effectively reducing a three-story building into only two active floors. These conditions limit both spatial accessibility and the library’s potential as a community-centered institution.',
    'The renovation begins by redefining the ground. The existing elevated garden is sunk to street level, transforming the former basement into a new public first floor. This intervention restores spatial continuity between the library and its surrounding neighborhood, allowing pedestrians to enter naturally rather than ascend into an isolated platform. Simultaneously, the atrium is reopened to bring daylight deep into the building, re-establishing vertical visual connections and spatial orientation across floors.',
    'A new stair system is introduced as the primary organizing element of the library. Rather than functioning solely as circulation, the stairs operate as spatial infrastructure. On the first floor, they expand into amphitheater-like seating, enabling lectures, readings, discussions, children’s gatherings, and informal social activity. Noise and movement are not suppressed but intentionally accommodated, allowing the library to absorb everyday community life rather than exclude it.',
    'The second floor becomes the primary collection space, housing the majority of the library’s books and reading areas. Above, the third floor is reserved for enclosed, quiet study spaces, offering acoustic and visual retreat. These three atmospheres—active, focused, and silent—are vertically stratified but continuously connected.',
    'Binding these spaces together is a monumental semi-circular bookshelf that spans all three floors. Rather than functioning merely as storage, the bookshelf becomes a spatial and conceptual organizer. Books are arranged according to floor level, corresponding to varying degrees of noise, activity, and readership. In this way, knowledge is spatialized, and the act of reading is understood as part of a broader public spectrum rather than a singular, silent condition.',
    'Throughout the intervention, the existing structural system is preserved and respected. New circulation paths, staircases, walkways, and bookshelves are carefully inserted within the original framework, allowing the building’s historical logic to coexist with contemporary public demands. Ultimately, the project reframes the library not as a space of enforced quietness, but as an open, civic interior—one that welcomes the public, embraces social exchange, and supports multiple modes of collective and individual engagement.',

    'Studio Instructor: Calvert Wright'
  ],

  'garden house': [
    'This renovation rethinks a traditional Brooklyn townhouse as a light-driven domestic landscape shaped by both human and animal inhabitation. The clients—an elderly couple living full-time in Brooklyn, their college-aged child who returns periodically, and a cat and a dog—required a home that could support changing rhythms of occupation while remaining calm, accessible, and spatially generous.',
    'The existing townhouse is defined by its long and narrow proportion and is closely surrounded by neighboring buildings on both sides and at the rear. As a result, access to natural light is limited and uneven. Rather than treating this as a constraint, the project takes daylight as its primary organizing principle. A central courtyard with a skylight garden becomes the spatial and atmospheric core of the house, naturally dividing the plan into two zones while allowing light to penetrate deep into the interior.',
    'To further extend daylight and activate underutilized edges, a secondary side garden is introduced. This linear outdoor space functions both as a light well and as a playful landscape for the family’s pets, allowing the cat and dog to move freely along the length of the house while maintaining visual and spatial continuity with the interior.',
    'Vertically, the house is organized into three distinct atmospheric layers. The ground floor accommodates shared and active programs—living and dining—where openness, circulation, and social interaction are emphasized. The second floor is conceived as a quieter zone for rest and retreat, prioritizing privacy and acoustic separation. Above, the roof is transformed into an elevated garden, extending domestic life outdoors and offering an additional layer of light, air, and seasonal change.',
    'Through a careful orchestration of light, section, and landscape, the project reframes the townhouse not as a closed urban object, but as a porous, vertically layered environment—one that supports everyday life, intergenerational living, and non-human movement within a dense Brooklyn context.',

    'Instructor: Calvert Wright'
  ],

  // Add more entries for other projects as needed
};

let currentBaseDescription = '';
let currentExtraParagraphs = [];
let currentImageUrls = [];
let currentImageIndex = 0;
let isDescriptionExpanded = false;

function scrollElementToTop(el, smooth = false) {
  if (!el) return;
  const behavior = smooth ? 'smooth' : 'auto';

  if (typeof el.scrollTo === 'function') {
    try {
      el.scrollTo({ top: 0, left: 0, behavior });
      return;
    } catch (err) {
      try {
        el.scrollTo(0, 0);
        return;
      } catch (nestedErr) {
        // Fall through to direct scrollTop assignment when the browser
        // does not support element.scrollTo in either signature.
      }
    }
  }

  el.scrollTop = 0;
}

// Observer to auto-play/pause modal videos when they enter/leave view
let modalVideoObserver = null;

if ('IntersectionObserver' in window && modalImageWrap) {
  modalVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const videoEl = entry.target;
      if (!(videoEl instanceof HTMLVideoElement)) return;

      if (entry.isIntersecting) {
        videoEl.play().catch(() => {});
      } else {
        videoEl.pause();
        videoEl.currentTime = 0;
      }
    });
  }, {
    root: modalImageWrap,
    threshold: 0.6
  });
}

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
      // Skip video files here; they are handled separately in the modal
      if (/\.(mp4|webm|ogg)([?#].*)?$/i.test(url)) return;
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
  isDescriptionExpanded = false;

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
      modalReadMoreBtn.textContent = 'READ MORE +';
    } else {
      modalReadMoreBtn.style.display = 'none';
    }
  }

  if (modalImageWrap) {
    modalImageWrap.innerHTML = '';

    // Stop observing any previous videos; new ones will be re-registered
    if (modalVideoObserver) {
      modalVideoObserver.disconnect();
    }

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
      const isVideo = /\.(mp4|webm|ogg)([?#].*)?$/i.test(url);

      if (isVideo) {
        const videoEl = document.createElement('video');
        videoEl.src = url;
        videoEl.playsInline = true;
        videoEl.loop = true;              // repeat like a GIF
        videoEl.muted = true;             // allow autoplay on hover
        videoEl.preload = 'metadata';
        videoEl.tabIndex = 0;             // keyboard focusable

        // Play when hovered or focused; pause + reset when leaving
        const startVideo = () => {
          videoEl.play().catch(() => {});
        };
        const stopVideo = () => {
          videoEl.pause();
          videoEl.currentTime = 0;
        };

        videoEl.addEventListener('mouseenter', startVideo);
        videoEl.addEventListener('focus', startVideo);
        videoEl.addEventListener('mouseleave', stopVideo);
        videoEl.addEventListener('blur', stopVideo);

        // Allow fullscreen lightbox open from the video as well
        videoEl.style.cursor = 'pointer';
        videoEl.addEventListener('click', () => openImageLightbox(i));

        // Also auto-play when scrolled into view and reset when leaving
        if (modalVideoObserver) {
          modalVideoObserver.observe(videoEl);
        }

        modalImageWrap.appendChild(videoEl);
      } else {
        const imgEl = document.createElement('img');
        imgEl.src = url;
        imgEl.alt = `${title || 'Project'} image ${i + 1}`;
        imgEl.dataset.index = String(i);
        imgEl.style.cursor = 'pointer';
        imgEl.addEventListener('click', () => openImageLightbox(i));
        modalImageWrap.appendChild(imgEl);
      }
    });
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  // Lock background scroll while modal is open
  lockBodyScroll();

  // Reset scroll positions when the modal opens
  scrollElementToTop(modalTextCol);
  scrollElementToTop(modalImageWrap);
  scrollElementToTop(modalDialog);

  // Restart backdrop and dialog animations every time
  restartAnimation(modalBackdrop, 'is-animating');
  restartAnimation(modalDialog, 'is-animating');
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');

  // Ensure any modal videos are stopped and reset when closing
  if (modalImageWrap) {
    const videos = modalImageWrap.querySelectorAll('video');
    videos.forEach(videoEl => {
      videoEl.pause();
      videoEl.currentTime = 0;
    });
  }

  if (modalVideoObserver) {
    modalVideoObserver.disconnect();
  }

  // Re-enable background scroll when modal closes
  unlockBodyScroll();
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
  modalReadMoreBtn.addEventListener('click', (e) => {
    // On some mobile/tablet browsers, buttons can trigger
    // unintended default behavior; always treat this as
    // a pure JS toggle with no navigation or form submit.
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!modalDesc) return;

    // Toggle between collapsed (base paragraph) and expanded (base + extras)
    if (!isDescriptionExpanded) {
      modalDesc.innerHTML = '';
      const allParagraphs = [];
      if (currentBaseDescription) allParagraphs.push(currentBaseDescription);
      allParagraphs.push(...currentExtraParagraphs);

      allParagraphs.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        modalDesc.appendChild(p);
      });

      modalReadMoreBtn.textContent = 'READ LESS -';
      isDescriptionExpanded = true;
    } else {
      // Collapse back to the short base description
      if (document.activeElement === modalReadMoreBtn) {
        // Prevent Safari/iPad from jumping the viewport to keep the button focused.
        modalReadMoreBtn.blur();
      }
      modalDesc.innerHTML = '';
      if (currentBaseDescription) {
        const p = document.createElement('p');
        p.textContent = currentBaseDescription;
        modalDesc.appendChild(p);
      }

      // Scroll the text column back to the top for readability
      scrollElementToTop(modalTextCol);

      // Smoothly scroll the media column so it animates back to the
      // top, matching how the modal first appears.
      scrollElementToTop(modalImageWrap, true);

      // On tablet/mobile layouts, also scroll the dialog container so
      // the user lands at the modal header again.
      if (window.matchMedia('(max-width: 900px)').matches) {
        const mobileScrollTarget = (modalDialog && modalDialog.scrollHeight > modalDialog.clientHeight)
          ? modalDialog
          : modal;

        // Defer the scroll to the next frame so touch browsers don't misinterpret
        // the tap as a pull-to-refresh gesture.
        requestAnimationFrame(() => {
          scrollElementToTop(mobileScrollTarget);
        });
      }

      modalReadMoreBtn.textContent = 'READ MORE +';
      isDescriptionExpanded = false;
    }
  });
}

// ==========================
// Image lightbox (fullscreen viewer)
// ==========================

const imageLightbox = document.getElementById('image-lightbox');
const imageLightboxImg = document.getElementById('image-lightbox-img');
const imageLightboxVideo = document.getElementById('image-lightbox-video');
const imageLightboxPrev = document.getElementById('image-lightbox-prev');
const imageLightboxNext = document.getElementById('image-lightbox-next');
const imageLightboxBackdrop = document.querySelector('.image-lightbox-backdrop');

function showLightboxMedia(index) {
  if (!currentImageUrls.length || (!imageLightboxImg && !imageLightboxVideo)) return;

  const safeIndex = ((index % currentImageUrls.length) + currentImageUrls.length) % currentImageUrls.length;
  currentImageIndex = safeIndex;

  const url = currentImageUrls[safeIndex];
  const isVideo = /\.(mp4|webm|ogg)([?#].*)?$/i.test(url);

  if (isVideo) {
    // Hide image, show video
    if (imageLightboxImg) {
      imageLightboxImg.style.display = 'none';
      imageLightboxImg.src = '';
    }
    if (imageLightboxVideo) {
      imageLightboxVideo.style.display = 'block';
      imageLightboxVideo.src = url;
      imageLightboxVideo.play().catch(() => {});
    }
  } else {
    // Hide video, show image
    if (imageLightboxVideo) {
      imageLightboxVideo.pause();
      imageLightboxVideo.src = '';
      imageLightboxVideo.style.display = 'none';
    }
    if (imageLightboxImg) {
      imageLightboxImg.style.display = 'block';
      imageLightboxImg.src = url;
    }
  }
}

function openImageLightbox(startIndex) {
  if (!imageLightbox) return;
  if (!currentImageUrls.length) return;

  showLightboxMedia(startIndex || 0);
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
    showLightboxMedia(currentImageIndex - 1);
  });
}

if (imageLightboxNext) {
  imageLightboxNext.addEventListener('click', () => {
    showLightboxMedia(currentImageIndex + 1);
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
    showLightboxMedia(currentImageIndex - 1);
  } else if (e.key === 'ArrowRight') {
    showLightboxMedia(currentImageIndex + 1);
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