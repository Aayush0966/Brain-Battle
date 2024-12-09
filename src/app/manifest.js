export default function manifest() {
    return {
      name: 'Brain Battle',
      short_name: 'BrainBattle',
      description: 'A fun game to test your brain power',
      start_url: '/',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#000000',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icon-512x512.png', 
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
      ],
    }
  }