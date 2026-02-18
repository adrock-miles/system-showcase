/**
 * Token Showcase Components
 * All token display components for the Docusaurus docs site.
 * Data is imported directly from the token JSON source files.
 */

import React from 'react';

// ─── Raw token data (imported at build time via webpack) ───────────────────

import colorData from '../../pipeline/tokens/primitives/color.json';
import typographyData from '../../pipeline/tokens/primitives/typography.json';
import spacingData from '../../pipeline/tokens/primitives/spacing.json';
import borderRadiusData from '../../pipeline/tokens/primitives/border-radius.json';
import shadowData from '../../pipeline/tokens/primitives/shadow.json';
import opacityData from '../../pipeline/tokens/primitives/opacity.json';
import semanticColorData from '../../pipeline/tokens/semantic/color.json';

// ─── Types ─────────────────────────────────────────────────────────────────

type ColorEntry = { $value: string; $type: string; $description?: string };
type DimensionEntry = { $value: string; $type: string; $description?: string };
type FontWeightEntry = { $value: string; $type: string; $description?: string };
type NumberEntry = { $value: string | number; $type: string; $description?: string };
type ShadowValue = {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
  inset?: boolean;
};
type ShadowEntry = { $value: ShadowValue; $type: string; $description?: string };

// ─── Helpers ───────────────────────────────────────────────────────────────

function shadowToCss(s: ShadowValue): string {
  const inset = s.inset ? 'inset ' : '';
  return `${inset}${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${s.color}`;
}

