import type { z } from "zod";
import type { portfolioDetailsSchema } from "../schemas";
import type { PdfTemplateType } from "../types";
import pdfMake from "pdfmake";
import path from "node:path";
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";

type PortfolioData = z.infer<typeof portfolioDetailsSchema>;
type ExperienceItem = PortfolioData["experience"][number];
type EducationItem = PortfolioData["education"][number];

// Helper to create a consistent section header with a bottom border
function createSectionHeader(title: string) {
  return [
    {
      text: title.toUpperCase(),
      style: "sectionHeader",
      margin: [0, 12, 0, 4],
    },
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 1,
          lineColor: "#bdc3c7",
        },
      ],
      margin: [0, 0, 0, 8],
    },
  ];
}

export async function createResumePdf(
  inputData: z.infer<typeof portfolioDetailsSchema>,
  templateType: PdfTemplateType = "single_column",
): Promise<Buffer<ArrayBufferLike>> {
  try {
    pdfMake.addFonts({
      Roboto: {
        normal: path.resolve("/opt/Roboto-Regular.ttf"),
        bold: path.resolve("/opt/Roboto-Bold.ttf"),
        italics: path.resolve("/opt/Roboto-Italic.ttf"),
        bolditalics: path.resolve("/opt/Roboto-BoldItalic.ttf"),
      },
    });
    let dataDefinitions: TDocumentDefinitions;
    switch (templateType) {
      case "single_column":
        dataDefinitions = singleColumnPdfTemplate(inputData);
        break;
      case "two_column":
        dataDefinitions = twoColumnPdfTemplate(inputData);
        break;
    }

    const buffer = await pdfMake
      .createPdf(dataDefinitions, {
        bufferPages: true,
      })
      .getBuffer();

    return buffer;
  } catch (err) {
    console.error("error creating pdf", err);
    throw err;
  }
}

