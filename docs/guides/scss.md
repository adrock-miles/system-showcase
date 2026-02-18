---
id: scss
title: SCSS Guide
sidebar_position: 2
---

# Using Tokens in SCSS

Two SCSS files are generated: `_variables.scss` (individual `$variables`) and `_map.scss` (a nested `$tokens` map).

## Setup

```scss
// Option A: Import variables file
@use 'path/to/dist/scss/variables' as *;

// Option B: Import with namespace
@use 'path/to/dist/scss/variables' as tokens;

// Map file (for map-based access)
@use 'path/to/dist/scss/map' as *;
```

## Variables file usage

### Colors

```scss
.button {
  background-color: $color-blue-600;
  color: $color-white;
  border: 1px solid $color-blue-700;

  &:hover {
    background-color: $color-blue-700;
  }

  &:active {
    background-color: $color-blue-800;
  }
}
```

### Typography

```scss
.heading {
  font-family: $font-family-sans;
  font-size: $font-size-3-xl;
  font-weight: $font-weight-bold;
  line-height: $font-line-height-tight;
}
```

### Spacing

```scss
.card {
  padding: $spacing-6;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  gap: $spacing-4;
}
```

## Map file usage

```scss
@use 'path/to/dist/scss/map' as *;

// Access via map.get
.button {
  background: map.get($tokens, 'color', 'blue', '600');
}

// Build a color utility loop
$palette: (blue, gray, green, red);

@each $hue in $palette {
  .bg-#{$hue} {
    background: map.get($tokens, 'color', $hue, '500');
  }
}
```

## Semantic tokens

```scss
.page {
  background: $semantic-color-background-primary;
  color: $semantic-color-text-primary;
}

.link {
  color: $semantic-color-text-link;

  &:hover {
    color: $semantic-color-text-link-hover;
  }
}
```

## Mixins with tokens

```scss
@mixin card($elevation: md) {
  padding: $spacing-6;
  border-radius: $border-radius-lg;
  background: $semantic-color-surface-default;

  @if $elevation == sm {
    box-shadow: $shadow-sm;
  } @else if $elevation == md {
    box-shadow: $shadow-md;
  } @else if $elevation == lg {
    box-shadow: $shadow-lg;
  }
}

.product-card {
  @include card(md);
}
```
