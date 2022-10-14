import HomeVue from "./views/Home.vue";
import BeamWidgetVue from "./views/BeamWidget.vue";
import BeamMobileVue from "./views/BeamMobile.vue";

export const routes = [
  {
    path: "/",
    component: HomeVue,
  },
  {
    path: "/beam-widget",
    component: BeamWidgetVue,
  },
  {
    path: "/beam-mobile",
    component: BeamMobileVue,
  },
];
