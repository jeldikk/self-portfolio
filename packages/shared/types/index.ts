export type PdfTemplateType = "single_column" | "two_column";

export interface ResumeBuilderWorkerInputType {
  jobDescription: string;
  templateType: PdfTemplateType;
  resumeRecordId: string;
  companyName: string;
}
