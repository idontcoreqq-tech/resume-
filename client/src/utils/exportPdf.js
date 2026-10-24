import html2pdf from "html2pdf.js";
import { sanitizeFileName } from "./profileHelpers.js";

export async function exportResumePdf(element, fullName, templateId) {
  if (!element) return;

  const isPortfolio = templateId === "portfolio";
  const opt = {
    margin: isPortfolio ? [8, 8, 8, 8] : [10, 10, 10, 10],
    filename: `${sanitizeFileName(fullName)}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: { mode: isPortfolio ? ["css", "legacy"] : ["avoid-all", "css", "legacy"] },
  };

  await html2pdf().set(opt).from(element).save();
}
