import './index.css';
import { createApp } from "vue";
import "@/helpers/global-function.js"
import App from "./App.vue";
import { IonicVue } from '@ionic/vue';
import router from '@/router/index.js';

import dayjs from "@/helpers/dayjs.js";

import { createPinia } from 'pinia'




/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';


const pinia = createPinia()






async function initApp() {

	const app = createApp(App);

	app.use(IonicVue);
	app.use(pinia)




	app.config.globalProperties.$dayjs = dayjs;
	
	// await auth.login();

 

	app.use(router);


	 
app.mount('#app');
 
}

initApp();



