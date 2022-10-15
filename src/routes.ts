import HomeVue from "./views/Home.vue";
import BeamMobileVue from "./views/BeamMobile.vue";
import ModalVue from "./views/Modal.vue";
export const routes = [
  {
    path: "/",
    component: HomeVue,
  },
  {
    path: "/beam-widget",
    component: ModalVue,
  },
  {
    path: "/beam-mobile",
    component: BeamMobileVue,
  },
];
