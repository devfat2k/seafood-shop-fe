import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  // Files to exclude from Knip analysis
  ignore: [
    'checkly.config.ts',
    'src/libs/I18n.ts',
    'src/types/I18n.ts',
    // Shadcn UI primitives — exports are consumed via composition, not always direct import
    'src/components/ui/*.tsx',
    // Public API contract & queries — intentionally exported for storefront & admin
    'src/types/**/*.ts',
    'src/validations/**/*.ts',
    'src/libs/api/**/*.ts',
    'src/libs/queries/**/*.ts',
    'src/libs/Logger.ts',
  ],
  // Dependencies to ignore during analysis
  ignoreDependencies: [
    '@swc/helpers',
    'shadcn',
    '@logtape/logtape',
    'lefthook',
    '@faker-js/faker',
    'axios',
  ],
  // Include custom Playwright test file suffixes
  playwright: {
    entry: ['tests/**/*.@(integ|e2e).ts'],
  },
  vitest: {
    entry: ['tests/**/*.integ.tsx'],
  },
  // Binaries to ignore during analysis
  ignoreBinaries: ['dotenv', 'production'],
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join('\n'),
  },
  ignoreExportsUsedInFile: true,
  treatConfigHintsAsErrors: false,
};

export default config;
