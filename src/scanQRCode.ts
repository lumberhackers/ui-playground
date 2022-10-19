import QRCode from "qrcode";
import { BASE_URL } from "./config";

export const createQRCode = (el: any, sessionId: string) => {
  var mfeModuleUrl = BASE_URL + "/spa/index.html#/beam-mobile/" + sessionId;

  QRCode.toCanvas(el, mfeModuleUrl, function (error: any) {
    // if (error) console.error(error)
    // console.log('success!');
  });

  console.log(mfeModuleUrl);
};
