import { HubConnectionState } from "@microsoft/signalr";
import { ref, watchEffect } from "vue";
import * as SignalR from "../services/SignalR";
import { v4 as uuidv4 } from "uuid";
const { PhotoHub } = SignalR;

/**
 * It's a string with base64 representation of the photos
 * It might be a DataURL.. oops?
 */
type PhotoB64 = string;

const isConnected = ref(
  SignalR.connection.state === HubConnectionState.Connected
);

/**
 *
 * Allows you to interact with a Beam session, listening for photos, uploading photos.
 *
 * @param existingSessionId OPTIONAL
 */
export const useBeamSession = (
  type: "phone" | "host",
  existingSessionId?: string
) => {
  const sessionId = ref(existingSessionId || uuidv4());

  const photos = ref<PhotoB64[]>([]);

  // Connect if we are not already connected.
  if (SignalR.connection.state === HubConnectionState.Disconnected) {
    SignalR.connection
      .start()
      .then((l) => console.log(SignalR.connection.state))
      .then(() => {
        type === "phone"
          ? PhotoHub.controlSession(sessionId.value)
          : PhotoHub.openSession(sessionId.value);
      })
      .then(() => {
        isConnected.value = true;
      });
  }

  // SignalR Method Handlers
  PhotoHub.onReceivePhoto((photo: PhotoB64) => {
    // Add the photo to our state
    photos.value = [...photos.value, photo];
  });

  const beaming = ref(false);

  // Return the composable interface
  return {
    sessionId,
    isConnected,
    photos,
    controlSession: async () => {
      await PhotoHub.controlSession(sessionId.value);
    },
    openSession: async () => {
      await PhotoHub.openSession(sessionId.value);
    },
    beamPhoto: async (photo: PhotoB64): Promise<void> => {
      if (!isConnected.value) {
        throw new Error("not connected!");
      }
      try {
        beaming.value = true;
        await PhotoHub.sendPhoto(photo);
      } finally {
        beaming.value = false;
      }
    },
    beaming
  };
};
