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
export const useBeamSession = (existingSessionId?: string) => {
  const sessionId = ref(existingSessionId || uuidv4());

  const photos = ref<PhotoB64[]>([]);

  // Connect if we are not already connected.
  if (SignalR.connection.state === HubConnectionState.Disconnected) {
    SignalR.connection.start().then(() => {
      isConnected.value = true;
    });
  }

  // We need to tell the server to let us know about photos added to a given session.
  // I suspect we need to to this, otherwise the mobile device will also receive the photo it pushed.
  watchEffect(async () => {
    if (isConnected.value === true) {
      PhotoHub.connect(sessionId.value);
    }
  });

  // SignalR Method Handlers
  PhotoHub.onReceivePhoto((photo: PhotoB64) => {
    // Add the photo to our state
    photos.value = [...photos.value, photo];
  });

  // Return the composable interface
  return {
    sessionId,
    isConnected,
    photos,
    beamPhoto: async (photo: PhotoB64): Promise<void> => {
      if (!isConnected.value) {
        throw new Error("not connected!");
      }

      await PhotoHub.sendPhoto(sessionId.value, photo);
    },
  };
};
