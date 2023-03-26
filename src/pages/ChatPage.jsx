import { Box } from "@chakra-ui/react";
import React from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { useStateValue } from "../context/Chatprovider";

export default function ChatPage() {
  const [{ user }, dispatch] = useStateValue();

  // console.log(user);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box>
        {/* {user && <MyChats/>} */}
        {/* {user && <ChatBox/>} */}
      </Box>
    </div>
  );
}
