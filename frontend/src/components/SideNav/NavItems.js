import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  Text,
  Link,
  MenuList,
} from "@chakra-ui/react";
import React from "react";

function NavItems({ navSize, icon, title, active }) {
  return (
    <Flex
      m="30"
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu>
        <Link
          backgroundColor={active && "AEC8CA"}
          p={3}
          borderRadius={8}
          _hover={{ TextDecoder: "none", backgroundColor: "#388afc" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "white" : "white"}
              />
              <Text
                color="white"
                ml={5}
                display={navSize == "small" ? "none" : "flex"}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}

export default NavItems;
