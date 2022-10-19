<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import Webcam from "webcam-easy";
import { useBeamSession } from "../features/useBeamSession";

let webcam: any;
const photo = ref("");
const hideVideo = computed(() => photo.value !== "");
const readyForSend = computed(() => photo.value !== "" && !sending.value);

const sending = ref(false);
const route = useRoute();

const { beamPhoto } = useBeamSession("phone", route.params.id as any);

onMounted(() => {
  const webcamElement = document.getElementById("webcam");
  const canvasElement = document.getElementById("canvas");
  webcam = new Webcam(webcamElement, "user", canvasElement);
  webcam.start();
});

const handleSnap = () => {
  const result = webcam.snap();
  photo.value = result;
};

const retake = () => {
  photo.value = "";
};

const wait = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 300);
  });
const send = async () => {
  sending.value = true;
  try {
    await beamPhoto(photo.value);
  } finally {
    await wait();

    alert("something went wrong.. try again");
    sending.value = false;
  }

  retake();
};

const canvasClass = computed(() => (sending.value ? "opacity-half" : ""));
</script>

<template>
  <div class="container">
    <div class="main">
      <video
        v-show="!hideVideo"
        id="webcam"
        autoplay
        playsinline
        width="640"
        height="480"
      ></video>
      <canvas
        v-show="hideVideo"
        :class="canvasClass"
        id="canvas"
        class="d-none"
      ></canvas>
    </div>
    <div class="footer">
      <button v-if="!hideVideo" @click="handleSnap">Take Photo!</button>
      <button v-if="hideVideo" :disabled="sending" @click="retake">
        Retake!
      </button>
      <button v-if="readyForSend" @click="send">Send</button>
    </div>
  </div>
</template>

<style>
video {
  width: 100%;
  height: 100%;
}

.opacity-half {
  opacity: 0.5;
}

.footer {
  display: flex;
  height: 5em;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  background: #333;
  flex: 1;
}

button {
  min-width: 3rem;
  height: 100%;
  flex-grow: 1;
}
</style>
