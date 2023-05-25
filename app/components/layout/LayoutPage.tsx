import * as React from "react"

export default function LayoutPage ({children} : {children : React.ReactNode}) {
  return (
    <div className="h-screen w-full font-nunito bg-primary-200">
      {children}
    </div>
  );
}