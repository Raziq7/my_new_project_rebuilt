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
} from "@chakra-ui/react";
import React, { useState } from "react";

import CategoryLadger from "../screen/CategoryLadger";
import Setting from "../screen/Setting";
import Category from "./Category";

function SettingComponent() {
  const [visible, setVisible] = useState(false);
  const [visibleColumn, setVisibleColumn] = useState(false);
  const [catVisible, setCatVisible] = useState(false);

  return (
    <>
      {/* <Box overflowY="auto" mb="auto" mt="50px" ml="100px">
        <HStack>
          <Box
            onClick={() => {
              setVisible(true);
            }}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            position="relative"
          >
            <Text>ProductManage</Text>
          </Box>
          <VStack>
            {visible == true && <Setting title="Product Name" />}
            <Spacer />
            {visible == true && <Setting title="Description" />}
            <Spacer />

            {visible == true && <Setting title="Main Category" />}
            <Spacer />

            {visible == true && <Setting title="Sub Category" />}
            <Spacer />

            {visible == true && <Setting title="Vendor Name" />}
            <Spacer />

            {visible == true && <Setting title="Size" />}
            <Spacer />

            {visible == true && <Setting title="Color" />}
            <Spacer />

            {visible == true && <Setting title="Stocks" />}
            <Spacer />

            {visible == true && <Setting title="Qty Type" />}
            <Spacer />

            {visible == true && <Setting title="Qty" />}
            <Spacer />

            {visible == true && <Setting title="Market Price" />}
            <Spacer />

            {visible == true && <Setting title="Selling Price" />}
            <Spacer />

            {visible == true && <Setting title="Price Code" />}
            <Spacer />

            {visible == true && <Setting title="Bar Code" />}
            <Spacer />

            {visible == true && <Setting title="MRP Bar Code" />}
            <Spacer />
            {visible == true && <Setting title="Action" />}
          </VStack>
        </HStack>
      </Box> */}
      {/* <Flex> */}
      {catVisible && <CategoryLadger />}
      <Box
        boxShadow="2xl"
        p="6"
        w="89%"
        h="100vh"
        ml="50px"
        mb="200px"
        sx={{ backgroundColor: "white" }}
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab sx={{ fontWeight: "bold", color: "#16134F" }}>
              Category For Ladger
            </Tab>
            <Tab sx={{ fontWeight: "bold", color: "#16134F" }}>
              Category for Product
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
    </>
  );
}

export default SettingComponent;
