import * as React from "react";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen h-full w-full font-nunito bg-primary-100 relative">
        {/* <div className="absolute -right-28 bottom-48 h-80 aspect-square rounded-full bg-primary-300 blur-sm"></div> */}
        {children}
      </main>
    </>
  );
}
