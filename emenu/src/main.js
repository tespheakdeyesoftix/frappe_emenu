import './index.css';
import { createApp } from "vue";
import "@/helpers/global-function.js"
import App from "./App.vue";
import { IonicVue } from '@ionic/vue';
import router from '@/router/index.js';
import i18n from './i18n'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

async function initApp() {
	const app = createApp(App);
	app.use(IonicVue);

	// await auth.login();

	app.use(router);
app.use(i18n);
app.config.globalProperties.t = i18n.global.t

app.mount('#app');
}
initApp();
