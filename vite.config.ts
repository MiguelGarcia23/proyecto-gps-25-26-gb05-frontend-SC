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
			'/api/v1/users': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/artists': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/songs': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/albums': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/genres': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/search': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/reviews': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/wishlist': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/api/v1/orders': {
				target: 'http://localhost:3200',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api\/v1/, '')
			},
			'/static/public': {
				target: 'http://localhost:3002',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/static\/public/, '')
			},
        }
    }
})
