import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import React, { useState } from "react";
import {
  FiBriefcase,
  FiHome,
  FiMenu,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { BsBoxSeam } from "react-icons/bs";
import NavItems from "./NavItems";
import { useSelector } from "react-redux";
import { BiPurchaseTagAlt } from "react-icons/bi";

function SideNav() {
  const [navSize, setNavSize] = useState("small");
  const { staffInfo } = useSelector((state) => {
    return state.staffLginData;
  });

  let staffExit = localStorage.getItem("staffInfo")
    ? JSON.parse(localStorage.getItem("staffInfo"))
    : null;

  return (
    <>
      {staffInfo && (
        <Flex
          pos="sticky"
          left="5"
          h="145vh"
          marginTop="2.5vh"
          marginBottom="auto"
          box
          boxShadow="0 4px 12px 0 rgba(0,0,0, 0.05)"
          borderRadius={navSize == "small" ? "15px" : "30px"}
          w={navSize == "small" ? "75px" : "310px"}
          flexDir="column"
          justifyContent="space-between"
          rounded="lg"
          backgroundColor="#16134F"
        >
          <Flex
            p="5%"
            flexDir="column"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            as="nav"
          >
            <IconButton
              background="none"
              mt={5}
              _hover={{ background: "none" }}
              icon={
                <IoIosArrowDroprightCircle color="white" w="100px" h="auto" />
              }
              onClick={() => {
                if (navSize == "large") {
                  setNavSize("small");
                } else {
                  setNavSize("large");
                }
              }}
            />

            <Link
              style={{ marginRight: "100%", textDecoration: "none" }}
              as={ReachLink}
              to="/"
            >
              <NavItems navSize={navSize} icon={FiHome} title="Dashboard" />
            </Link>

            <Link
              style={{ marginRight: "100%", textDecoration: "none" }}
              as={ReachLink}
              to="/home"
            >
              <NavItems
                navSize={navSize}
                icon={MdProductionQuantityLimits}
                title="Product Managment"
                active
              />
            </Link>

            {staffExit.findStaff.status == "admin" && "superAdmin" && (
              <Link
                style={{ marginRight: "100%", textDecoration: "none" }}
                as={ReachLink}
                to="/usermanagment"
              >
                <NavItems
                  navSize={navSize}
                  icon={FiUser}
                  title="User Managment"
                />
              </Link>
            )}

            <Link
              style={{ marginRight: "100%", textDecoration: "none" }}
              as={ReachLink}
              to="/purchaseStock"
            >
              <NavItems
                navSize={navSize}
                icon={BsBoxSeam}
                title="Purchase Stock Managment"
              />
            </Link>

            <Link
              style={{ marginRight: "100%", textDecoration: "none" }}
              as={ReachLink}
              to="/billing"
            >
              <NavItems
                navSize={navSize}
                icon={BiPurchaseTagAlt}
                title="Billing Managment"
              />
            </Link>

            <Link
              style={{
                marginRight: "100%",
                textDecoration: "none",
              }}
              as={ReachLink}
              to="/LadgerBook"
            >
              <NavItems
                navSize={navSize}
                icon={FiBriefcase}
                title="Ladger Book"
              />
            </Link>

            <Divider display={navSize == "small" ? "none" : "flex"} />

            <Link
              mt="30px"
              style={{
                marginRight: "100%",
                textDecoration: "none",
                border: "none",
              }}
              as={ReachLink}
              to="/Setting"
            >
              <NavItems navSize={navSize} icon={FiSettings} title="Settings" />
            </Link>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default SideNav;
