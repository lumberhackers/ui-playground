<script setup lang="ts">
import { useEventBus } from "@vueuse/core";
import { examplePdf } from "../pdf";

const bus = useEventBus("pdf");

setTimeout(() => {
  bus.emit({ data: examplePdf });
}, 1000);
</script>

<template>
  <div>
    The integrating app will use this widget to communicate with the
    microservice.
  </div>
  <img class="qr" src="/qr.svg" alt="Example QR Code" />
</template>

<style scoped>
* {
  color: black;
}
:host {
  all: initial;
  display: block;
}

.qr {
  border: 5px #000 solid;
}
</style>
