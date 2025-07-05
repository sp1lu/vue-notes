/** Libraries */
import { createApp } from 'vue'
import App from './App.vue'

/** Styles */
import './style.css'

/** Router */
import router from './router'

/** mount app */
createApp(App)
    .use(router)
    .mount('#app')