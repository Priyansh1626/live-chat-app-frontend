import {
  BellIcon,
  ChevronDownIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useStateValue } from "../../context/Chatprovider";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { getSender } from "../../context/reducer";

export default function SideDrawer() {
  const [{ user, selectedChat, chats, notification }, dispatch] =
    useStateValue();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter somthing",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.get(`/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occurred!!",
        description: "Failed to load the search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await api.post("/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        dispatch({
          type: "SET_CHATS",
          data: data,
        });
      }

      dispatch({
        type: "SET_SELECTED_CHAT",
        data: data,
      });
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: "Failed to load the search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg={"white"}
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={"5px"}
      >
        <Tooltip label="Search user to chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <Search2Icon />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize={"2xl"}>Talk-Talk</Text>
        <div>
          <Menu>
            <MenuButton p="1">
              <BellIcon
                fontSize={"2xl"}
                m="1"
                color={!notification ? "red" : "black"}
              />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No new messages available"}
              {notification?.map((not) => (
                <MenuItem
                  key={not._id}
                  onClick={() => {
                    dispatch({
                      type: "SET_SELECTED_CHAT",
                      selectedChat: not.chat,
                    });
                    dispatch({
                      type: "FILTER_NOTIFICATION",
                      noti: not,
                    });
                  }}
                >
                  {not.chat.isGroupChat
                    ? `New message in ${not.chat.chatName}`
                    : `New message from ${getSender(user, not.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton p="3" as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.picture}
              />
            </MenuButton>
            <MenuList>
              <Profile user={user}>
                <MenuItem>My Profile</MenuItem>
              </Profile>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box>
              <DrawerHeader borderBottomWidth={"1px"} width="100%">
                Search User
              </DrawerHeader>
            </Box>
            <Box cursor={"pointer"} onClick={onClose} mr={7}>
              <CloseIcon fontSize={"sm"} />
            </Box>
          </Box>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml={"auto"} display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
