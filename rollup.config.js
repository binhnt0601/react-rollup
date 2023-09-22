import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      preserveModules: true,
      exports: "named",
      banner: '"use client"'
    },
    {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      exports: "named",
      banner: '"use client"'
    },
  ],
  external: ["react-dom", "react", "react/jsx-runtime"],
  plugins: [commonjs(), typescript({ useTsconfigDeclarationDir: true })],
};
