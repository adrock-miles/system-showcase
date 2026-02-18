# Design Token System

A design token pipeline that transforms **Figma token exports** (W3C DTCG format) into platform-native code for CSS, SCSS, Android, iOS/Swift, and TypeScript — powered by [Style Dictionary v4](https://styledictionary.com).

**Docs site:** [adrock-miles.github.io/system-showcase](https://adrock-miles.github.io/system-showcase/)

## Quick Start

```bash
npm install

# Build token outputs (CSS, SCSS, Android, iOS, TypeScript)
npm run build:tokens

# Start the docs site locally
npm start

# Build the static docs site
npm run build
```

---

## Project Structure

```
system-showcase/
├── tokens/
│   ├── primitives/
│   │   ├── color.json          — raw color palette (blues, grays, greens, reds...)
│   │   ├── spacing.json        — spacing scale (4px base unit)
│   │   ├── typography.json     — font sizes, weights, line heights, families
│   │   ├── border-radius.json  — corner radius values
│   │   ├── shadow.json         — elevation shadows (xs → 2xl + inner)
│   │   └── opacity.json        — opacity scale (0–100)
│   └── semantic/
│       └── color.json          — role-based aliases (text, surface, action...)
├── docs/                       — Docusaurus markdown/MDX pages
│   ├── intro.md
│   ├── tokens/                 — token reference pages (with live component previews)
│   └── guides/                 — platform integration guides
├── src/
│   ├── components/TokenShowcase.tsx  — token display React components
│   ├── pages/index.tsx               — landing page
│   └── css/custom.css                — Docusaurus theme overrides
├── .github/workflows/deploy.yml — GitHub Actions: build + deploy to GitHub Pages
├── sd.config.mjs               — Style Dictionary configuration
├── docusaurus.config.ts        — Docusaurus site configuration
├── dist/                       — generated token outputs (git-ignored)
│   ├── css/variables.css
│   ├── scss/_variables.scss + _map.scss
│   ├── android/colors.xml + dimens.xml
│   ├── ios/StyleDictionaryColor.swift + StyleDictionarySize.swift
│   └── ts/tokens.ts
└── build/                      — Docusaurus static site output (git-ignored)
```

---

## Token Format (W3C DTCG)

Tokens use the [W3C Design Token Community Group](https://tr.designtokens.org/format/) format. This is compatible with:
- **Figma Variables** (via REST API + transform script)
- **Tokens Studio for Figma** (export as W3C JSON)
- **Style Dictionary v4** (native support with `usesDtcg: true`)

### Primitive token example

```json
{
  "color": {
    "blue": {
      "500": {
        "$value": "#3b82f6",
        "$type": "color",
        "$description": "Core brand blue"
      }
    }
  }
}
```

### Semantic token with reference

```json
{
  "semantic": {
    "color": {
      "action": {
        "primary": {
          "$value": "{color.blue.600}",
          "$type": "color",
          "$description": "Primary action color"
        }
      }
    }
  }
}
```

---

## Platform Outputs

### CSS (`dist/css/variables.css`)
```css
:root {
  --color-blue-500: #3b82f6;
  --semantic-color-action-primary: var(--color-blue-600);
}
```
Semantic tokens output as `var()` references (great for runtime theming).

### SCSS (`dist/scss/_variables.scss`)
```scss
$color-blue-500: #3b82f6;
$semantic-color-action-primary: $color-blue-600;
```
Also generates `_map.scss` with a nested `$tokens` Sass map.

### Android (`dist/android/`)
```xml
<!-- colors.xml -->
<color name="color_blue_500">#ff3b82f6</color>

<!-- dimens.xml -->
<dimen name="spacing_4">16.00dp</dimen>
```

### iOS / Swift (`dist/ios/`)
```swift
// StyleDictionaryColor.swift
public class StyleDictionaryColor {
  public static let colorBlue500 = UIColor(red: 0.231, green: 0.510, blue: 0.965, alpha: 1)
}

// StyleDictionarySize.swift
public class StyleDictionarySize {
  public static let spacingFour: CGFloat = 16.0
}
```

### TypeScript (`dist/ts/tokens.ts`)
```typescript
export const colorBlue500 = "#3b82f6" as const;
export const spacingFour = "1rem" as const;

export const tokens = {
  color: { blue: { '500': '#3b82f6' } },
  spacing: { '4': '1rem' },
  // ...
} as const;
```

---

## Updating Tokens from Figma

### Via Tokens Studio Plugin
1. Install **Tokens Studio for Figma**
2. Export as **W3C JSON format**
3. Replace files in `tokens/` with the exported files
4. Run `npm run build:tokens`

### Via Figma Variables REST API
```bash
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/files/YOUR_FILE_ID/variables/local"
```
Use a transform script to convert Figma's variable format to W3C DTCG.

### Watching for Changes
```bash
npm run build:tokens:watch
```
Automatically rebuilds on any `.json` file change in `tokens/`.

---

## Docs Site

The documentation site is built with [Docusaurus](https://docusaurus.io) and deployed automatically to GitHub Pages on every push to `main`.

### Running locally

```bash
npm start        # dev server at localhost:3000
npm run build    # production build → build/
npm run serve    # preview the production build
```

### Deployment

Push to `main` — the GitHub Actions workflow in `.github/workflows/deploy.yml` will:
1. Run `npm run build:tokens` to generate token outputs
2. Run `npm run build` to build the Docusaurus site
3. Deploy the `build/` directory to GitHub Pages

To enable: go to **GitHub repo → Settings → Pages → Source → GitHub Actions**.

---

## Extending Style Dictionary

### Adding a new platform
Edit `sd.config.mjs` and add a new entry under `platforms`:

```js
platforms: {
  // ... existing platforms ...
  flutter: {
    transformGroup: 'flutter',
    buildPath: 'dist/flutter/',
    files: [{ destination: 'tokens.dart', format: 'flutter/class.dart' }],
  },
}
```

### Adding a new token file
Create a new JSON file anywhere in `tokens/` following the W3C format. Style Dictionary will automatically pick it up (glob: `tokens/**/*.json`).

### Custom transforms & formats
Register in `sd.config.mjs` using `StyleDictionary.registerTransform()` and `StyleDictionary.registerFormat()`.

---

## Supported Token Types

| `$type`       | Used for                    | CSS output           |
|---------------|-----------------------------|----------------------|
| `color`       | Colors                      | `#hex` or `rgba()`  |
| `dimension`   | Sizes, spacing, radii       | `rem` (converted)   |
| `fontFamily`  | Font stacks                 | string               |
| `fontWeight`  | Font weights                | number string        |
| `number`      | Unitless (line-height, etc) | number               |
| `shadow`      | Box shadows                 | CSS box-shadow       |
