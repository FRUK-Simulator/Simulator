import svgr from "vite-plugin-svgr";

/** @type {import('vite').UserConfig} */
export default {
  build: {
    outDir: './build'
  },
  plugins: [svgr()],
};
