import { cookies } from "next/headers";
import { LoginForm } from "./components/login-form";
import { AdminDashboard } from "./components/admin-dashboard";

export default async function AccesoEditarPage() {
  const session = (await cookies()).get("admin_session");

  if (!session?.value) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
