import { React } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  console.log("navbar rerender");
  const { colorMode, toggleColorMode } = useColorMode();
  const { staffInfo } = useSelector((state) => state.staffLginData);
  console.log(staffInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const logOut = () => {
    dispatch({
      type: "STAFF_LOGIN_RESET",
    });
    localStorage.getItem("staffInfo")
      ? localStorage.removeItem("staffInfo")
      : localStorage.removeItem("adminInf o");
    navigate("/login");
  };

  let staffExit = localStorage.getItem("staffInfo")
    ? JSON.parse(localStorage.getItem("staffInfo"))
    : null;

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        {staffInfo && (
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box>
              {" "}
              <Avatar
                size={"sm"}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU"
                }
              />
            </Box>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <FaMoon /> : <FaSun />}
                </Button>

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU"
                      }
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{staffExit.findStaff.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    {localStorage.getItem("staffInfo") ? (
                      <MenuItem onClick={logOut}>Logout</MenuItem>
                    ) : (
                      <Link
                        style={{ textDecoration: "none" }}
                        as={ReachLink}
                        to="/login"
                      >
                        <MenuItem>Login</MenuItem>
                      </Link>
                    )}
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        )}
      </Box>
    </>
  );
}
