import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './app/*.{ts,tsx}'],

    theme: {
        extend: {},
    },

    plugins: [
        plugin(function ({ addUtilities }) {
            const glowUtilities = {
                '.text-glow-cyan': {
                    textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 12px rgba(0, 255, 255, 0.4)',
                },
                '.text-glow-pink': {
                    textShadow: '0 0 8px rgba(236, 72, 153, 0.7), 0 0 12px rgba(236, 72, 153, 0.5)',
                },
                '.text-glow-purple': {
                    textShadow: '0 0 8px rgba(168, 85, 247, 0.6), 0 0 12px rgba(168, 85, 247, 0.4)',
                },
                '.text-glow-red': {
                    textShadow: '0 0 8px rgba(239, 68, 68, 0.6), 0 0 12px rgba(239, 68, 68, 0.4)',
                },
                '.text-glow-blue': {
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.6), 0 0 12px rgba(59, 130, 246, 0.4)',
                },
            };

            addUtilities(glowUtilities);
        }),
    ],
};
export default config;
