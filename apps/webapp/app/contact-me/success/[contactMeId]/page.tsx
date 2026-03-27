import { cookieBasedClient, isAuthenticated } from "@/utils/amplify.server";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ contactMeId: string }>;
}

export default async function ContactMeSuccessPage({ params }: Props) {
  let authMode: "userPool" | "iam" = "iam";
  const { contactMeId } = await params;
  console.log({ contactMeId });
  const isAuthenticatedUser = await isAuthenticated();
  if (isAuthenticatedUser) {
    authMode = "userPool";
  }

  const response = await cookieBasedClient.models.ContactMe.get(
    {
      id: contactMeId,
    },
    {
      selectionSet: ["id", "message", "acknowledgedAt", "acknowledged"],
      authMode,
    },
  );

  console.dir({ response }, { depth: null });

  if (!response.data) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-10">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <div className="flex items-start gap-4">
            <div className="badge badge-success badge-lg">Submitted</div>
            <div>
              <h1 className="card-title text-2xl md:text-3xl">
                Thank you for your message
              </h1>
              <p className="text-base-content/80">
                We have received your request and will get back to you soon.
              </p>
            </div>
          </div>

          <div className="rounded-box bg-base-200 p-4">
            <p className="text-sm text-base-content/70">Message ID</p>
            <p className="font-mono text-sm md:text-base">{contactMeId}</p>
          </div>

          {response.data?.acknowledgedAt && response.data?.acknowledged && (
            <div className="alert alert-info">
              <span>
                Your message was acknowledged on{" "}
                {new Date(response.data.acknowledgedAt).toLocaleString()}.
              </span>
            </div>
          )}

          <div className="card-actions mt-2 flex-wrap">
            <Link href="/" className="btn btn-primary">
              Go to Home
            </Link>
            <Link href="/contact-me" className="btn btn-outline">
              Send Another Message
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
