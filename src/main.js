import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueApexCharts from "vue3-apexcharts";
import Notifications from '@kyvg/vue3-notification'


loadFonts()

const app = createApp(App)
app
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueApexCharts)
  .use(Notifications)
  .mount('#app')



app.config.globalProperties.$filters = {
    formatedDate(value) {
      
      return new Date(Date.parse(value)).toLocaleDateString()
    }
      
}