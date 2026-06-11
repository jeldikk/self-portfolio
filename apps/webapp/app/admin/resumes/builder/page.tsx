import CreateResumeForm from "@/components/create-resume/create-resume.component";

export default function ResumeBuilderPage() {
  return (
    <div className="resume-builder-page">
      <h1 className="text-2xl font-bold">Resume Builder</h1>
      <p>Build your resume</p>
      <CreateResumeForm />
    </div>
  );
}
