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
  Badge,
  VStack,
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
      <Box bg={useColorModeValue("#fff", "gray.900")} px={4}>
        {staffInfo && (
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <Box>
              {" "}
              {/* <Avatar size={"sm"} src={"images/UK-Logo.png"} w="200px" /> */}
              <img src="images/UK-Logo.png" alt="" width="80px" h="auto" />
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
                    {/* <img
                      src="images/UK-Logo.png"
                      alt=""
                      width="80px"
                      h="auto"
                    /> */}
                    <Avatar size={"sm"} src={""} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={""} />
                      {/* <img
                        src="images/UK-Logo.png"
                        alt=""
                        width="100px"
                        h="auto"
                      /> */}
                    </Center>
                    <br />
                    <Center>
                      <VStack>
                        {staffExit.findStaff.status && (
                          <Badge colorScheme="green">
                            {staffExit.findStaff.status}
                          </Badge>
                        )}

                        <p>{staffExit.findStaff.email}</p>
                      </VStack>
                    </Center>
                    <br />
                    <MenuDivider />
                    {/* <MenuItem>Your Servers</MenuItem> */}
                    <Link
                      style={{ textDecoration: "none" }}
                      as={ReachLink}
                      to="/setting"
                    >
                      <MenuItem>Account Settings</MenuItem>
                    </Link>
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
