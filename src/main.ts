import { createApp } from "vue";
import App from "@/global/views/index.vue";
import { createPinia } from "pinia";
import "./mock"; // 请求拦截模拟接口 mockjs
import "~/style"; // 基础样式

const app = createApp(App);

const pinia = createPinia();

app.use(router);

app.use(pinia);
app.use(i18n);
app.mount("#app");
