import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        page1: 'rechercher.html',
        page2: 'contact.html',
        page3: 'profil.html',
        page4: 'login.html'
      }
    }
  }
})
