const PDFDocument = require("pdfkit");

exports.buildPDF = (dataCallback, endCallback) => {
    const doc = new PDFDocument()
    doc.on("data", dataCallback)
    doc.end("end", endCallback)
    doc.fontSize(25).text("Hola")
    doc.end()
}

