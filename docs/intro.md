---
id: intro
title: Introduction
sidebar_position: 1
---

# Token Showcase

A production-ready design token pipeline that transforms Figma exports into platform-specific code.

## What it does

Design tokens are the single source of truth for your design decisions — colors, typography, spacing, shadows, and more. This system:

1. **Sources** tokens from Figma using the [W3C DTCG format](https://tr.designtokens.org/format/)
2. **Transforms** them with [Style Dictionary v4](https://styledictionary.com)
3. **Outputs** platform-specific files for CSS, SCSS, Android, iOS, and TypeScript

## Quick start

```bash
# Install dependencies
npm install

# Build all token platforms
npm run build:tokens

# Start the docs site
npm start
```

## Output files

After running `npm run build:tokens`, you'll find generated files in `dist/`:

| Platform | Output |
|----------|--------|
| CSS | `dist/css/variables.css` |
| SCSS | `dist/scss/_variables.scss`, `dist/scss/_map.scss` |
| Android | `dist/android/colors.xml`, `dist/android/dimens.xml` |
| iOS | `dist/ios/StyleDictionaryColor.swift`, `dist/ios/StyleDictionarySize.swift` |
| TypeScript | `dist/ts/tokens.ts` |

## Token structure

Tokens are organized into two layers:

- **Primitives** — raw values (all colors, all spacing steps, etc.)
- **Semantic** — purpose-driven aliases that reference primitives (e.g., `semantic.color.text.primary` → `color.gray.900`)

## Browse tokens

- [Colors](/tokens/colors) — 6 hues × 10 shades
- [Typography](/tokens/typography) — font sizes, weights, line heights
- [Spacing](/tokens/spacing) — 4px-grid scale
- [Border Radius](/tokens/border-radius) — none → full pill
- [Shadows](/tokens/shadows) — xs → 2xl + inner
- [Opacity](/tokens/opacity) — 0–100 scale
- [Semantic Colors](/tokens/semantic-colors) — purpose-driven aliases
