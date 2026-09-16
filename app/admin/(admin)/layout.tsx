import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/admin/AppSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-[#f2eee9] text-[#201e1c]">
        <AppSidebar />
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#ded8d1] bg-[#fbf9f6]/95 px-4 backdrop-blur md:px-7">
            <div className="flex items-center gap-3"><SidebarTrigger /><div><p className="text-[9px] uppercase tracking-[0.22em] text-[#817a74]">RUA Vera</p><p className="text-sm font-medium">Centro de administración</p></div></div>
            <div className="rounded-full border border-[#d8d1ca] bg-white px-4 py-2 text-[10px] uppercase tracking-[0.16em]">Modo gestión</div>
          </header>
          <div className="p-4 md:p-7">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
