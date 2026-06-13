import { getUrl } from "aws-amplify/storage";
import { useTransition } from "react";

export default function ViewResumeButton() {
  const [isPending, setTransition] = useTransition();

  function handleViewResume() {
    setTransition(async () => {
      const defaultResumeRes = await fetch("/api/resume/default", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await defaultResumeRes.json();
      if (!defaultResumeRes.ok) {
        console.error({ failedResponse: body });
        return;
      }
      const secureUrl = await getUrl({
        path: body.s3Key,
        options: {
          validateObjectExistence: true,
          expiresIn: 5 * 60,
        },
      });

      window.open(secureUrl.url.toString(), "_blank");
    });
  }

  return (
    <button
      type="button"
      className="btn btn-outline btn-lg"
      onClick={handleViewResume}
      disabled={isPending}
    >
      {isPending && <span className="loading loading-spinner"></span>}
      View Resume
    </button>
  );
}
