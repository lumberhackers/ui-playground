import { PDFDocument } from "pdf-lib"
import download from "downloadjs"

export async function embedImages(photos: string[]) {
    const pdfDoc = await PDFDocument.create()

    // console.log("PDF created");
    // console.log(photos.length);

    for (const photo of photos) {
        const pngImageBytes = await fetch(photo).then((res) => res.arrayBuffer())

        // console.log(pngImageBytes);
        
        const pngImage = await pdfDoc.embedPng(pngImageBytes)
        const pngDims = pngImage.scale(0.5)

        const page = pdfDoc.addPage()

        page.drawImage(pngImage, {
            x: page.getWidth() / 2 - pngDims.width / 2,
            y: page.getHeight() / 2 - pngDims.height / 2,
            width: pngDims.width,
            height: pngDims.height,
        })
    }

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "pdf-lib_image_embedding_example.pdf", "application/pdf");
}