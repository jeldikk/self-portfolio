import LoginComponent from "@/components/login/login.component";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginComponent />
    </div>
  );
}
