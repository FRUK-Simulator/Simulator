import svgr from "vite-plugin-svgr";

/** @type {import('vite').UserConfig} */
export default {
  base: './',
  plugins: [svgr()],
};