function needsDarkText(hex: string): boolean {
  // Simple luminance check for swatch labels
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

// ─── ColorPalette ──────────────────────────────────────────────────────────

const COLOR_HUES = ['blue', 'gray', 'green', 'red', 'yellow', 'purple'] as const;
const SHADE_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

export function ColorPalette() {
  const colors = (colorData as any).color;

  return (
    <div>
      {COLOR_HUES.map((hue) => {
        const hueData = colors[hue];
        if (!hueData) return null;
        return (
          <div key={hue} style={{ marginBottom: 24 }}>
            <h4 style={{ textTransform: 'capitalize', marginBottom: 8 }}>{hue}</h4>
            <div className="token-grid">
              {SHADE_STEPS.map((step) => {
                const token: ColorEntry = hueData[step];
                if (!token) return null;
                const value = token.$value;
                const dark = needsDarkText(value);
                return (
                  <div key={step} className="token-swatch">
                    <div
                      className="token-swatch__color"
                      style={{ background: value }}
                    />
                    <div className="token-swatch__label">
                      <span className="token-swatch__name">{step}</span>
                      <span className="token-swatch__value">{value}</span>
                      {token.$description && (
                        <span
                          className="token-swatch__value"
                          style={{ fontSize: 10, marginTop: 2, display: 'block' }}
                        >
                          {token.$description}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── TypeScale ─────────────────────────────────────────────────────────────

const FONT_SIZES = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'] as const;

export function TypeScale() {
  const sizes = (typographyData as any).font.size;

  return (
    <div>
      {FONT_SIZES.map((key) => {
        const token: DimensionEntry = sizes[key];
        if (!token) return null;
        return (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              marginBottom: 12,
              borderBottom: '1px solid var(--ifm-color-emphasis-200)',
              paddingBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ifm-font-family-monospace)',
                fontSize: 12,
                width: 120,
                flexShrink: 0,
                color: 'var(--ifm-color-emphasis-600)',
              }}
            >
              font.size.{key}
              <br />
              <strong>{token.$value}</strong>
            </span>
            <span
              style={{
                fontSize: token.$value,
                lineHeight: 1.3,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: 'calc(100% - 140px)',
              }}
            >
              The quick brown fox
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── FontWeights ────────────────────────────────────────────────────────────

const FONT_WEIGHTS = ['thin', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const;

export function FontWeights() {
  const weights = (typographyData as any).font.weight;

  return (
    <div>
      {FONT_WEIGHTS.map((key) => {
        const token: FontWeightEntry = weights[key];
        if (!token) return null;
        return (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--ifm-font-family-monospace)',
                fontSize: 12,
                width: 140,
                flexShrink: 0,
                color: 'var(--ifm-color-emphasis-600)',
              }}
            >
              {key} ({token.$value})
            </span>
            <span style={{ fontWeight: token.$value as any, fontSize: 18 }}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── SpacingScale ───────────────────────────────────────────────────────────

export function SpacingScale() {
  const spacing = (spacingData as any).spacing;
  const entries = Object.entries(spacing) as [string, DimensionEntry][];

  return (
    <div>
      {entries.map(([key, token]) => {
        const px = parseInt(token.$value, 10);
        // Cap visual bar at 300px for readability
        const barWidth = Math.min(px, 300);
        return (
          <div key={key} className="spacing-row">
            <span className="spacing-label">
              <code>spacing.{key}</code> — {token.$value}
              {token.$description ? ` (${token.$description})` : ''}
            </span>
            <div className="spacing-bar" style={{ width: barWidth }} />
          </div>
        );
      })}
    </div>
  );
}

// ─── RadiusScale ────────────────────────────────────────────────────────────

const RADIUS_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'] as const;

export function RadiusScale() {
  const radii = (borderRadiusData as any).borderRadius;

  return (
    <div className="radius-grid">
      {RADIUS_KEYS.map((key) => {
        const token: DimensionEntry = radii[key];
        if (!token) return null;
        return (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              className="radius-box"
              style={{ borderRadius: token.$value }}
            >
              {key}
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: 'var(--ifm-font-family-monospace)',
                marginTop: 6,
                color: 'var(--ifm-color-emphasis-600)',
              }}
            >
              {token.$value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ShadowScale ────────────────────────────────────────────────────────────

const SHADOW_KEYS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'] as const;

export function ShadowScale() {
  const shadows = (shadowData as any).shadow;

  return (
    <div className="shadow-grid">
      {SHADOW_KEYS.map((key) => {
        const token: ShadowEntry = shadows[key];
        if (!token) return null;
        const css = shadowToCss(token.$value);
        return (
          <div key={key} style={{ textAlign: 'center' }}>
            <div className="shadow-box" style={{ boxShadow: css }}>
              {key}
            </div>
            <div
              style={{
                fontSize: 10,
                fontFamily: 'var(--ifm-font-family-monospace)',
                marginTop: 8,
                color: 'var(--ifm-color-emphasis-600)',
                maxWidth: 100,
              }}
            >
              {token.$description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── OpacityScale ───────────────────────────────────────────────────────────

export function OpacityScale() {
  const opacity = (opacityData as any).opacity;
  const entries = Object.entries(opacity) as [string, NumberEntry][];

  return (
    <div className="opacity-grid">
      {entries.map(([key, token]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            className="opacity-box"
            style={{ opacity: Number(token.$value) }}
          >
            {key}%
          </div>
          <div
            style={{
              fontSize: 10,
              fontFamily: 'var(--ifm-font-family-monospace)',
              marginTop: 4,
              color: 'var(--ifm-color-emphasis-600)',
            }}
          >
            {token.$value}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── SemanticColorTable ─────────────────────────────────────────────────────

type SemanticEntry = { $value: string; $type: string; $description?: string };

function resolveRef(ref: string, colors: any): string {
  // Resolve {color.blue.600} → #2563eb
  const match = ref.match(/^\{(.+)\}$/);
  if (!match) return ref;
  const parts = match[1].split('.');
  let cur = colors;
  for (const p of parts) {
    cur = cur?.[p];
  }
  return (cur as any)?.$value ?? ref;
}

function flattenSemantic(
  obj: any,
  prefix: string[],
  primitives: any
): { path: string; ref: string; value: string; description: string }[] {
  const results: { path: string; ref: string; value: string; description: string }[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const entry = val as any;
    if (entry.$value !== undefined) {
      const ref = entry.$value as string;
      const value = resolveRef(ref, primitives);
      results.push({
        path: [...prefix, key].join('.'),
        ref,
        value,
        description: entry.$description ?? '',
      });
    } else {
      results.push(...flattenSemantic(entry, [...prefix, key], primitives));
    }
  }
  return results;
}

export function SemanticColorTable() {
  const primitives = colorData;
  const semantic = (semanticColorData as any).semantic;
  const rows = flattenSemantic(semantic, ['semantic'], primitives);

  return (
    <table style={{ width: '100%', fontSize: 13 }}>
      <thead>
        <tr>
          <th>Swatch</th>
          <th>Token</th>
          <th>References</th>
          <th>Resolved</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.path}>
            <td>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: row.value,
                  border: '1px solid var(--ifm-color-emphasis-200)',
                }}
              />
            </td>
            <td>
              <code style={{ fontSize: 11 }}>{row.path}</code>
            </td>
            <td>
              <code style={{ fontSize: 11 }}>{row.ref}</code>
            </td>
            <td>
              <code style={{ fontSize: 11 }}>{row.value}</code>
            </td>
            <td style={{ color: 'var(--ifm-color-emphasis-700)' }}>
              {row.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
