import type { NextConfig } from "next";
// import path from "path";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


const nextConfig: NextConfig = {
  /* config options here */
  // Override the default webpack configuration

  // (Optional) Export as a standalone site
  // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  output: 'standalone', // Feel free to modify/remove this option

  // Indicate that these packages should not be bundled by webpack
  experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  },

  // webpack: (config) => {
  //   config.resolve.alias['@huggingface/transformers'] = path.resolve(__dirname, 'node_modules/@huggingface/transformers');
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "sharp$": false,
  //     "onnxruntime-node$": false,
  //   }
  //   return config;
  // },
};

export default nextConfig;
