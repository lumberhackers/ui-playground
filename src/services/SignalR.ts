import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "../config";

type ReceivePhotoHook = (photoB64: string) => void;

export const connection = new HubConnectionBuilder()
  // TODO; figure out how to parameterize
  .withUrl(BASE_URL + "/photos")
  .build();

/**
 * This is a typed interface to interacting with the SignalR PhotoHub.
 */
export const PhotoHub = {
  controlSession: (sessionId: string) =>
    connection.invoke("ControlSession", sessionId),

  openSession: (sessionId: string) =>
    connection.invoke("OpenSession", sessionId),

  sendPhoto: (photoB64: string) => connection.invoke("SendPhoto", photoB64),

  /**
   * This is the server sending us a photo to do something with.
   */
  onReceivePhoto: (hook: ReceivePhotoHook) => {
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
