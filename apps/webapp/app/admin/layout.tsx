import ActiveTabLink from "@/components/active-tab-link/active-tab-link.component";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl font-bold p-4">Hello, Kamal</h1>
      <div role="tablist" className="tabs tabs-border">
        <ActiveTabLink href="/admin" className="tab">
          Dashboard
        </ActiveTabLink>
        <ActiveTabLink href="/admin/storage" className="tab">
          Storage
        </ActiveTabLink>
        <ActiveTabLink href="/admin/messages" className="tab">
          Messages
        </ActiveTabLink>
      </div>
      {children}
    </div>
  );
}
