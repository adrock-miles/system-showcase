# Design Token System

A design token pipeline that transforms **Figma token exports** (W3C DTCG format) into platform-native code for CSS, SCSS, Android, iOS/Swift, and TypeScript — powered by [Style Dictionary v4](https://styledictionary.com).

## Quick Start

```bash
npm install
npm run build
```

Open `docs/index.html` in a browser to view the documentation website.

---

## Project Structure

```
figma-tokens-system/
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
├── sd.config.js                — Style Dictionary configuration
├── package.json
├── docs/                       — standalone documentation website
│   ├── index.html
│   └── assets/
│       ├── styles.css
│       └── app.js
└── build/                      — generated outputs (git-ignored)
    ├── css/variables.css
    ├── scss/_variables.scss + _map.scss
    ├── android/colors.xml + dimens.xml
    ├── ios/StyleDictionaryColor.swift + StyleDictionarySize.swift
    └── ts/tokens.ts
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

### CSS (`build/css/variables.css`)
```css
:root {
  --color-blue-500: #3b82f6;
  --semantic-color-action-primary: var(--color-blue-600);
}
```
Semantic tokens output as `var()` references (great for runtime theming).

### SCSS (`build/scss/_variables.scss`)
```scss
$color-blue-500: #3b82f6;
$semantic-color-action-primary: $color-blue-600;
```
Also generates `_map.scss` with a nested `$tokens` Sass map.

### Android (`build/android/`)
```xml
<!-- colors.xml -->
<color name="color_blue_500">#ff3b82f6</color>

<!-- dimens.xml -->
<dimen name="spacing_4">16.00dp</dimen>
```

### iOS / Swift (`build/ios/`)
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

### TypeScript (`build/ts/tokens.ts`)
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
4. Run `npm run build`

### Via Figma Variables REST API
```bash
curl -H "X-Figma-Token: YOUR_TOKEN" \
  "https://api.figma.com/v1/files/YOUR_FILE_ID/variables/local"
```
Use a transform script to convert Figma's variable format to W3C DTCG.

### Watching for Changes
```bash
npm run build:watch
```
Automatically rebuilds on any `.json` file change in `tokens/`.

---

## Extending Style Dictionary

### Adding a new platform
Edit `sd.config.js` and add a new entry under `platforms`:

```js
platforms: {
  // ... existing platforms ...
  flutter: {
    transformGroup: 'flutter',  // or custom transforms
    buildPath: 'build/flutter/',
    files: [{ destination: 'tokens.dart', format: 'flutter/class.dart' }],
  },
}
```

### Adding a new token file
Create a new JSON file anywhere in `tokens/` following the W3C format. Style Dictionary will automatically pick it up (glob: `tokens/**/*.json`).

### Custom transforms & formats
Register in `sd.config.js` using `StyleDictionary.registerTransform()` and `StyleDictionary.registerFormat()`.

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
