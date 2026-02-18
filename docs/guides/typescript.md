---
id: typescript
title: TypeScript Guide
sidebar_position: 5
---

# Using Tokens in TypeScript / JavaScript

The TypeScript module (`dist/ts/tokens.ts`) provides two ways to access tokens: tree-shakable named exports and a nested object.

## Setup

```bash
# Build tokens first
npm run build:tokens
```

Then import from the generated file:

```ts
// Named imports (tree-shaking friendly)
import { colorBlue600, spacingFour, fontSizeBase } from './dist/ts/tokens';

// Nested object (full map)
import { tokens } from './dist/ts/tokens';
```

## Named exports

Every token becomes a named constant in `camelCase`:

```ts
import {
  colorBlue600,
  colorGray900,
  spacingFour,
  spacingSix,
  fontSizeBase,
  fontWeightBold,
  borderRadiusLg,
  shadowMd,
} from './dist/ts/tokens';

// Use in inline styles (React)
const buttonStyle: React.CSSProperties = {
  backgroundColor: colorBlue600,
  color: '#ffffff',
  padding: `${spacingTwo} ${spacingFour}`,
  borderRadius: borderRadiusLg,
  fontSize: fontSizeBase,
  fontWeight: fontWeightBold,
};
```

## Nested object

```ts
import { tokens } from './dist/ts/tokens';

// Access by path
const primary = tokens.color.blue['600'];     // "#2563eb"
const bodyText = tokens.font.size.base;        // "1rem"
const cardPad = tokens.spacing['6'];           // "1.5rem"
const cardRadius = tokens.borderRadius.lg;     // "0.5rem"
```

## TypeScript types

```ts
import type { TokenValue, Tokens } from './dist/ts/tokens';

function applyToken(value: TokenValue): string {
  return String(value);
}

// Full tokens type for prop typing
function getColor(path: keyof Tokens['color']): string {
  return tokens.color[path]['500'] as string;
}
```

## React component example

```tsx
import { tokens } from './dist/ts/tokens';

interface BadgeProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
}

const variantColors = {
  success: { bg: tokens.color.green['50'], text: tokens.color.green['700'], border: tokens.color.green['500'] },
  error:   { bg: tokens.color.red['50'],   text: tokens.color.red['700'],   border: tokens.color.red['500'] },
  warning: { bg: tokens.color.yellow['50'],text: tokens.color.yellow['700'],border: tokens.color.yellow['500'] },
  info:    { bg: tokens.color.blue['50'],  text: tokens.color.blue['700'],  border: tokens.color.blue['500'] },
};

export function Badge({ variant, children }: BadgeProps) {
  const colors = variantColors[variant];
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        padding: `${tokens.spacing['1']} ${tokens.spacing['3']}`,
        borderRadius: tokens.borderRadius.full,
        fontSize: tokens.font.size.sm,
        fontWeight: tokens.font.weight.semibold,
      }}
    >
      {children}
    </span>
  );
}
```

## Using with CSS-in-JS (Emotion / styled-components)

```ts
import { css } from '@emotion/react';
import { tokens } from './dist/ts/tokens';

const cardStyles = css`
  padding: ${tokens.spacing['6']};
  border-radius: ${tokens.borderRadius.lg};
  background: ${tokens.color.white.$value};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;
```

## Naming convention

The `name/camelCase` transform strips non-alphanumeric characters:

| Token path | Named export |
|------------|-------------|
| `color.blue.600` | `colorBlue600` |
| `spacing.0.5` | `spacing05` |
| `spacing.4` | `spacingFour` *(wait — actually `spacing4`)* |
| `font.size.2xl` | `fontSize2Xl` |
| `borderRadius.2xl` | `borderRadius2Xl` |
