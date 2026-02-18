/**
 * Design Token System — Documentation App
 * Renders token showcases from embedded token data.
 */

// ─── Token Data ───────────────────────────────────────────────────────────────
// This mirrors the structure of tokens/primitives/*.json and tokens/semantic/*.json

const TOKENS = {
  color: {
    blue:   { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
    gray:   { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827' },
    green:  { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d' },
    red:    { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d' },
    yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12' },
    purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87' },
    white:  '#ffffff',
    black:  '#000000',
  },

  spacing: {
    '0': '0px', 'px': '1px', '0.5': '2px', '1': '4px', '1.5': '6px',
    '2': '8px', '2.5': '10px', '3': '12px', '3.5': '14px',
    '4': '16px', '5': '20px', '6': '24px', '7': '28px',
    '8': '32px', '9': '36px', '10': '40px', '11': '44px',
    '12': '48px', '14': '56px', '16': '64px', '20': '80px',
    '24': '96px', '28': '112px', '32': '128px',
  },

  font: {
    family: {
      sans: "Inter, system-ui, sans-serif",
      serif: "Georgia, serif",
      mono: "JetBrains Mono, monospace",
    },
    size: {
      xs: '12px', sm: '14px', base: '16px', lg: '18px',
      xl: '20px', '2xl': '24px', '3xl': '30px', '4xl': '36px',
      '5xl': '48px', '6xl': '60px', '7xl': '72px',
    },
    weight: {
      thin: '100', light: '300', regular: '400', medium: '500',
      semibold: '600', bold: '700', extrabold: '800', black: '900',
    },
    lineHeight: {
      none: '1', tight: '1.25', snug: '1.375', normal: '1.5',
      relaxed: '1.625', loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em', tight: '-0.025em', normal: '0em',
      wide: '0.025em', wider: '0.05em', widest: '0.1em',
    },
  },

  borderRadius: {
    none: '0px', xs: '2px', sm: '4px', md: '6px',
    lg: '8px', xl: '12px', '2xl': '16px', '3xl': '24px', full: '9999px',
  },

  shadow: {
    none:  { css: 'none',                         desc: 'No shadow' },
    xs:    { css: '0 1px 2px rgba(0,0,0,0.04)',   desc: 'Subtle depth' },
    sm:    { css: '0 1px 3px rgba(0,0,0,0.10)',   desc: 'Inputs, triggers' },
    md:    { css: '0 4px 6px -1px rgba(0,0,0,0.10)',  desc: 'Cards, popovers' },
    lg:    { css: '0 10px 15px -3px rgba(0,0,0,0.10)', desc: 'Modals, drawers' },
    xl:    { css: '0 20px 25px -5px rgba(0,0,0,0.10)', desc: 'Prominent float' },
    '2xl': { css: '0 25px 50px -12px rgba(0,0,0,0.25)', desc: 'Hero elements' },
    inner: { css: 'inset 0 2px 4px rgba(0,0,0,0.06)', desc: 'Sunken inputs' },
  },

  opacity: {
    '0': '0', '5': '0.05', '10': '0.1', '20': '0.2', '25': '0.25',
    '30': '0.3', '40': '0.4', '50': '0.5', '60': '0.6',
    '70': '0.7', '75': '0.75', '80': '0.8', '90': '0.9', '95': '0.95', '100': '1',
  },

  semantic: {
    background: {
      primary:   { ref: '{color.white}',    value: '#ffffff',  desc: 'Main page background' },
      secondary: { ref: '{color.gray.50}',  value: '#f9fafb',  desc: 'Subtle section background' },
      inverse:   { ref: '{color.gray.900}', value: '#111827',  desc: 'Dark/contrast background' },
    },
    text: {
      primary:   { ref: '{color.gray.900}', value: '#111827',  desc: 'Primary body text' },
      secondary: { ref: '{color.gray.600}', value: '#4b5563',  desc: 'Supporting text' },
      tertiary:  { ref: '{color.gray.500}', value: '#6b7280',  desc: 'Hints, captions' },
      disabled:  { ref: '{color.gray.400}', value: '#9ca3af',  desc: 'Disabled text' },
      inverse:   { ref: '{color.white}',    value: '#ffffff',  desc: 'Text on dark bg' },
      link:      { ref: '{color.blue.600}', value: '#2563eb',  desc: 'Hyperlinks' },
    },
    border: {
      default:   { ref: '{color.gray.200}', value: '#e5e7eb',  desc: 'Default borders' },
      subtle:    { ref: '{color.gray.100}', value: '#f3f4f6',  desc: 'Very subtle borders' },
      focus:     { ref: '{color.blue.500}', value: '#3b82f6',  desc: 'Focus ring' },
      error:     { ref: '{color.red.500}',  value: '#ef4444',  desc: 'Error state' },
    },
    feedback: {
      success:    { ref: '{color.green.500}',  value: '#22c55e',  desc: 'Success status' },
      successBg:  { ref: '{color.green.50}',   value: '#f0fdf4',  desc: 'Success background' },
      warning:    { ref: '{color.yellow.500}', value: '#eab308',  desc: 'Warning status' },
      warningBg:  { ref: '{color.yellow.50}',  value: '#fefce8',  desc: 'Warning background' },
      error:      { ref: '{color.red.500}',    value: '#ef4444',  desc: 'Error status' },
      errorBg:    { ref: '{color.red.50}',     value: '#fef2f2',  desc: 'Error background' },
      info:       { ref: '{color.blue.500}',   value: '#3b82f6',  desc: 'Info status' },
      infoBg:     { ref: '{color.blue.50}',    value: '#eff6ff',  desc: 'Info background' },
    },
    action: {
      primary:          { ref: '{color.blue.600}', value: '#2563eb',  desc: 'Primary button bg' },
      primaryHover:     { ref: '{color.blue.700}', value: '#1d4ed8',  desc: 'Primary hover' },
      primaryForeground:{ ref: '{color.white}',    value: '#ffffff',  desc: 'Text on primary' },
      secondary:        { ref: '{color.gray.100}', value: '#f3f4f6',  desc: 'Secondary button bg' },
      destructive:      { ref: '{color.red.600}',  value: '#dc2626',  desc: 'Destructive action' },
    },
  },
};

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Determines if a hex color is light (for contrast text) */
function isLightColor(hex) {
  if (!hex || hex === 'transparent' || hex === 'none') return true;
  const c = hex.replace('#', '');
  if (c.length < 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'style') e.style.cssText = v;
    else e.setAttribute(k, v);
  });
  children.flat().forEach(child => {
    if (child == null) return;
    e.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return e;
}

// ─── Color Palette ────────────────────────────────────────────────────────────

function renderColors() {
  const container = document.getElementById('color-palette');
  if (!container) return;

  const hues = ['blue', 'gray', 'green', 'red', 'yellow', 'purple'];

  hues.forEach(hue => {
    const shades = TOKENS.color[hue];
    const group = el('div', { class: 'color-group' });
    group.appendChild(el('div', { class: 'color-group-name' }, hue));

    const swatches = el('div', { class: 'color-swatches' });

    Object.entries(shades).forEach(([shade, value]) => {
      const swatch = el('div', { class: 'color-swatch' });
      const colorEl = el('div', { class: 'swatch-color', style: `background: ${value};` });
      colorEl.title = `${hue}.${shade} — ${value}`;
      swatch.appendChild(colorEl);
      swatch.appendChild(el('div', { class: 'swatch-label' }, shade));
      swatch.appendChild(el('div', { class: 'swatch-value' }, value));
      swatches.appendChild(swatch);
    });

    group.appendChild(swatches);
    container.appendChild(group);
  });

  // Base colors
  const baseGroup = el('div', { class: 'color-group' });
  baseGroup.appendChild(el('div', { class: 'color-group-name' }, 'Base'));
  const baseSwatches = el('div', { class: 'color-swatches' });
  ['white', 'black'].forEach(name => {
    const value = TOKENS.color[name];
    const swatch = el('div', { class: 'color-swatch' });
    const colorEl = el('div', { class: 'swatch-color', style: `background: ${value}; border: 1px solid #e5e7eb;` });
    colorEl.title = `color.${name} — ${value}`;
    swatch.appendChild(colorEl);
    swatch.appendChild(el('div', { class: 'swatch-label' }, name));
    swatch.appendChild(el('div', { class: 'swatch-value' }, value));
    baseSwatches.appendChild(swatch);
  });
  baseGroup.appendChild(baseSwatches);
  container.appendChild(baseGroup);
}

// ─── Typography ───────────────────────────────────────────────────────────────

function renderTypography() {
  const container = document.getElementById('type-showcase');
  if (!container) return;

  // Font size scale
  container.appendChild(el('h2', {}, 'Font Size Scale'));
  const scaleWrap = el('div', {});
  const sizes = Object.entries(TOKENS.font.size);
  const sampleText = 'The quick brown fox';

  sizes.forEach(([name, value]) => {
    const item = el('div', { class: 'type-scale-item' });
    const meta = el('div', { class: 'type-scale-meta' });
    meta.appendChild(el('div', { class: 'type-scale-name' }, `font.size.${name}`));
    meta.appendChild(el('div', { class: 'type-scale-value' }, value));
    const preview = el('div', {
      class: 'type-scale-preview',
      style: `font-size: ${value}; font-family: Inter, sans-serif;`
    }, parseInt(value) > 36 ? 'Aa' : sampleText);
    item.appendChild(meta);
    item.appendChild(preview);
    scaleWrap.appendChild(item);
  });
  container.appendChild(scaleWrap);

  // Font weights
  container.appendChild(el('h2', {}, 'Font Weights'));
  const weightGrid = el('div', { class: 'type-weight-grid' });
  Object.entries(TOKENS.font.weight).forEach(([name, value]) => {
    const item = el('div', { class: 'type-weight-item' });
    item.appendChild(el('div', {
      style: `font-weight: ${value}; font-size: 20px; font-family: Inter, sans-serif;`
    }, 'Ag'));
    item.appendChild(el('div', { class: 'type-scale-name' }, name));
    item.appendChild(el('div', { class: 'type-weight-label' }, value));
    weightGrid.appendChild(item);
  });
  container.appendChild(weightGrid);

  // Font families
  container.appendChild(el('h2', {}, 'Font Families'));
  Object.entries(TOKENS.font.family).forEach(([name, value]) => {
    const item = el('div', { class: 'type-scale-item' });
    const meta = el('div', { class: 'type-scale-meta' });
    meta.appendChild(el('div', { class: 'type-scale-name' }, name));
    meta.appendChild(el('div', { class: 'type-scale-value' }, name));
    item.appendChild(meta);
    item.appendChild(el('div', {
      class: 'type-scale-preview',
      style: `font-size: 18px; font-family: ${value};`
    }, 'The quick brown fox jumps over the lazy dog'));
    container.appendChild(item);
  });

  // Line heights
  container.appendChild(el('h2', {}, 'Line Heights'));
  const lhWrap = el('div', {});
  Object.entries(TOKENS.font.lineHeight).forEach(([name, value]) => {
    const item = el('div', { class: 'type-scale-item' });
    const meta = el('div', { class: 'type-scale-meta' });
    meta.appendChild(el('div', { class: 'type-scale-name' }, name));
    meta.appendChild(el('div', { class: 'type-scale-value' }, value));
    item.appendChild(meta);
    item.appendChild(el('div', {
      style: `line-height: ${value}; font-size: 14px; max-width: 320px; color: #4b5563; border-left: 3px solid #e5e7eb; padding-left: 12px;`
    }, `This text demonstrates the "${name}" line height (${value}). A second line shows the rhythm.`));
    lhWrap.appendChild(item);
  });
  container.appendChild(lhWrap);
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

function renderSpacing() {
  const container = document.getElementById('spacing-showcase');
  if (!container) return;

  const maxPx = 128; // cap bar width at this value

  Object.entries(TOKENS.spacing).forEach(([name, value]) => {
    const px = parseInt(value) || 0;
    if (px > 128) return; // skip very large for visual

    const item = el('div', { class: 'spacing-item' });
    const meta = el('div', { class: 'spacing-meta' });
    meta.appendChild(el('div', { class: 'spacing-name' }, `spacing-${name}`));
    meta.appendChild(el('div', { class: 'spacing-value' }, value));
    item.appendChild(meta);

    const barWrap = el('div', { class: 'spacing-bar-wrap' });
    const bar = el('div', {
      class: 'spacing-bar',
      style: `width: ${Math.max(px, 4)}px;`
    });
    barWrap.appendChild(bar);
    item.appendChild(barWrap);
    container.appendChild(item);
  });
}

// ─── Border Radius ────────────────────────────────────────────────────────────

function renderBorderRadius() {
  const container = document.getElementById('radius-showcase');
  if (!container) return;

  const grid = el('div', { class: 'radius-grid' });

  Object.entries(TOKENS.borderRadius).forEach(([name, value]) => {
    const item = el('div', { class: 'radius-item' });
    const box = el('div', {
      class: 'radius-box',
      style: `border-radius: ${value};`
    });
    item.appendChild(box);
    item.appendChild(el('div', { class: 'radius-label' }, name));
    item.appendChild(el('div', { class: 'radius-value' }, value));
    grid.appendChild(item);
  });

  container.appendChild(grid);
}

// ─── Shadows ──────────────────────────────────────────────────────────────────

function renderShadows() {
  const container = document.getElementById('shadow-showcase');
  if (!container) return;

  const grid = el('div', { class: 'shadow-grid' });

  Object.entries(TOKENS.shadow).forEach(([name, { css, desc }]) => {
    const item = el('div', { class: 'shadow-item' });
    const box = el('div', {
      class: 'shadow-box',
      style: `box-shadow: ${css};`
    });
    item.appendChild(box);
    item.appendChild(el('div', { class: 'shadow-label' }, `shadow.${name}`));
    item.appendChild(el('div', { class: 'shadow-value' }, desc));
    grid.appendChild(item);
  });

  container.appendChild(grid);
}

// ─── Opacity ──────────────────────────────────────────────────────────────────

function renderOpacity() {
  const container = document.getElementById('opacity-showcase');
  if (!container) return;

  const grid = el('div', { class: 'opacity-grid' });

  Object.entries(TOKENS.opacity).forEach(([name, value]) => {
    const item = el('div', { class: 'opacity-item' });
    const swatch = el('div', {
      class: 'opacity-swatch',
      style: `opacity: ${value};`
    });
    item.appendChild(swatch);
    item.appendChild(el('div', { class: 'opacity-label' }, `${name}%`));
    item.appendChild(el('div', { class: 'opacity-value' }, value));
    grid.appendChild(item);
  });

  container.appendChild(grid);
}

// ─── Semantic Colors ──────────────────────────────────────────────────────────

function renderSemantic() {
  const container = document.getElementById('semantic-showcase');
  if (!container) return;

  Object.entries(TOKENS.semantic).forEach(([groupName, tokens]) => {
    const group = el('div', { class: 'semantic-group' });
    group.appendChild(el('div', { class: 'semantic-group-name' }, groupName));

    const table = el('table', { class: 'semantic-table' });
    const thead = el('thead', {});
    thead.appendChild(el('tr', {},
      el('th', {}, 'Token'),
      el('th', {}, 'Reference'),
      el('th', {}, 'Resolved'),
      el('th', {}, 'Description'),
    ));
    table.appendChild(thead);

    const tbody = el('tbody', {});
    Object.entries(tokens).forEach(([tokenName, token]) => {
      const tr = el('tr', {});

      // Token name
      const tdName = el('td', {});
      tdName.appendChild(el('span', { class: 'semantic-name' },
        `semantic.color.${groupName}.${tokenName}`
      ));
      tr.appendChild(tdName);

      // Reference
      const tdRef = el('td', {});
      tdRef.appendChild(el('span', { class: 'semantic-ref' }, token.ref));
      tr.appendChild(tdRef);

      // Resolved color swatch
      const tdVal = el('td', {});
      const swatch = el('span', {
        class: 'semantic-swatch',
        style: `background: ${token.value}; border: 1px solid ${token.value === '#ffffff' ? '#e5e7eb' : 'transparent'};`
      });
      tdVal.appendChild(swatch);
      tdVal.appendChild(el('span', { class: 'semantic-ref' }, token.value));
      tr.appendChild(tdVal);

      // Description
      tr.appendChild(el('td', { class: 'semantic-desc' }, token.desc));

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    group.appendChild(table);
    container.appendChild(group);
  });
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-section]');

  // Highlight active nav item on scroll
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));

  // Smooth scroll on nav click
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(item.dataset.section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.dataset.tab;
      const group = tab.closest('.section') || document;

      // Update tab buttons
      group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show relevant content
      group.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabId);
      });
    });
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderColors();
  renderTypography();
  renderSpacing();
  renderBorderRadius();
  renderShadows();
  renderOpacity();
  renderSemantic();
  initNavigation();
  initTabs();
});
