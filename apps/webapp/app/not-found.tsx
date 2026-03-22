import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="card bg-base-200 shadow-xl max-w-xl w-full">
        <div className="card-body items-center text-center gap-4">
          <p className="badge badge-error badge-outline">404</p>
          <h1 className="text-4xl font-bold">Page not found</h1>
          <p className="text-base-content/70">
            The page you are trying to access does not exist in this app.
          </p>
          <Image
            className="rounded-full"
            src="/images/confused.png"
            alt="Not Found"
            width={400}
            height={300}
          />
          <div className="card-actions mt-2">
            <Link href="/" className="btn btn-primary">
              Go to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
