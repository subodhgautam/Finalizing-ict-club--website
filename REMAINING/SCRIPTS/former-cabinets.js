// // Former Cabinets Section Functionality
// document.addEventListener('DOMContentLoaded', () => {
//     const yearToggles = document.querySelectorAll('.year-toggle');
    
//     yearToggles.forEach(toggle => {
//         toggle.addEventListener('click', () => {
//             const content = toggle.nextElementSibling;
//             const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
//             // Toggle the current section
//             toggle.setAttribute('aria-expanded', !isExpanded);
//             content.hidden = isExpanded;
            
//             // Optional: Close other sections when opening one
//             if (!isExpanded) {
//                 yearToggles.forEach(otherToggle => {
//                     if (otherToggle !== toggle) {
//                         otherToggle.setAttribute('aria-expanded', 'false');
//                         otherToggle.nextElementSibling.hidden = true;
//                     }
//                 });
//             }
//         });
//     });
    
//     // Open the founding cabinet by default
//     const foundingCabinet = document.querySelector('.founding-cabinet .year-toggle');
//     if (foundingCabinet) {
//         foundingCabinet.click();
//     }
// });

/* Former Cabinets — improved JS
   - Keeps original class names and behavior
   - Better accessibility (keyboard), smooth height animation, event delegation
   - Provides helper to render dynamic data (JSON) later
*/

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#former-cabinets');
  if (!container) return;

  // Use event delegation for all toggles
  container.addEventListener('click', (e) => {
    const toggle = e.target.closest('.year-toggle');
    if (!toggle) return;
    toggleToggle(toggle);
  });

  // keyboard accessibility (Enter / Space)
  container.addEventListener('keydown', (e) => {
    const toggle = e.target.closest('.year-toggle');
    if (!toggle) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleToggle(toggle);
    }
  });

  // Toggle logic — uses maxHeight for smooth animation and sets aria attributes + data-open
  function toggleToggle(toggle) {
    const content = toggle.nextElementSibling;
    if (!content) return;

    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    // If opening, close siblings first (optional single-open behavior)
    if (!isExpanded) {
      closeAllExcept(toggle);
      openPanel(toggle, content);
    } else {
      closePanel(toggle, content);
    }
  }

  function openPanel(toggle, content) {
    // set attributes
    toggle.setAttribute('aria-expanded', 'true');
    content.setAttribute('data-open', 'true');

    // animate height from 0 -> scrollHeight
    content.style.maxHeight = content.scrollHeight + 'px';

    // remove inline style after transition to allow natural growth
    const cleanup = () => {
      content.style.maxHeight = '';
      content.removeEventListener('transitionend', cleanup);
    };
    content.addEventListener('transitionend', cleanup);
  }

  function closePanel(toggle, content) {
    toggle.setAttribute('aria-expanded', 'false');
    // For animation, set explicit height then collapse
    content.style.maxHeight = content.scrollHeight + 'px';
    // force reflow
    content.offsetHeight;
    content.style.maxHeight = '0px';
    content.removeAttribute('data-open');
    // cleanup after transition
    const onEnd = () => {
      content.style.maxHeight = '';
      content.removeEventListener('transitionend', onEnd);
    };
    content.addEventListener('transitionend', onEnd);
  }

  function closeAllExcept(activeToggle) {
    const toggles = container.querySelectorAll('.year-toggle[aria-expanded="true"]');
    toggles.forEach((t) => {
      if (t === activeToggle) return;
      const content = t.nextElementSibling;
      t.setAttribute('aria-expanded', 'false');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.offsetHeight;
        content.style.maxHeight = '0px';
        content.removeAttribute('data-open');
        // cleanup
        content.addEventListener('transitionend', () => {
          content.style.maxHeight = '';
        }, { once: true });
      }
    });
  }

  // Open founding cabinet by default (keeps your previous behavior)
  const foundingCabinetToggle = container.querySelector('.founding-cabinet .year-toggle');
  if (foundingCabinetToggle) {
    // Wait a frame so DOM paint is ready for height measurement
    requestAnimationFrame(() => {
      if (foundingCabinetToggle.getAttribute('aria-expanded') !== 'true') {
        foundingCabinetToggle.click();
      }
    });
  }

  /***********************************************************************
   * Dynamic rendering helpers (for future scaling)
   *
   * Example usage (later):
   *   const data = [
   *     { year: 2024, members: [{role: "President", name: "Alex Turner", img: "url"}, ...] },
   *     { year: 2015, founding: true, members: [...] }
   *   ];
   *   renderCabinets('#former-cabinets .year-groups', data);
   *
   * This keeps your HTML small and allows fetching JSON from an API later.
   **********************************************************************/
  window.renderCabinets = function (targetSelector, cabinets) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    target.innerHTML = ''; // clear existing groups

    cabinets.forEach((cab, idx) => {
      const group = document.createElement('div');
      group.className = 'year-group' + (cab.founding ? ' founding-cabinet' : '');

      // Create toggle
      const toggle = document.createElement('button');
      toggle.className = 'year-toggle flex items-center justify-between w-full';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.type = 'button';
      const h3 = document.createElement('h3');
      h3.textContent = cab.title || (`Cabinet ${cab.year || idx}`);
      const icon = document.createElement('i');
      icon.className = 'fas fa-chevron-down transition';
      toggle.appendChild(h3);
      toggle.appendChild(icon);

      // Content container
      const content = document.createElement('div');
      content.className = 'year-content';
      content.hidden = false; // we'll handle open/close with data-open and maxHeight
      content.setAttribute('data-open', 'false');

      // Grid
      const grid = document.createElement('div');
      grid.className = 'former-cabinet-grid';

      (cab.members || []).forEach((m) => {
        const card = document.createElement('div');
        card.className = 'former-member-card' + (cab.founding && m.founding ? ' founding-member' : '');

        const imgWrap = document.createElement('div');
        imgWrap.className = 'member-image';
        const img = document.createElement('img');
        img.alt = `${m.role || 'Member'} ${m.name || ''}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = m.img || (`https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || 'Member')}&background=ddd&color=333&size=200`);
        imgWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'member-info';
        const role = document.createElement('h4');
        role.textContent = m.role || '';
        const name = document.createElement('p');
        name.textContent = m.name || '';

        info.appendChild(role);
        info.appendChild(name);

        card.appendChild(imgWrap);
        card.appendChild(info);
        grid.appendChild(card);
      });

      content.appendChild(grid);
      group.appendChild(toggle);
      group.appendChild(content);
      target.appendChild(group);
    });

    // After rendering, set up default behavior: attach aria-expanded attributes on toggles
    target.querySelectorAll('.year-toggle').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      // make toggle focusable
      t.tabIndex = 0;
    });
  };

});
