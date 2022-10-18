import QRCode from 'qrcode';

export const createQRCode = ( sessionId: string ) => { 
  var canvas = document.getElementById('canvas')
  console.log("Test")
  console.log(JSON.parse(JSON.stringify(canvas)))

  QRCode.toCanvas(canvas, sessionId, function (error: any) {
    if (error) console.error(error)
    console.log('success!');
  })
}
  
