import QRCode from 'qrcode';

export const createQRCode = ( sessionId: string ) => { 
  var canvas = document.getElementById('canvas')
  var url = "https://httpbin.org/get?" + sessionId

  QRCode.toCanvas(canvas, url, function (error: any) {
    // if (error) console.error(error)
    // console.log('success!');
  })
}
  
