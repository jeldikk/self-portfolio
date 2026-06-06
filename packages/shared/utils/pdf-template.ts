import pdfkit from "pdfkit";
import type { z } from "zod";
import type { portfolioDetailsSchema } from "../schemas";

export type PdfTemplateType = "single_column" | "two_column";

const PRIMARY_COLOR = "#1A365D";
const TEXT_COLOR = "#2D3748";
const LIGHT_TEXT = "#718096";

const font = {
  normal: "Helvetica",
  italic: "Helvetica-Oblique",
  bold: "Helvetica-Bold",
};

export async function createResumePdf(
  inputData: z.infer<typeof portfolioDetailsSchema>,
  templateType: PdfTemplateType = "single_column",
): Promise<Buffer> {
  const doc = new pdfkit();

  const buffers: Uint8Array<ArrayBufferLike>[] = [];

  doc.on("data", buffers.push.bind(buffers));

  return new Promise((resolve, reject) => {
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      try {
        resolve(pdfBuffer);
      } catch (err) {
        reject(err);
      }
    });

    if (templateType === "single_column") {
      singleColumnPdfTemplate(doc, inputData);
    }

    if (templateType === "two_column") {
      twoColumnPdfTemplate(doc, inputData);
    }
  });
}

function singleColumnPdfTemplate(
  doc: PDFKit.PDFDocument,
  inputData: z.infer<typeof portfolioDetailsSchema>,
) {
  // do all the doc rendering magic here
  // --- Header ---
  doc
    .fillColor(PRIMARY_COLOR)
    .font(font.bold)
    .fontSize(22)
    .text(inputData.personalInfo.name, { align: "center" });
  doc.fillColor(PRIMARY_COLOR).font(font.normal).fontSize(10);

  // --- Contact Details ---
  const contactLine = `${inputData.personalInfo.email}  |  ${inputData.personalInfo.phone}  |  ${inputData.personalInfo.location}`;
  doc.text(contactLine, { align: "center" }).moveDown(0.8);

  // --- link Details ---
  const links = [
    { label: "Website", url: inputData.personalInfo.website },
    { label: "GitHub", url: inputData.personalInfo.github },
    { label: "LinkedIn", url: inputData.personalInfo.linkedin },
  ].filter((link) => link.url);

  const linkText = links
    .map((link) => `${link.label}: ${link.url}`)
    .join("  |  ");
  doc.fillColor(PRIMARY_COLOR).font(font.bold).fontSize(8).text(linkText, {
    align: "center",
    link: links[0]?.url,
    underline: false,
  });
  doc.moveDown(1.5);

  const addSectionHeader = (title: string) => {
    doc.moveDown(1);
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.bold)
      .fontSize(12)
      .text(title.toUpperCase());
    // Draw a thin horizontal separator line
    doc
      .moveTo(40, doc.y)
      .lineTo(555, doc.y)
      .strokeColor("#E2E8F0")
      .lineWidth(1)
      .stroke()
      .moveDown(0.5);
  };

  // --- Professional Summary ---
  addSectionHeader("Professional Summary");
  doc
    .fillColor(TEXT_COLOR)
    .font(font.bold)
    .fontSize(10)
    .text(inputData.professionalSummary, { align: "justify", lineGap: 3 });

  // --- Technical Skills ---
  addSectionHeader("Skills");
  doc
    .fillColor(TEXT_COLOR)
    .font(font.bold)
    .fontSize(10)
    .text("Technical Skills: ", { continued: true });
  doc
    .font(font.normal)
    .text(inputData.skills.technical.join(", "), { lineGap: 5 })
    .moveDown(0.5);

  // --- Experience ---
  addSectionHeader("Professional Experience");
  inputData.experience.forEach((exp: any) => {
    // Role & Dates
    doc
      .fillColor(TEXT_COLOR)
      .font(font.bold)
      .fontSize(12)
      .text(exp.role, { continued: true });
    doc
      .fillColor(LIGHT_TEXT)
      .font(font.normal)
      .fontSize(10)
      .text(`  |  ${exp.startDate} – ${exp.endDate}`, { align: "right" });

    doc.moveDown(0.5);
    // Company & Location
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.italic)
      .fontSize(10)
      .text(`${exp.company}, ${exp.location}`)
      .moveDown(0.8);

    // Bullet Points
    doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(10);
    exp.bulletPoints.forEach((bullet: string) => {
      doc.text(`• ${bullet}`, { indent: 8, lineGap: 3, align: "justify" });
    });
    doc.moveDown(1.5);
  });

  // --- Education ---
  addSectionHeader("Education");
  inputData.education.forEach(
    (edu: z.infer<typeof portfolioDetailsSchema>["education"][number]) => {
      doc
        .fillColor(TEXT_COLOR)
        .font(font.bold)
        .fontSize(10)
        .text(`${edu.degree} in ${edu.fieldOfStudy}`, { continued: true });
      doc
        .fillColor(LIGHT_TEXT)
        .font(font.normal)
        .text(` — ${edu.graduationYear}`, { align: "right" });

      doc
        .moveDown(0.3)
        .fillColor(TEXT_COLOR)
        .font(font.normal)
        .text(edu.institution)
        .moveDown(1);
    },
  );

  doc.end();
}

function twoColumnPdfTemplate(
  doc: PDFKit.PDFDocument,
  inputData: z.infer<typeof portfolioDetailsSchema>,
) {
  // do all the doc rendering magic here

  doc.end();
}
