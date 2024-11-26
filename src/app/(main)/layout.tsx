import RightSidebar from "@/components/RightSidebar";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="relative flex flex-col">
        <main className="relative flex">
          <section className="flex min-h-screen flex-1 flex-col ">
            <div className="mx-auto flex w-full flex-col ">
              <div className="flex flex-col md:pb-14">
                <Toaster />

                {children}
              </div>
            </div>
          </section>

          <RightSidebar />
        </main>
      </div>
      </div>
    </>
  );
}
