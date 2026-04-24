export async function generatePDF(elementId, filename = "cover-page") {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  // Save current styles
  const saved = {
    transform:       element.style.transform,
    transformOrigin: element.style.transformOrigin,
    position:        element.style.position,
    top:             element.style.top,
    left:            element.style.left,
    zIndex:          element.style.zIndex,
    overflow:        element.style.overflow,
    width:           element.style.width,
    height:          element.style.height,
  };

  // Reset transform so html2canvas captures at true 794×1123
  element.style.transform       = "scale(1)";
  element.style.transformOrigin = "top left";
  element.style.position        = "fixed";
  element.style.top             = "0px";
  element.style.left            = "-9999px";
  element.style.zIndex           = "-1";
  element.style.overflow         = "visible";
  element.style.width            = "794px";
  element.style.height           = "1123px";

  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  let pdf;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width:   794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      windowWidth: 794,
      windowHeight: 1123,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);

    pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

  } finally {
    // Restore all styles
    element.style.transform       = saved.transform;
    element.style.transformOrigin = saved.transformOrigin;
    element.style.position        = saved.position;
    element.style.top             = saved.top;
    element.style.left            = saved.left;
    element.style.zIndex           = saved.zIndex;
    element.style.overflow         = saved.overflow;
    element.style.width            = saved.width;
    element.style.height           = saved.height;
  }

  pdf.save(`${filename}.pdf`);
}