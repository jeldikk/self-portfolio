import { PORTFOLIO_DETAILS } from "../utils/portfolio-details";
import { createResumePdf } from "../utils";
import fs from "fs/promises";

async function createSingleColumnPdf() {
  const pdfBuffer = await createResumePdf(PORTFOLIO_DETAILS, "single_column");
  await fs.writeFile("single-column.pdf", pdfBuffer);
  return {
    status: "success",
  };
}

async function createTwoColumnPdf() {
  const pdfBuffer = await createResumePdf(PORTFOLIO_DETAILS, "two_column");
  await fs.writeFile("two-column.pdf", pdfBuffer);
  return {
    status: "success",
  };
}

createSingleColumnPdf()
  .then((res) => {
    console.log("Single column:", res);
  })
  .catch((err) => console.error(err));

createTwoColumnPdf()
  .then((res) => {
    console.log("Two column:", res);
  })
  .catch((err) => console.error(err));
