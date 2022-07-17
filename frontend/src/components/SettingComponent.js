import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
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
import Setting from "../screen/Setting";
import Category from "./Category";

function SettingComponent() {
  const [visible, setVisible] = useState(false);
  const [visibleColumn, setVisibleColumn] = useState(false);
  const [catVisible, setCatVisible] = useState(false);

  const bg = useColorModeValue("white", "dark");
  return (
    <>
      <Box sx={{ w: "89%" }}>
        <Center fontSize="40px" color="teal" mt="10px" ml="35px">
          Setting Page
        </Center>
        {catVisible && <CategoryLadger />}
        <Box
          boxShadow="2xl"
          p="6"
          w="89%"
          h="100vh"
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
              {/* <TabPanel>
              <VStack>
                <Setting title="Product Name" />
                <Spacer />
                <Setting title="Description" />
                <Spacer />

                <Setting title="Main Category" />
                <Spacer />

                <Setting title="Sub Category" />
                <Spacer />

                <Setting title="Vendor Name" />
                <Spacer />

                <Setting title="Size" />
                <Spacer />

                <Setting title="Color" />
                <Spacer />

                <Setting title="Stocks" />
                <Spacer />

                <Setting title="Qty Type" />
                <Spacer />

                <Setting title="Qty" />
                <Spacer />

                <Setting title="Market Price" />
                <Spacer />

                <Setting title="Selling Price" />
                <Spacer />

                <Setting title="Price Code" />
                <Spacer />

                <Setting title="Bar Code" />
                <Spacer />

                <Setting title="MRP Bar Code" />
                <Spacer />
                <Setting title="Action" />
              </VStack>
            </TabPanel> */}
              <TabPanel>
                <CategoryLadger />
              </TabPanel>
              <TabPanel>
                <Category />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {
          // <Box overflowY="auto" mb="auto" mt="50px" ml="100px">
          //   <HStack>
          //     <Box
          //       onClick={() => {
          //         setVisible(true);
          //       }}
          //       maxW="sm"
          //       borderWidth="1px"
          //       borderRadius="lg"
          //       overflow="hidden"
          //       position="relative"
          //     >
          //       {visibleColumn && <Text>ProductManage</Text>}
          //     </Box>
          //     <VStack>
          //       {visible == true && <Setting title="ProductName" />}
          //       <Spacer />
          //       {visible == true && <Setting title="Description" />}
          //       <Spacer />
          //       {visible == true && <Setting title="MainCategory" />}
          //       <Spacer />
          //       {visible == true && <Setting title="SubCategory" />}
          //       <Spacer />
          //       {visible == true && <Setting title="VendorName" />}
          //       <Spacer />
          //       {visible == true && <Setting title="Size" />}
          //       <Spacer />
          //       {visible == true && <Setting title="Color" />}
          //       <Spacer />
          //       {visible == true && <Setting title="Stocks" />}
          //       <Spacer />
          //       {visible == true && <Setting title="MaterialType" />}
          //       <Spacer />
          //       {visible == true && <Setting title="MarketPrice" />}
          //       <Spacer />
          //       {visible == true && <Setting title="SellingPrice" />}
          //       <Spacer />
          //       {visible == true && <Setting title="PriceCode" />}
          //       <Spacer />
          //       {visible == true && <Setting title="BarCode" />}
          //       <Spacer />
          //       {visible == true && <Setting title="MRPBarCode" />}
          //       <Spacer />
          //       {visible == true && <Setting title="Action" />}
          //     </VStack>
          //   </HStack>
          // </Box>
        }
        {/* </Flex> */}
      </Box>
    </>
  );
}

export default SettingComponent;
