import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import { useStateValue } from "../context/Chatprovider";

export default function ChatPage() {
  const [{ user }, dispatch] = useStateValue();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch({
        type: "SET_USER",
        user: userInfo,
      });
    }
  }, []);

  // console.log(user);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}
