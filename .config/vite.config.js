import {defineConfig} from 'vite'

export default defineConfig({
  root:"public",
  base:"./",
  publicDir:"../assets",
  build:{
    outDir:"../dist"
  }
})