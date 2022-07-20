import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

import CategoryLadger from "../screen/CategoryLadger";
import Category from "./Category";

function SettingComponent() {
  const bg = useColorModeValue("white", "dark");
  return (
    <>
      <Box sx={{ w: "89%" }}>
        <Center fontSize="40px" color="teal" mt="10px" ml="35px">
          Setting Page
        </Center>
        <Box
          boxShadow="2xl"
          p="6"
          w="89%"
          h="135vh"
          ml="130px"
          mb="260px"
          rounded="xl"
          backgroundColor={bg}
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab sx={{ fontWeight: "bold", color: "#16134F" }}>
                Ledger book settings
              </Tab>
              <Tab sx={{ fontWeight: "bold", color: "#16134F" }}>
                Product settings
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CategoryLadger />
              </TabPanel>
              <TabPanel>
                <Category />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

export default SettingComponent;
