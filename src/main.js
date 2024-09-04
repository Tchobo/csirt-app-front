import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'vuetify/styles'; // Ensure you have the correct path to the Vuetify CSS
import router from './router/index.js'; // Import your router configuration
import { createVuetify } from 'vuetify'; // Import createVuetify from Vuetify

 import CKEditor from '@ckeditor/ckeditor5-vue';
 import * as components from 'vuetify/components';
 import * as directives from 'vuetify/directives';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
  });



app.use(vuetify);
app.use(router);
app.use( CKEditor )

app.mount('#app')
