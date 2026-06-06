import pdfkit from "pdfkit";
import type { z } from "zod";
import type { portfolioDetailsSchema } from "../schemas";
import type { PdfTemplateType } from "../types";

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
  const margin = 50;
  const pageWidth = doc.page.width - margin * 2;
  const pageHeight = doc.page.height - margin * 2;
  let currentY = margin;

  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > pageHeight) {
      doc.addPage();
      currentY = margin;
    }
  };

  const addSectionHeader = (title: string) => {
    checkPageBreak(40);
    currentY += 15;
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.bold)
      .fontSize(12)
      .text(title.toUpperCase(), margin, currentY, { width: pageWidth });
    currentY = doc.y + 5;
    doc
      .moveTo(margin, currentY)
      .lineTo(margin + pageWidth, currentY)
      .strokeColor("#E2E8F0")
      .lineWidth(1)
      .stroke();
    currentY += 10;
  };

  // --- Header ---
  checkPageBreak(60);
  doc
    .fillColor(PRIMARY_COLOR)
    .font(font.bold)
    .fontSize(24)
    .text(inputData.personalInfo.name, margin, currentY, {
      align: "center",
      width: pageWidth,
    });
  currentY = doc.y + 5;

  // --- Contact Details ---
  doc.fillColor(PRIMARY_COLOR).font(font.normal).fontSize(10);
  const contactLine = `${inputData.personalInfo.email}  |  ${inputData.personalInfo.phone}  |  ${inputData.personalInfo.location}`;
  doc.text(contactLine, margin, currentY, {
    align: "center",
    width: pageWidth,
  });
  currentY = doc.y + 5;

  // --- Links ---
  const links = [
    { label: "Website", url: inputData.personalInfo.website },
    { label: "GitHub", url: inputData.personalInfo.github },
    { label: "LinkedIn", url: inputData.personalInfo.linkedin },
  ].filter((link) => link.url);

  if (links.length > 0) {
    const linkText = links
      .map((link) => `${link.label}: ${link.url}`)
      .join("  |  ");
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.bold)
      .fontSize(8)
      .text(linkText, margin, currentY, {
        align: "center",
        width: pageWidth,
        underline: false,
        link: linkText,
      });
    currentY = doc.y + 15;
  } else {
    currentY += 10;
  }

  // --- Professional Summary ---
  addSectionHeader("Professional Summary");
  doc
    .fillColor(TEXT_COLOR)
    .font(font.normal)
    .fontSize(10)
    .text(inputData.professionalSummary, margin, currentY, {
      align: "justify",
      width: pageWidth,
      lineGap: 4,
    });
  currentY = doc.y + 10;

  // --- Technical Skills ---
  addSectionHeader("Skills");
  doc
    .fillColor(TEXT_COLOR)
    .font(font.bold)
    .fontSize(10)
    .text("Technical Skills: ", margin, currentY, { continued: true });
  doc
    .font(font.normal)
    .text(inputData.skills.technical.join(", "), { lineGap: 5 });
  currentY = doc.y + 10;

  // --- Experience ---
  addSectionHeader("Professional Experience");
  inputData.experience.forEach((exp: any) => {
    const expStartY = currentY;
    const roleText = `${exp.role}  |  ${exp.startDate} – ${exp.endDate}`;
    const roleHeight = 20;

    checkPageBreak(roleHeight + 30 + exp.bulletPoints.length * 18);

    // Role & Dates
    doc
      .fillColor(TEXT_COLOR)
      .font(font.bold)
      .fontSize(12)
      .text(roleText, margin, currentY, { width: pageWidth });
    currentY = doc.y + 5;

    // Company & Location
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.italic)
      .fontSize(10)
      .text(`${exp.company}, ${exp.location}`, margin, currentY, {
        width: pageWidth,
      });
    currentY = doc.y + 8;

    // Bullet Points
    doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(10);
    exp.bulletPoints.forEach((bullet: string) => {
      checkPageBreak(18);
      doc.text(`• ${bullet}`, margin + 8, currentY, {
        width: pageWidth - 8,
        lineGap: 4,
        align: "justify",
      });
      currentY = doc.y + 4;
    });
    currentY += 10;
  });

  // --- Education ---
  addSectionHeader("Education");
  inputData.education.forEach(
    (edu: z.infer<typeof portfolioDetailsSchema>["education"][number]) => {
      checkPageBreak(40);
      const eduText = `${edu.degree} in ${edu.fieldOfStudy} — ${edu.graduationYear}`;
      doc
        .fillColor(TEXT_COLOR)
        .font(font.bold)
        .fontSize(10)
        .text(eduText, margin, currentY, { width: pageWidth });
      currentY = doc.y + 3;

      doc
        .fillColor(TEXT_COLOR)
        .font(font.normal)
        .fontSize(10)
        .text(edu.institution, margin, currentY, { width: pageWidth });
      currentY = doc.y + 12;
    },
  );

  doc.end();
}

