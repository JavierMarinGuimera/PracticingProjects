import { redirect } from "next/navigation";
import { requireAdmin } from "@/server/auth";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/");
  }

  return <>{children}</>;
}
