import { createApp } from "vue";
import { createPinia } from "pinia";
import Global from "@/global/views/index.vue";
import "./style/normalize.css";
import "./style/variable.css";
import "./style/customize.scss";

const app = createApp(Global);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);

app.mount("#app");
