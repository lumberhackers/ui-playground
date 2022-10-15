import * as mod from "../mfe-beam.js";

const { onPdfEmitted } = mod.mount(document.querySelector("#app"));

onPdfEmitted((pdf) => {
  console.log("I am host", pdf);
});
