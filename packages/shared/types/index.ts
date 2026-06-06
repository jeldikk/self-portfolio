export type PdfTemplateType = "single_column" | "two_column";

export interface ResumeBuilderWorkerInputType {
  resumeText: string;
  jobDescription: string;
  templateType: PdfTemplateType;
}
