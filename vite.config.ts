import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), react()],
    server: {
        proxy: {
            '/api/v1/auth': {
                target: 'http://localhost:3100',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api\/v1\/auth/, '')
            },
												'/api/v1/content': { target: 'http://localhost:3000',
																changeOrigin: true,
																secure: false,
																rewrite: (path) => path.replace(/^\/api\/v1\/content/, '')
												}
        }
    }
})
