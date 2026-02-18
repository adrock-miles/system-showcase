import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroBanner() {
  return (
    <div className={styles.heroBanner}>
      <div className="container">
        <h1 className={styles.heroTitle}>Figma Tokens System</h1>
        <p className={styles.heroSubtitle}>
          Design tokens defined once in Figma, transformed for every platform —
          CSS, SCSS, Android, iOS, and TypeScript.
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/tokens/colors"
          >
            Browse Tokens
          </Link>
        </div>
      </div>
    </div>
  );
}

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    icon: '🎨',
    title: 'Figma Source of Truth',
    description:
      'All tokens originate in Figma using the W3C DTCG format. Export once, maintain one source across your entire product.',
  },
  {
    icon: '⚙️',
    title: 'Style Dictionary Transform',
    description:
      'Style Dictionary processes raw JSON tokens and applies platform-specific transforms — rem conversion, color formats, naming conventions.',
  },
  {
    icon: '🚀',
    title: 'Multi-Platform Output',
    description:
      'One build generates CSS custom properties, SCSS variables, Android XML, iOS Swift constants, and a TypeScript module.',
  },
];

function FeatureCard({ title, description, icon }: Feature) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

const techBadges = [
  { label: 'Style Dictionary v4', color: '#2563eb' },
  { label: 'W3C DTCG', color: '#7e22ce' },
  { label: 'CSS Variables', color: '#0f766e' },
  { label: 'SCSS', color: '#be185d' },
  { label: 'Android XML', color: '#15803d' },
  { label: 'iOS Swift', color: '#b45309' },
  { label: 'TypeScript', color: '#1e40af' },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Design token transformation system using Style Dictionary for Figma exports"
    >
      <HeroBanner />
      <main>
        <section className={styles.featuresSection}>
          <div className="container">
            <div className={styles.featuresGrid}>
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.badgesSection}>
          <div className="container">
            <h2 className={styles.badgesTitle}>Built With</h2>
            <div className={styles.badgesGrid}>
              {techBadges.map((b) => (
                <span
                  key={b.label}
                  className={styles.badge}
                  style={{ background: b.color }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
