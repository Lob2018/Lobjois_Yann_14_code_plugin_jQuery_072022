import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/lib/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
      compact: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    sass({
      output: "./dist/style.css",
      failOnError: true,
      runtime: require("sass"),
    }),
    terser()
  ],
  external: ["react", "react-dom"],
};
