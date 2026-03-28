import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import proxyOptions from './proxyOptions';

export default defineConfig({
	define: {
		'process.env': {}
	},
	plugins: [vue()],

	server: {
		port: 8080,
		host: '0.0.0.0',
		proxy: proxyOptions
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			vue: 'vue/dist/vue.esm-bundler.js'
		}
	},

	optimizeDeps: {
		include: [
			'frappe-js-sdk',
			'axios'
		]
	},

	build: {
		outDir: '../frappe_emenu/public/emenu',
		emptyOutDir: true,
		target: 'esnext',
		sourcemap: true,
		commonjsOptions: {
			include: [/node_modules/],
			transformMixedEsModules: true,  // This is the key fix
		}
	}
});