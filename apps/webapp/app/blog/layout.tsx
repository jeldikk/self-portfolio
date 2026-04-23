export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-11/12 lg:max-w-8/12 mx-auto">{children}</div>;
}
