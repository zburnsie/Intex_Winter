import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      strict: false,
    },
    headers: {
      'Content-Security-Policy': [
        "default-src 'self';",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://cdn.jsdelivr.net;",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;",
        "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net;",
        "img-src 'self' data: http://localhost:4000 https://localhost:4000 https://cdn.jsdelivr.net https://mlworkspace1318558619.blob.core.windows.net https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net;",
        "connect-src 'self' http://localhost:4000 https://localhost:4000 https://localhost:5000 https://api.yourdomain.com https://oauth2.googleapis.com https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net https://mlworkspace1318558619.blob.core.windows.net;",
        "frame-src 'self' https://accounts.google.com;",
        "object-src 'none';",
        "base-uri 'self';",
        "form-action 'self';",
        "frame-ancestors 'none';",
      ].join(' '),
    },
    
  },

  appType: 'spa',
});
