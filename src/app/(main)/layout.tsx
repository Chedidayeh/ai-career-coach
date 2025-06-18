import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="container lg:px-20 mx-auto mt-24 mb-20">{children}</div>;
};

export default MainLayout;
