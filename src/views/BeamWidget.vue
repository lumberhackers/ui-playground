<script setup lang="ts">
import { useEventBus } from "@vueuse/core";
import { examplePdf } from "../pdf";
import { useBeamSession } from "../features/useBeamSession";
import { createQRCode } from "../scanQRCode";
import { onMounted, onUpdated, ref } from "vue";
import { reactive } from "vue";

const { isConnected, photos, sessionId, openSession } = useBeamSession("host");

const bus = useEventBus("pdf");

const save = () => {
  bus.emit({ data: examplePdf });
};
const qrCanvas = ref<any>(null); // this aint showing up in huddle

onMounted(() => {
  if (qrCanvas) {
    createQRCode(qrCanvas.value, sessionId.value);
  } else {
    console.error("could not find qr");
  }
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
  />
  <div class="content">
    <div v-if="photos.length === 0">
      Scan this with your mobile device<br />
      <canvas ref="qrCanvas" v-if="photos.length === 0"></canvas>
    </div>
    <div v-else>
      <button @click="save">Save Photo Collection</button>
      <div><img class="thumbnail" v-for="photo in photos" :src="photo" /></div>
    </div>
  </div>
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
.thumbnail {
  padding: 5px;
  width: 100px;
  height: 100px;
}
</style>
