import React from "react";
import Navbar from "./_common/Navbar";
import Footer from "./_common/Footer";
const WebsiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-background-primaryblack text-white min-h-dvh px-20 pb-10">
      <Navbar/>
      {children}
      <Footer/>
    </div>
  );
};

export default WebsiteLayout;