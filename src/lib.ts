import BeamWidgetVue from "./views/BeamWidget.vue";

import { createApp } from "vue";

import { createEventHook, useEventBus } from "@vueuse/core";
import { CSS_KEY } from "./const";

export const mount = (element: Element) => {
  var app = createApp(BeamWidgetVue);

  if (!element) {
    throw new Error("Could not find node!");
  }

  const shadowRoot = element.attachShadow({ mode: "open" });
  const realMount = document.createElement("div");

  shadowRoot.appendChild(realMount);

  // Pull the (scoped) style from the header
  var yankStyle = document.querySelector(`#${CSS_KEY}`);

  if (yankStyle) {
    shadowRoot.appendChild(yankStyle.cloneNode(true));
  }
  //

  app.mount(realMount);

  // set up event bus to emit a pdf
  const bus = useEventBus("pdf");
  const pdfEmitted = createEventHook();

  const stopPdfEmit = bus.on((data) => {
    pdfEmitted.trigger(data);
  });

  return {
    unmount: () => {
      stopPdfEmit();
      app.unmount();
    },
    onPdfEmitted: pdfEmitted.on,
  };
};
