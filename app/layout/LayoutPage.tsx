import * as React from "react";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative h-full min-h-screen w-full bg-primary-100 font-nunito text-text-accent">
        {/* <div className="absolute -right-28 bottom-48 h-80 aspect-square rounded-full bg-primary-300 blur-sm"></div> */}
        {children}
      </main>
    </>
  );
}
