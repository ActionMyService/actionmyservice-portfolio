import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "./admin-sidebar";

export const metadata = {
  title: "Admin — ActionMyService",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar user={session} />
      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}