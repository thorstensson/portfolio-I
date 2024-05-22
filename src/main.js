import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSimpleMarkdown from "vue-simple-markdown";
import "vue-simple-markdown/dist/vue-simple-markdown.css";
import "animate.css";
import "./main.scss";
import AOS from "aos";
import "aos/dist/aos.css";

Vue.use(VueSimpleMarkdown);

new Vue({
  created() {
    AOS.init();
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
