import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/system-showcase/',
    component: ComponentCreator('/system-showcase/', 'e1a'),
    exact: true
  },
  {
    path: '/system-showcase/',
    component: ComponentCreator('/system-showcase/', 'c9a'),
    routes: [
      {
        path: '/system-showcase/',
        component: ComponentCreator('/system-showcase/', '468'),
        routes: [
          {
            path: '/system-showcase/',
            component: ComponentCreator('/system-showcase/', '622'),
            routes: [
              {
                path: '/system-showcase/guides/android',
                component: ComponentCreator('/system-showcase/guides/android', 'd55'),
                exact: true,
                sidebar: "guidesSidebar"
              },
              {
                path: '/system-showcase/guides/css',
                component: ComponentCreator('/system-showcase/guides/css', '2c9'),
                exact: true,
                sidebar: "guidesSidebar"
              },
              {
                path: '/system-showcase/guides/figma-export',
                component: ComponentCreator('/system-showcase/guides/figma-export', 'e24'),
                exact: true,
                sidebar: "guidesSidebar"
              },
              {
                path: '/system-showcase/guides/ios',
                component: ComponentCreator('/system-showcase/guides/ios', 'e2f'),
                exact: true,
                sidebar: "guidesSidebar"
              },
              {
                path: '/system-showcase/guides/scss',
                component: ComponentCreator('/system-showcase/guides/scss', '80b'),
                exact: true,
                sidebar: "guidesSidebar"
              },
              {
                path: '/system-showcase/guides/typescript',
                component: ComponentCreator('/system-showcase/guides/typescript', '0ea'),
                exact: true,
                sidebar: "guidesSidebar"
              },
              {
                path: '/system-showcase/intro',
                component: ComponentCreator('/system-showcase/intro', '75c'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/border-radius',
                component: ComponentCreator('/system-showcase/tokens/border-radius', '20b'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/colors',
                component: ComponentCreator('/system-showcase/tokens/colors', '2d6'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/opacity',
                component: ComponentCreator('/system-showcase/tokens/opacity', '697'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/semantic-colors',
                component: ComponentCreator('/system-showcase/tokens/semantic-colors', '595'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/shadows',
                component: ComponentCreator('/system-showcase/tokens/shadows', '440'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/spacing',
                component: ComponentCreator('/system-showcase/tokens/spacing', '787'),
                exact: true,
                sidebar: "tokensSidebar"
              },
              {
                path: '/system-showcase/tokens/typography',
                component: ComponentCreator('/system-showcase/tokens/typography', '65b'),
                exact: true,
                sidebar: "tokensSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
