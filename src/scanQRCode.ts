import QRCode from "qrcode";

export const createQRCode = (sessionId: string) => {
  var canvas = document.getElementById("canvas");
  var url =
    "https://beamphoto.pagekite.me/spa/index.html#/beam-mobile/" + sessionId;

  QRCode.toCanvas(canvas, url, function (error: any) {
    // if (error) console.error(error)
    // console.log('success!');
  });

  console.log(url);
};
