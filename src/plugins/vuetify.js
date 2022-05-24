// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'

// Vuetify
import { createVuetify} from 'vuetify'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#f5f5f5',
    surface: '#FFFFFF',
    primary: '#d50000',
    'primary-darken-1': '#9b0000',
    'primary-light-1': '#ff5131',
    secondary: '#d32f2f',
    'secondary-darken-1': '#9a0007',
    'secondary-light-1': '#ff6659',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})
