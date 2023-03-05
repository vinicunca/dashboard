import {
  defineConfig,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: [
          {
            name: 'Montserrat',
            weights: ['100..900'],
          },
        ],
      },
    }),
  ],

  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
      },
      maxWidth: {
        sm: '600px',
        md: '720px',
        lg: '960px',
        xl: '1208px',
        xxl: '1320px',
      },
    },

  },

  shortcuts: [
    {
      'h-grid': `
        grid
        grid-rows-[repeat(var(--grid-rows,1),1fr)]
        grid-cols-[repeat(var(--grid-cols,12),1fr)]
        gap-[var(--grid-gap,0.5rem)]
        md:gap-[var(--grid-gap,1rem)]
      `,
    },
    [
      /^h-grid-col-(.*)$/,
      ([, c]) => `col-start-auto col-end-[span_${c}]`,
    ],
    [
      /^h-grid-start-(.*)$/,
      ([, c]) => `col-start-${c}`,
    ],
  ],
});
