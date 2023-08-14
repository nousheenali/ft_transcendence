import React, { useCallback, useState } from "react";
import { Button, Drawer, Menu, Swap } from "react-daisyui";
import { GiHamburgerMenu } from 'react-icons/Gi';
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
      side={
        <AsideBar isMobile={true} />
      }
    >
      <Button color="primary" onClick={toggleVisible} className=" lg:hidden">
        Open drawer
      </Button>
    </Drawer>
  )
      
}
