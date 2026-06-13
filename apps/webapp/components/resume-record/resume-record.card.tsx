"use client";

import { Schema } from "@/data-schema";
import { useState } from "react";
import { getUrl } from "@aws-amplify/storage";

type Props = {
  resume: Schema["Resume"]["type"];
};

const STATUS_BADGES: Record<string, string> = {
  processing: "badge badge-warning",
  completed: "badge badge-success",
  failed: "badge badge-error",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ResumeRecord(props: Props) {
  const { resume } = props;
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  async function handleFileDownload() {
    setIsDownloading(true);
    const secureUrl = await getUrl({
      path: resume.s3Key as string,
      options: {
        validateObjectExistence: true,
        expiresIn: 2 * 60,
      },
    });
    window.open(secureUrl.url.toString(), "_blank");
    setIsDownloading(false);
  }

  return (
    <div className="card bg-base-100 border hover:border-primary">
      <div className="card-body p-4 gap-2">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-base">{resume.name}</h2>
          <span className={STATUS_BADGES[resume.status ?? ""] ?? "badge"}>
            {resume.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-base-content/70">
          <span>{resume.companyName}</span>
          <span>{formatDate(resume.createdAt)}</span>
        </div>
        {resume.status === "completed" && (
          <div className="card-actions justify-end mt-1">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleFileDownload}
              disabled={isDownloading}
            >
              {isDownloading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {isDownloading ? "Downloading…" : "Download"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
