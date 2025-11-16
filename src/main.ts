import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import { rotuer } from '@/router'

const app = createApp(App)
app.use(createPinia())
app.use(rotuer)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
      darkModeSelector: '.dark',
    },
  },
})

app.mount('#app')