function twoColumnPdfTemplate(
  doc: PDFKit.PDFDocument,
  inputData: z.infer<typeof portfolioDetailsSchema>,
) {
  const margin = 50;
  const pageWidth = doc.page.width - margin * 2;
  const pageHeight = doc.page.height - margin * 2;
  const leftColWidth = pageWidth * 0.32;
  const rightColWidth = pageWidth * 0.68;
  const colGap = 20;
  const leftColX = margin;
  const rightColX = margin + leftColWidth + colGap;
  let currentY = margin;

  const checkPageBreak = (neededSpace: number) => {
    if (currentY + neededSpace > pageHeight) {
      doc.addPage();
      currentY = margin;
    }
  };

  const addSectionHeader = (title: string, x: number, width: number) => {
    checkPageBreak(40);
    currentY += 12;
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.bold)
      .fontSize(10)
      .text(title.toUpperCase(), x, currentY, { width });
    currentY = doc.y + 3;
    doc
      .moveTo(x, currentY)
      .lineTo(x + width, currentY)
      .strokeColor("#E2E8F0")
      .lineWidth(1)
      .stroke();
    currentY += 8;
  };

  // --- Left Column Background ---
  const leftColBgEnd = pageHeight + margin;
  doc
    .fillColor("#F7FAFC")
    .rect(margin, margin, leftColWidth, leftColBgEnd - margin)
    .fill();

  // ========================
  // RIGHT COLUMN (render first to ensure it stays on page 1)
  // ========================
  currentY = margin + 15;

  // --- Professional Summary ---
  addSectionHeader("Professional Summary", rightColX, rightColWidth);
  doc
    .fillColor(TEXT_COLOR)
    .font(font.normal)
    .fontSize(9)
    .text(inputData.professionalSummary, rightColX, currentY, {
      align: "justify",
      width: rightColWidth,
      lineGap: 4,
    });
  currentY = doc.y + 10;

  // --- Professional Experience ---
  addSectionHeader("Professional Experience", rightColX, rightColWidth);
  inputData.experience.forEach((exp: any) => {
    const roleHeight = 20;
    const estimatedBulletSpace = exp.bulletPoints.length * 16;

    checkPageBreak(roleHeight + 30 + estimatedBulletSpace);

    // Role & Dates
    doc
      .fillColor(TEXT_COLOR)
      .font(font.bold)
      .fontSize(10)
      .text(exp.role, rightColX, currentY, { width: rightColWidth });
    currentY = doc.y + 2;

    // Company & Location
    doc
      .fillColor(PRIMARY_COLOR)
      .font(font.italic)
      .fontSize(8)
      .text(`${exp.company}, ${exp.location}`, rightColX, currentY, {
        width: rightColWidth,
      });
    currentY = doc.y + 1;

    // Dates
    doc
      .fillColor(LIGHT_TEXT)
      .font(font.normal)
      .fontSize(7)
      .text(
        `${exp.startDate} – ${exp.endDate || "Present"}`,
        rightColX,
        currentY,
        {
          width: rightColWidth,
        },
      );
    currentY = doc.y + 6;

    // Bullet Points
    doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(8);
    exp.bulletPoints.forEach((bullet: string) => {
      checkPageBreak(14);
      doc.text(`• ${bullet}`, rightColX + 6, currentY, {
        width: rightColWidth - 6,
        lineGap: 3,
        align: "justify",
      });
      currentY = doc.y + 3;
    });
    currentY += 8;
  });

  // ========================
  // LEFT COLUMN (render after right column)
  // ========================
  currentY = margin + 15;

  // --- Name ---
  doc
    .fillColor(PRIMARY_COLOR)
    .font(font.bold)
    .fontSize(16)
    .text(inputData.personalInfo.name, leftColX, currentY, {
      width: leftColWidth,
      align: "left",
    });
  currentY = doc.y + 8;

  // --- Contact Details ---
  addSectionHeader("Contact", leftColX, leftColWidth);
  doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(8);

  const contactItems = [
    { label: "Email", value: inputData.personalInfo.email },
    { label: "Phone", value: inputData.personalInfo.phone },
    { label: "Location", value: inputData.personalInfo.location },
  ];

  contactItems.forEach((item) => {
    if (!item.value) return;
    checkPageBreak(20);
    doc
      .fillColor(LIGHT_TEXT)
      .font(font.bold)
      .fontSize(7)
      .text(item.label.toUpperCase(), leftColX, currentY, {
        width: leftColWidth,
      });
    currentY = doc.y + 1;
    doc
      .fillColor(TEXT_COLOR)
      .font(font.normal)
      .fontSize(8)
      .text(item.value, leftColX, currentY, { width: leftColWidth });
    currentY = doc.y + 6;
  });

  // --- Links ---
  const links = [
    { label: "Website", url: inputData.personalInfo.website },
    { label: "GitHub", url: inputData.personalInfo.github },
    { label: "LinkedIn", url: inputData.personalInfo.linkedin },
  ].filter((link) => link.url);

  if (links.length > 0) {
    links.forEach((link) => {
      checkPageBreak(20);
      doc
        .fillColor(LIGHT_TEXT)
        .font(font.bold)
        .fontSize(7)
        .text(link.label.toUpperCase(), leftColX, currentY, {
          width: leftColWidth,
        });
      currentY = doc.y + 1;
      doc
        .fillColor(PRIMARY_COLOR)
        .font(font.normal)
        .fontSize(7)
        .text(link.url!, leftColX, currentY, {
          width: leftColWidth,
          link: link.url,
          underline: false,
        });
      currentY = doc.y + 6;
    });
  }

  // --- Technical Skills ---
  addSectionHeader("Skills", leftColX, leftColWidth);
  doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(8);

  inputData.skills.technical.forEach((skill) => {
    checkPageBreak(14);
    doc.text(`• ${skill}`, leftColX + 4, currentY, {
      width: leftColWidth - 4,
      lineGap: 3,
    });
    currentY = doc.y + 2;
  });

  // --- Soft Skills ---
  if (inputData.skills.soft.length > 0) {
    currentY += 4;
    doc
      .fillColor(LIGHT_TEXT)
      .font(font.bold)
      .fontSize(7)
      .text("SOFT SKILLS", leftColX, currentY, { width: leftColWidth });
    currentY = doc.y + 3;
    doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(8);
    inputData.skills.soft.forEach((skill) => {
      checkPageBreak(14);
      doc.text(`• ${skill}`, leftColX + 4, currentY, {
        width: leftColWidth - 4,
        lineGap: 3,
      });
      currentY = doc.y + 2;
    });
  }

  // --- In-Progress Skills ---
  if (inputData.skills.inProgress.length > 0) {
    currentY += 4;
    doc
      .fillColor(LIGHT_TEXT)
      .font(font.bold)
      .fontSize(7)
      .text("IN PROGRESS", leftColX, currentY, { width: leftColWidth });
    currentY = doc.y + 3;
    doc.fillColor(TEXT_COLOR).font(font.normal).fontSize(8);
    inputData.skills.inProgress.forEach((skill) => {
      checkPageBreak(14);
      doc.text(`• ${skill}`, leftColX + 4, currentY, {
        width: leftColWidth - 4,
        lineGap: 3,
      });
      currentY = doc.y + 2;
    });
  }

  // --- Education ---
  currentY += 4;
  addSectionHeader("Education", leftColX, leftColWidth);
  inputData.education.forEach((edu) => {
    checkPageBreak(30);
    doc
      .fillColor(TEXT_COLOR)
      .font(font.bold)
      .fontSize(8)
      .text(edu.degree, leftColX, currentY, { width: leftColWidth });
    currentY = doc.y + 2;
    doc
      .fillColor(TEXT_COLOR)
      .font(font.normal)
      .fontSize(7)
      .text(edu.institution, leftColX, currentY, { width: leftColWidth });
    currentY = doc.y + 1;
    doc
      .fillColor(LIGHT_TEXT)
      .font(font.italic)
      .fontSize(7)
      .text(
        `${edu.fieldOfStudy}${edu.graduationYear ? ` • ${edu.graduationYear}` : ""}`,
        leftColX,
        currentY,
        { width: leftColWidth },
      );
    currentY = doc.y + 8;
  });

  doc.end();
}
