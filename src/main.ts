import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueAxios from 'vue-axios';
import BalmUi from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
import axios from 'axios';

axios.defaults.baseURL = 'https://pokeapi.co/api/v2/';

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
// app.use(VueMaterial);
app.use(BalmUi);
app.use(BalmUIPlus);

app.mount('#app');
