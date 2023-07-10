import React, { createContext } from "react";

export const ShoppingContext = createContext(null);
export const ShoppingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = {};

  // return <ShoppingContext.Provider value={ value }> { children } </ShoppingContext.Provider>;
  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
