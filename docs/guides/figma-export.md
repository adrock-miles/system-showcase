---
id: figma-export
title: Figma Export Guide
sidebar_position: 6
---

# Exporting Tokens from Figma

This guide covers how to export design tokens from Figma into the W3C DTCG JSON format used by this system.

## Option A: Tokens Studio for Figma (recommended)

[Tokens Studio](https://tokens.studio) is a Figma plugin that manages design tokens natively.

### Setup

1. Install **Tokens Studio** from the Figma Community
2. In the plugin, click **Settings → Token Format → W3C DTCG**
3. Connect to your GitHub repository (or use Local JSON mode)

### Export steps

1. Open Tokens Studio panel
2. Create token sets matching the structure in `tokens/`:
   - `primitives/color`
   - `primitives/typography`
   - `primitives/spacing`
   - etc.
3. Click **Export → JSON** (or push to GitHub directly)
4. Place the exported files in the `tokens/` directory
5. Run `npm run build:tokens`

### W3C DTCG format

Tokens Studio exports in this format by default when W3C DTCG is selected:

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

This matches the format already in `tokens/primitives/color.json`.

## Option B: Figma Variables (native)

Figma Variables (available in Professional plan and above) can be exported using the [Figma Variables REST API](https://www.figma.com/developers/api#variables).

### Export with the API

```bash
# Replace FILE_KEY and TOKEN with your values
curl -H "X-Figma-Token: YOUR_FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/FILE_KEY/variables/local" \
  > figma-variables.json
```

### Transform to DTCG

Write a small script to convert Figma's Variables API response to W3C DTCG format, then place the output in the `tokens/` directory.

```ts
// Example transform (simplified)
function figmaVarToDtcg(variable: FigmaVariable): DtcgToken {
  return {
    $value: variable.resolvedType === 'COLOR'
      ? rgbToHex(variable.valuesByMode[modeId])
      : variable.valuesByMode[modeId],
    $type: figmaTypeToDtcg(variable.resolvedType),
    $description: variable.description ?? undefined,
  };
}
```

## Option C: Manual JSON

You can also maintain token files manually. Follow the W3C DTCG format:

```json
{
  "category": {
    "name": {
      "$value": "value",
      "$type": "color | dimension | fontWeight | number | shadow | …",
      "$description": "Optional description"
    }
  }
}
```

### Supported `$type` values

| Type | Example value |
|------|--------------|
| `color` | `"#2563eb"` or `"rgba(37, 99, 235, 0.5)"` |
| `dimension` | `"16px"` or `"1rem"` |
| `fontWeight` | `"700"` |
| `fontFamily` | `"Inter, system-ui, sans-serif"` |
| `number` | `1.5` |
| `shadow` | `{ offsetX, offsetY, blur, spread, color }` |

### Alias references

Reference other tokens using `{path.to.token}` syntax:

```json
{
  "semantic": {
    "color": {
      "action": {
        "primary": {
          "$value": "{color.blue.600}",
          "$type": "color"
        }
      }
    }
  }
}
```

## Keeping tokens in sync

### Recommended workflow

1. Designers update tokens in Figma (Tokens Studio or Variables)
2. Tokens are pushed to GitHub via the plugin's sync feature (or manually exported)
3. A PR is opened with updated `tokens/*.json` files
4. CI runs `npm run build:tokens` to verify the build succeeds
5. On merge to `main`, the docs site is rebuilt and deployed automatically

### CI verification step

Add to your GitHub Actions workflow:

```yaml
- name: Verify token build
  run: npm run build:tokens
```

This ensures token JSON files are always valid before merging.
