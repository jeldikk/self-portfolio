import Link from "next/link";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";
import ResumeRecord from "@/components/resume-record/resume-record.card";
import { redirect } from "next/navigation";

export default async function ResumesPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/auth/login");
  }

  const { data: resumes, errors } =
    await cookieBasedClient.models.Resume.list();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-base-content">Resumes</h1>
        <Link href="/admin/resumes/builder" className="btn btn-primary">
          Create Resume
        </Link>
      </div>

      {/* Error State */}
      {errors && errors.length > 0 && (
        <div className="alert alert-error">
          <span>
            Failed to load resumes: {errors.map((e) => e.message).join(", ")}
          </span>
        </div>
      )}

      {/* Empty State */}
      {(!resumes || resumes.length === 0) && !errors?.length && (
        <div className="flex flex-col items-center justify-center py-16 bg-base-200 rounded-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            aria-hidden="true"
            className="w-16 h-16 text-base-content/40 mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <p className="text-lg text-base-content/60 mb-2">No resumes yet</p>
          <p className="text-sm text-base-content/40 mb-4">
            Create your first resume to get started.
          </p>
          <Link href="/admin/resumes/builder" className="btn btn-primary">
            Create Resume
          </Link>
        </div>
      )}

      {/* Resume Table */}
      {resumes &&
        resumes.length > 0 &&
        // <div className="overflow-x-auto bg-base-100 rounded-box border border-base-300">
        //   <table className="table">
        //     <thead>
        //       <tr className="bg-base-200">
        //         <th>Name</th>
        //         <th>Company</th>
        //         <th>Job Description</th>
        //         <th>Template</th>
        //         <th>Status</th>
        //         <th>S3 Key</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {resumes.map((resume) => (
        //         <tr key={resume.id} className="hover:bg-base-200">
        //           <td className="font-medium">{resume.name}</td>
        //           <td>{resume.companyName || "—"}</td>
        //           <td className="max-w-xs truncate">{resume.jobDescription}</td>
        //           <td>
        //             {resume.pdfTemplateType === "single_column" ? (
        //               <span className="badge badge-outline">Single Column</span>
        //             ) : resume.pdfTemplateType === "two_column" ? (
        //               <span className="badge badge-outline">Two Column</span>
        //             ) : (
        //               "—"
        //             )}
        //           </td>
        //           <td>
        //             {resume.status === "completed" ? (
        //               <span className="badge badge-success">Completed</span>
        //             ) : resume.status === "processing" ? (
        //               <span className="badge badge-warning">Processing</span>
        //             ) : resume.status === "failed" ? (
        //               <span className="badge badge-error">Failed</span>
        //             ) : (
        //               "—"
        //             )}
        //           </td>
        //           <td className="max-w-[150px] truncate text-sm text-base-content/60">
        //             {resume.s3Key || "—"}
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
        resumes.map((item) => <ResumeRecord key={item.id} resume={item} />)}
    </div>
  );
}
