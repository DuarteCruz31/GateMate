import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <div className="bg-slate-900 flex flex-col items-center h-64">
      <div className=" w-64 h-32 mb-10">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text-white flex flex-col items-center">
        <div>© 2002-2022 GateMate Ltd.</div>
        <div>
          <u>Privacy Policy</u> & <u>Terms of Service</u>
        </div>
      </div>
    </div>
  );
}

export default Footer;
