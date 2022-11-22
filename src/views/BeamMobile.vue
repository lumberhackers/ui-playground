<script setup lang="ts">

import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import { useBeamSession } from "../features/useBeamSession";
import { usePhotoPicker } from "../features/usePhotoPicker";

const route = useRoute();

const { beamPhoto, beaming } = useBeamSession("phone", route.params.id as any);

const filePickerInputEl = ref();
const { contents } = usePhotoPicker(filePickerInputEl);

// Upload photo when we have one
watchEffect(() => {

  if (contents.value === null) {
    return;
  }

  beamPhoto(contents.value)
})

</script>

<template>
  <div class="container">

    <template v-if="!beaming">

      <label for="file-upload" class="custom-file-upload ">
        Take Photo
      </label>

      <input id="file-upload" type="file" accept="image/*" capture="environment" ref="filePickerInputEl" />
    </template>

  </div>
</template>

<style>
body {
  margin: 0;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  font-family: sans-serif;
  border: 2px solid #ccc;
  border-radius: 5px;
  box-shadow: 2px 2px gray;
  display: inline-block;
  cursor: pointer;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 3rem;
}
</style>
