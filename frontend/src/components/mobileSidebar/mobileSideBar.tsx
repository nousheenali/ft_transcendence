import React, { useCallback, useState } from "react";
import { Button, Drawer, Menu, Swap } from "react-daisyui";
import AsideBar from "../layout/asidebar";
export default function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);
  return (
    <Drawer
      className=""
      open={visible}
      onClickOverlay={toggleVisible}
      side={<AsideBar isMobile={true} />}
    >
      <Button onClick={toggleVisible} className=" lg:hidden rounded-none ">
        <svg
          className={visible === true ? "fill-current" : "fill-current hiddden"}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </Button>
    </Drawer>
  );
}
