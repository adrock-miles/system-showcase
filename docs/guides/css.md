---
id: css
title: CSS Guide
sidebar_position: 1
---

# Using Tokens in CSS

After running `npm run build:tokens`, import the generated CSS file and use tokens as CSS custom properties.

## Setup

```html
<!-- Link in your HTML -->
<link rel="stylesheet" href="path/to/dist/css/variables.css">
```

Or import in your CSS entry point:

```css
@import 'path/to/dist/css/variables.css';
```

Or in your bundler entry file:

```js
import 'token-showcase/dist/css/variables.css';
```

## Usage examples

### Colors

```css
.button {
  background-color: var(--color-blue-600);
  color: var(--color-white);
  border: 1px solid var(--color-blue-700);
}

.button:hover {
  background-color: var(--color-blue-700);
}

.button:active {
  background-color: var(--color-blue-800);
}
```

### Typography

```css
.heading {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-3-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--font-line-height-tight);
}

.caption {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
}
```

### Spacing

```css
.card {
  padding: var(--spacing-6);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.card + .card {
  margin-top: var(--spacing-4);
}
```

### Semantic tokens

Prefer semantic tokens for component styles — they express intent rather than raw values:

```css
.page {
  background: var(--semantic-color-background-primary);
  color: var(--semantic-color-text-primary);
}

.link {
  color: var(--semantic-color-text-link);
}

.link:hover {
  color: var(--semantic-color-text-link-hover);
}

.alert-error {
  background: var(--semantic-color-feedback-error-bg);
  color: var(--semantic-color-feedback-error-text);
  border: 1px solid var(--semantic-color-feedback-error);
}
```

## Runtime theming

Because `outputReferences: true` is set, semantic tokens reference primitives via `var()`. You can override a primitive token to update all semantic tokens that reference it:

```css
/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --color-gray-900: #f9fafb;  /* invert gray scale */
    --color-white: #111827;
  }
}
```
