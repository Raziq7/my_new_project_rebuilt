import {
  Breadcrumb,
  HStack,
  Spacer,
  Image,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import React from "react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Breadcrumb>
        <HStack variantColor="blue">
          <Image
            objectFit="cover"
            boxSize="100px"
            w="27"
            h="27"
            rounded="100"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Spacer />
          <Text fontSize="sm">Raziq m.r</Text>
          <Image
            w="19"
            h="19"
            rounded="100"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <IconButton
            icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
            isRound="true"
            size="lg"
            onClick={toggleColorMode}
          />
        </HStack>
      </Breadcrumb>
    </div>
  );
}

export default Navbar;
