import LeftSidebar from "@/core/components/LeftSidebar";
import Navbar from "@/core/components/navbar/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="background-light850_dark100 relative isolate w-full">
      <Navbar />
      <div className="flex w-full">
        <LeftSidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto h-[2000px] w-full max-w-5xl">{children}</div>
        </section>

        {/* <RightSidebar /> */}
      </div>
    </main>
  );
}
