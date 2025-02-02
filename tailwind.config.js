import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export const theme = {
  extend: {
    colors: {
      "base-green": "#004643",
    },
  },
};
export const content = [
  "./src/**/*.{html,js,jsx,ts,tsx}", // Add the paths to your templates/files
];
