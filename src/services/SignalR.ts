import { HubConnectionBuilder } from "@microsoft/signalr";

type ReceivePhotoHook = (photoB64: string) => void;

export const connection = new HubConnectionBuilder()
  // TODO; figure out how to parameterize
  .withUrl("https://localhost:7145/photoHub")
  .build();

/**
 * This is a typed interface to interacting with the SignalR PhotoHub.
 */
export const PhotoHub = {
  disconnect: (sessionId: string) => connection.invoke("Disconnect", sessionId),

  connect: (sessionId: string) => connection.invoke("Connect", sessionId),

  complete: (sessionId: string) => connection.invoke("Complete", sessionId),

  updateSessionStatus: (sessionId: string) =>
    connection.invoke("UpdateSessionStatus", sessionId),

  // Start unimplemented methods

  subscribeToPhotos: (sessionId: string) =>
    connection.invoke("SubscribeToPhotos", sessionId),

  sendPhoto: (sessionId: string, photoB64: string) =>
    connection.invoke("SendPhoto", sessionId, photoB64),

  /**
   * This is the server sending us a photo to do something with.
   */
  onReceivePhoto: (hook: ReceivePhotoHook) => {
    // While this isn't implemented, we can fake it.
    _initFakePhotoEmitter(hook);

    // Here is the real signalR handler.
    connection.on("ReceivePhoto", hook);
  },
};

// fake data
const _initFakePhotoEmitter = (hook: ReceivePhotoHook) => {
  setInterval(
    () =>
      _urlContentToDataUri("/test_cat_money.jpeg").then((data) => hook(data)),
    5000
  );
};

function _urlContentToDataUri(url: string): Promise<string> {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((callback) => {
          let reader = new FileReader();
          reader.onload = function () {
            if (typeof this.result !== "string") {
              throw new Error("Failed to process image");
            }
            callback(this.result);
          };
          reader.readAsDataURL(blob);
        })
    );
}
