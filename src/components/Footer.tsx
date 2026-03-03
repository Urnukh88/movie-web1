import React from "react";

export const Footer = () => {
  return (
    <div className="w-full h-[280px] bg-[#4338CA] max-sm:h-[335px]">
      <div className="w-full h-[200px] py-[40px] px-[80px] text-[#FAFAFA] flex flex-row justify-between max-sm:flex max-sm:flex-col max-sm:pl-[30px]">
        <div className="flex flex-col w-[247px] h-[52px] max-sm:mb-[28px]">
          <div className="flex flex-row gap-[9.67px] w-[92px] h-[20px] items-center text-[#FAFAFA]">
            <img className="w-[20px] h-[20px] " src="/Vector (9).png" alt="" />
            <p className="font-bold text-[16px] ">Movie Z</p>
          </div>
          <div className="pt-[12px] font-normal text-[14px]">
            © 2024 Movie Z. All Rights Reserved.
          </div>
        </div>
        <div className="flex gap-[96px] max-sm:flex max-sm:justify-between ">
          <div className="text-[14px] text-[#FAFAFA]">
            <p>Contact Information</p>
            <div className="flex gap-3 pt-[12px] justify-center items-center">
              <img className="w-[16px] h-[16px]" src="/Wifi icon.png" alt="" />
              <div className="flex flex-col">
                <h3 className="font-bold">Email:</h3>
                <p className="font-normal">support@movieZ.com</p>
              </div>
            </div>
            <div className="pt-[24px] flex gap-3 justify-center items-center">
              <img src="/Vector (11).png" alt="" />
              <div className="flex flex-col">
                <h3 className="font-bold">Phone:</h3>
                <p className="font-normal">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-[14px] text-[#FAFAFA]">
            <p>Follow us</p>
            <div className="flex gap-[12px] pt-[12px] max-sm:flex max-sm:flex-col">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
