import React from "react";
import Logo from "../../assets/images/Clickmasters-Digital-Marketing-Agency.webp";
function Mainnavbar({ sideffect }) {
  return (
    <div className="py-2 px-2 bg-[#2E2E30] flex items-center justify-between text-[12px] min-[450px]:text-[14px] border-b-[1px] border-b-[#424244]">
      <div className="left">
        <div className="px-2 flex">
          <div>
            <i
              onClick={sideffect}
              className="fa-solid fa-bars text-white text-xl"
            ></i>
          </div>
          <div className="w-14 hidden md:flex mx-3  ">
            <img
              src={Logo}
              alt="Logo"
              className="w-full h-auto bg-white rounded-md p-1"
            />
          </div>
        </div>
      </div>
      <div className="center w-full ml-2 sm:w-64 lg:w-96 min-[1100px]:w-[450px] xl:w-[550px] min-[1350px]:w-[650px]">
        <div className="">
          <div className="flex bg-[#565557] items-center px-2 py-1 rounded-full ">
            <i class="fa-solid fa-magnifying-glass text-white pr-2"></i>
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#565557] text-white outline-none "
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="flex space-x-1">
          <div className="w-15 items-center flex">
            <div className="bg-[#DFC866] w-7 h-7 rounded-full flex justify-center items-center ">
              <p className="">AJ</p>
            </div>
            <div className="w-7">
              <img
                src="/images/dropdownicon.png"
                alt=""
                className="w-5 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mainnavbar;
