import * as React from "react"

export default function LayoutPage ({children} : {children : React.ReactNode}) {
  return (
    <div className="h-screen w-full font-nunito bg-primary-100 relative overflow-hidden">
      <div className="absolute -right-28 bottom-48 h-80 aspect-square rounded-full bg-primary-300 blur-sm"></div>
      {children}
    </div>
  );
}