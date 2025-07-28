import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // or './router/index.js' depending on your setup

const app = createApp(App)
app.use(router)
app.mount('#app')
