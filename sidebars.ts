import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tokensSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Token Reference',
      items: [
        'tokens/colors',
        'tokens/typography',
        'tokens/spacing',
        'tokens/border-radius',
        'tokens/shadows',
        'tokens/opacity',
        'tokens/semantic-colors',
      ],
    },
  ],
  guidesSidebar: [
    {
      type: 'category',
      label: 'Platform Guides',
      items: [
        'guides/css',
        'guides/scss',
        'guides/android',
        'guides/ios',
        'guides/typescript',
        'guides/figma-export',
      ],
    },
  ],
};

export default sidebars;
