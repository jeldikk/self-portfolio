export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen max-w-11/12 mx-auto">{children}</div>;
}