function singleColumnPdfTemplate(
  inputData: z.infer<typeof portfolioDetailsSchema>,
): TDocumentDefinitions {
  const { personalInfo, professionalSummary, skills, experience, education } =
    inputData;

  return {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 40], // Provides a balanced, clean white-space border

    watermark: {
      text: "Portfolio Document",
      color: "blue",
      opacity: 0.3,
      bold: true,
      italics: false,
    },

    content: [
      // ==========================================
      // HEADER SECTION (Name & Contact Info)
      // ==========================================
      { text: personalInfo.name, style: "headerName" },
      {
        text: [
          personalInfo.email,
          personalInfo.phone ? ` • ${personalInfo.phone}` : "",
          personalInfo.location ? ` • ${personalInfo.location}` : "",
        ]
          .filter(Boolean)
          .join(""),
        style: "headerSubtitle",
        margin: [0, 2, 0, 2],
      },
      {
        text: [
          personalInfo.website ? `Website: ${personalInfo.website}` : "",
          personalInfo.linkedin ? `LinkedIn: ${personalInfo.linkedin}` : "",
          personalInfo.github ? `GitHub: ${personalInfo.github}` : "",
        ]
          .filter(Boolean)
          .join("  |  "),
        style: "headerLinks",
        margin: [0, 0, 0, 12],
      },

      // ==========================================
      // PROFESSIONAL SUMMARY
      // ==========================================
      ...createSectionHeader("Professional Summary"),
      { text: professionalSummary, style: "body" },

      // ==========================================
      // SKILLS SECTION (2-Column Layout)
      // ==========================================
      ...createSectionHeader("Skills"),
      {
        columns: [
          {
            width: "50%",
            text: [
              { text: "Technical: ", bold: true, color: "#2c3e50" },
              skills.technical.join(", "),
            ],
            style: "body",
          },
          {
            width: "50%",
            text: [
              { text: "Soft Skills: ", bold: true, color: "#2c3e50" },
              skills.soft.join(", "),
            ],
            style: "body",
          },
        ],
        columnGap: 15,
      },
      skills.inProgress && skills.inProgress.length > 0
        ? {
            text: [
              { text: "In Progress: ", bold: true, color: "#2c3e50" },
              skills.inProgress.join(", "),
            ],
            style: "body",
            margin: [0, 6, 0, 0],
          }
        : null,

      // ==========================================
      // EXPERIENCE SECTION
      // ==========================================
      ...createSectionHeader("Professional Experience"),
      ...experience.map((exp: ExperienceItem, index: number) => [
        {
          margin: [0, index === 0 ? 0 : 8, 0, 2],
          columns: [
            { text: exp.role, bold: true, fontSize: 11, color: "#2c3e50" },
            {
              text: `${exp.startDate} – ${exp.endDate || "Present"}`,
              alignment: "right",
              style: "body",
              italics: true,
            },
          ],
        },
        {
          columns: [
            {
              text: exp.company,
              italics: true,
              fontSize: 10,
              color: "#7f8c8d",
            },
            {
              text: exp.location,
              alignment: "right",
              fontSize: 10,
              color: "#7f8c8d",
            },
          ],
          margin: [0, 0, 0, 4],
        },
        { text: exp.description, style: "body", margin: [0, 0, 0, 4] },
        {
          ul: exp.bulletPoints.map((point: string) => point),
          style: "bulletList",
        },
      ]),

      // ==========================================
      // EDUCATION SECTION
      // ==========================================
      ...createSectionHeader("Education"),
      ...education.map((edu: EducationItem, index: number) => [
        {
          margin: [0, index === 0 ? 0 : 6, 0, 2],
          columns: [
            {
              text: `${edu.degree} in ${edu.fieldOfStudy}`,
              bold: true,
              fontSize: 11,
              color: "#2c3e50",
            },
            {
              text: edu.graduationYear || "",
              alignment: "right",
              style: "body",
            },
          ],
        },
        {
          text: edu.institution,
          italics: true,
          fontSize: 10,
          color: "#7f8c8d",
          margin: [0, 0, 0, 4],
        },
      ]),
    ].filter(Boolean) as Content[], // Filters out any null values (like empty inProgress skills)

    // ==========================================
    // GLOBAL STYLING DICTIONARY
    // ==========================================
    styles: {
      headerName: {
        fontSize: 24,
        bold: true,
        alignment: "center",
        color: "#2c3e50", // Dark Slate/Navy tone for clean professionalism
      },
      headerSubtitle: {
        fontSize: 10,
        alignment: "center",
        color: "#34495e",
      },
      headerLinks: {
        fontSize: 9,
        alignment: "center",
        color: "#16a085", // Subtle accent color for URLs
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        color: "#2c3e50",
      },
      body: {
        fontSize: 10,
        color: "#333333",
        lineHeight: 1.3,
      },
      bulletList: {
        fontSize: 10,
        color: "#333333",
        margin: [10, 0, 0, 4],
        lineHeight: 1.2,
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
    pageBreakBefore: (currentNode, nodeContainer) =>
      currentNode.headlineLevel === 1 &&
      nodeContainer.getFollowingNodesOnPage().length === 0,
  };
}

function twoColumnPdfTemplate(
  inputData: z.infer<typeof portfolioDetailsSchema>,
): TDocumentDefinitions {
  const { personalInfo, professionalSummary, skills, experience, education } =
    inputData;
  return {
    pageSize: "A4",
    pageMargins: [35, 35, 35, 35], // Sized down slightly to accommodate side-by-side structures

    content: [
      // ==========================================
      // HEADER SECTION (Full Width)
      // ==========================================
      { text: personalInfo.name.toUpperCase(), style: "headerName" },
      {
        text: [
          personalInfo.location ? `📍 ${personalInfo.location}` : "",
          personalInfo.phone ? `  |  📞 ${personalInfo.phone}` : "",
          personalInfo.email ? `  |  ✉️ ${personalInfo.email}` : "",
        ]
          .filter(Boolean)
          .join(""),
        style: "headerSubtitle",
      },
      {
        text: [
          personalInfo.website ? `🌐 ${personalInfo.website}` : "",
          personalInfo.linkedin
            ? `  |  in: ${personalInfo.linkedin.replace("https://www.", "")}`
            : "",
          personalInfo.github
            ? `  |  github: ${personalInfo.github.replace("https://www.", "")}`
            : "",
        ]
          .filter(Boolean)
          .join(""),
        style: "headerLinks",
        margin: [0, 2, 0, 15],
      },

      // Decorative top thin bar
      {
        canvas: [
          {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 525,
            y2: 0,
            lineWidth: 1.5,
            lineColor: "#2c3e50",
          },
        ],
        margin: [0, 0, 0, 15],
      },

      // ==========================================
      // MAIN TWO COLUMN LAYOUT
      // ==========================================
      {
        columns: [
          // ----------------------------------------
          // LEFT COLUMN: Main Content (65% Width)
          // ----------------------------------------
          {
            width: "65%",
            stack: [
              { text: "Professional Summary", style: "sectionHeader" },
              {
                text: professionalSummary,
                style: "body",
                margin: [0, 4, 0, 15],
              },

              {
                text: "Work Experience",
                style: "sectionHeader",
                margin: [0, 5, 0, 0],
              },
              ...experience.flatMap(
                (exp, index: number) =>
                  [
                    {
                      margin: [0, index === 0 ? 4 : 10, 0, 2],
                      keepWithNext: true, // Prevents row header separating from its bullets on page breaks
                      columns: [
                        {
                          text: exp.role,
                          bold: true,
                          fontSize: 11,
                          color: "#1a252f",
                        } as Content,
                        {
                          text: `${exp.startDate} – ${exp.endDate || "Present"}`,
                          alignment: "right",
                          style: "dateText",
                        } as Content,
                      ],
                    } as Content,
                    {
                      columns: [
                        {
                          text: exp.company,
                          italics: true,
                          fontSize: 9.5,
                          color: "#7f8c8d",
                          bold: true,
                        } as Content,
                        {
                          text: exp.location,
                          alignment: "right",
                          fontSize: 9.5,
                          color: "#7f8c8d",
                        } as Content,
                      ],
                      margin: [0, 0, 0, 4],
                    } as Content,
                    {
                      text: exp.description,
                      style: "body",
                      margin: [0, 0, 0, 4],
                    } as Content,
                    {
                      ul: exp.bulletPoints.map((point: string) => point),
                      style: "bulletList",
                    } as Content,
                  ] as Content[],
              ),
            ],
          },

          // ----------------------------------------
          // RIGHT COLUMN: Sidebar (35% Width)
          // ----------------------------------------
          {
            width: "35%",
            stack: [
              // Core Expertise
              { text: "Technical Skills", style: "sectionHeader" },
              {
                text: skills.technical.join("\n• "),
                prefix: "• ",
                style: "sidebarList",
                margin: [0, 4, 0, 15],
              },

              // Soft Skills
              { text: "Soft Skills", style: "sectionHeader" },
              {
                text: skills.soft.join("\n• "),
                prefix: "• ",
                style: "sidebarList",
                margin: [0, 4, 0, 15],
              },

              // Current learning focus
              skills.inProgress && skills.inProgress.length > 0
                ? {
                    stack: [
                      { text: "Learning Focus", style: "sectionHeader" },
                      {
                        text: skills.inProgress.join(", "),
                        style: "body",
                        margin: [0, 4, 0, 15],
                      },
                    ],
                  }
                : null,

              // Education Block
              { text: "Education", style: "sectionHeader" },
              ...education.flatMap(
                (edu, index: number) =>
                  [
                    {
                      margin: [0, index === 0 ? 4 : 8, 0, 0],
                      stack: [
                        {
                          text: `${edu.degree}`,
                          bold: true,
                          fontSize: 10,
                          color: "#1a252f",
                        } as Content,
                        {
                          text: edu.fieldOfStudy,
                          fontSize: 9.5,
                          color: "#34495e",
                        } as Content,
                        {
                          text: edu.institution,
                          italics: true,
                          fontSize: 9,
                          color: "#7f8c8d",
                        } as Content,
                        {
                          text: edu.graduationYear || "",
                          fontSize: 9,
                          color: "#7f8c8d",
                          margin: [0, 2, 0, 0],
                        } as Content,
                      ],
                    } as Content,
                  ] as Content[],
              ),
            ].filter(Boolean) as Content[], // Eliminates empty elements cleanly
          },
        ],
        columnGap: 20, // Creates a natural breathing space gutter between columns
      },
    ],

    // ==========================================
    // STYLING DICTIONARY
    // ==========================================
    styles: {
      headerName: {
        fontSize: 26,
        bold: true,
        alignment: "center",
        color: "#2c3e50",
      },
      headerSubtitle: {
        fontSize: 9.5,
        alignment: "center",
        color: "#34495e",
        margin: [0, 4, 0, 2],
      },
      headerLinks: {
        fontSize: 9,
        alignment: "center",
        color: "#16a085",
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        color: "#2c3e50",
        lineHeight: 1.2,
        // Draws a subtle underline underneath column sub-headers
        decoration: "underline",
        decorationColor: "#bdc3c7",
      },
      body: {
        fontSize: 9.5,
        color: "#2c3e50",
        lineHeight: 1.3,
      },
      dateText: {
        fontSize: 9,
        italics: true,
        color: "#7f8c8d",
      },
      bulletList: {
        fontSize: 9.5,
        color: "#2c3e50",
        margin: [8, 0, 0, 6],
        lineHeight: 1.25,
      },
      sidebarList: {
        fontSize: 9.5,
        color: "#2c3e50",
        lineHeight: 1.4,
      },
    },
  };
}
