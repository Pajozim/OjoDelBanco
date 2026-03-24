declare module 'vite-plugin-flow' {
  import { Plugin } from 'vite';
  
  export function vitePluginFlow(): Plugin;
  export function esbuildPluginFlow(): any; // If you need esbuild version
  
  export default vitePluginFlow;
}