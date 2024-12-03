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
            <RightSidebar />
            <section className="flex min-h-screen flex-1 w-full">
              <div className="mx-auto flex w-full  ">
                <Toaster />
                {children}
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
