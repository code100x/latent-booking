import React from "react";
import Navbar from "./_common/Navbar";
const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-background-primaryblack text-white min-h-dvh px-20">
      <Navbar/>
      {children}
    </div>
  );
};

export default WebsiteLayout;
