import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Files to exclude from Knip analysis
  ignore: [
    'checkly.config.ts',
    'src/libs/I18n.ts',
    'src/types/I18n.ts',
    // Shadcn UI primitives — exports are consumed via composition, not always direct import
    'src/components/ui/*.tsx',
    // providers.tsx is loaded dynamically by Next.js layout
    'src/app/providers.tsx',
    // Re-export bridges (alias shims between src/lib and src/libs)
    'src/libs/ApiClient.ts',
    // Public API contract types — intentionally exported for downstream consumers
    'src/types/api.ts',
  ],
  // Dependencies to ignore during analysis
  ignoreDependencies: [
    '@clerk/shared',
    '@swc/helpers', // Avoid error in CI: "`npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync."
    // shadcn package — imported as CSS (`shadcn/tailwind.css`) via PostCSS, knip can't trace CSS imports
    'shadcn',
    // Peer deps bundled with Shadcn — consumed via CSS/primitives, not direct Node imports
    'next-themes',
    'sonner',
  ],
  // Include custom Playwright test file suffixes
  playwright: {
    entry: ['tests/**/*.@(integ|e2e).ts'],
  },
  vitest: {
    entry: ['tests/**/*.integ.tsx'],
  },
  // Binaries to ignore during analysis
  ignoreBinaries: [
    'production', // False positive raised with dotenv-cli
  ],
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n'),
  },
  ignoreExportsUsedInFile: true,
  treatConfigHintsAsErrors: true,
};

export default config;
