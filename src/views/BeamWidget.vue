<script setup lang="ts">
import { useEventBus } from "@vueuse/core";
import { examplePdf } from "../pdf";
import { useBeamSession } from "../features/useBeamSession";
import { createQRCode } from "../scanQRCode";
import { onMounted } from 'vue'
import { reactive } from "vue";
import { embedImages } from "../createPDF";
import { createPDFAcroField } from "pdf-lib";

const { isConnected, photos, sessionId } = useBeamSession();

const bus = useEventBus("pdf");

setTimeout(() => {
  bus.emit({ data: examplePdf });
}, 1000);

onMounted(() => {
  createQRCode(sessionId.value)
  // embedImages(photos.value)
})

const onCreatePdfClick = () => embedImages(photos.value)

const entry = reactive({ photo: "lol Im the photo", title: "" });

</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
  />
  <div class="content">
    <div class="content">
      The integrating app will use this widget to communicate with the
      microservice.
    </div>
    <hr />
    {{ entry.title }}
    <hr />

    <canvas id="canvas"></canvas>
    
    <h2>useBeamSession (debug)</h2>
    <table>
      <tr>
        <th>isConnected</th>
        <td>{{ isConnected }}</td>
      </tr>
      <tr>
        <th>photos</th>
        <td><img class="thumbnail" v-for="photo in photos" :src="photo" /></td>
      </tr>
      <tr>
        <th>sessionId</th>
        <td>{{ sessionId }}</td>
      </tr>
    </table>
    <button @click="onCreatePdfClick">Create PDF</button>
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
  width: 50px;
  height: 50px;
}
</style>
