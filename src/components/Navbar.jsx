import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import NavMain from "./NavMain";
import UserMenu from "./UserMenu";

function Navbar() {
  return (
    <>
      <div className="fixed w-full bg-white z-10 shado-sm">
        <div className="py-4 border-b-[1px]">
          <Container />
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
            <Logo />
            <NavMain />
            <UserMenu />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
