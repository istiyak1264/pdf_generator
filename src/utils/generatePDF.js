import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(elementId, filename = "cover-page") {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  const pdfWidth = 210;
  const pdfHeight = 297;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${filename}.pdf`);
}