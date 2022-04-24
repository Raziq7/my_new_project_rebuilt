import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FiBriefcase,
  FiHome,
  FiMenu,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import { MdProductionQuantityLimits, MdCategory } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import NavItems from "./NavItems";

function SideNav() {
  const [navSize, setNavSize] = useState("large");
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      box
      boxShadow="0 4px 12px 0 rgba(0,0,0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
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
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") {
              setNavSize("large");
            } else {
              setNavSize("small");
            }
          }}
        />
        <NavItems navSize={navSize} icon={FiHome} title="Dashboard" />
        <NavItems
          navSize={navSize}
          icon={MdProductionQuantityLimits}
          title="Product Managment"
          active
        />
        <NavItems navSize={navSize} icon={FiUser} title="User Managment" />
        <NavItems navSize={navSize} icon={FaUserTie} title="Staff Managment" />
        <NavItems
          navSize={navSize}
          icon={MdCategory}
          title="Category Managment"
        />
        <NavItems navSize={navSize} icon={FiBriefcase} title="Report" />
        <NavItems navSize={navSize} icon={FiSettings} title="Setting" />
      </Flex>

      <Flex
        p="5%"
        flex="colomn"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Dashboard Screen
            </Heading>
            <Text>Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SideNav;
