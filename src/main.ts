import { createApp } from "vue";
import "./style.css";
import { setupI18n, setI18nLanguage, loadLocaleMessages } from "./i18n";
import App from "./App.vue";

const i18n = setupI18n();
loadLocaleMessages(i18n, "en").then(() => setI18nLanguage(i18n, "en"));

const app = createApp(App);
app.use(i18n);
app.mount("#app");
