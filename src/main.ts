import "./assets/style.css"
import "vue-datepicker-next/index.css"
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from "vue"
import DatePicker from "vue-datepicker-next"
import { createPinia } from "pinia"
import VueSweetalert2 from 'vue-sweetalert2';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue"
import router from "./router"

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(DatePicker)
app.use(VueSweetalert2)

app.mount("#app")

// TODO: untuk keycloak
// https://github.com/baloise/vue-keycloak