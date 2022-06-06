import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import CategoryLadger from "../screen/CategoryLadger";
import Setting from "../screen/Setting";

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
      <Flex>
        <Box
          boxShadow="xl"
          p="6"
          rounded="md"
          bg="teal.300"
          w="150px"
          h="90px"
          mb="700px"
          ml="50px"
          onClick={() => {
            setVisible(false);
            setCatVisible(true);
            setVisibleColumn(false);
          }}
        >
          Category
        </Box>
        {catVisible && <CategoryLadger />}
        <Box
          boxShadow="xl"
          p="6"
          rounded="md"
          bg="teal.300"
          w="150px"
          h="90px"
          ml="50px"
          onClick={() => {
            setVisibleColumn(true);
            setCatVisible(false);
          }}
        >
          Column Visible
        </Box>
        {
          <Box overflowY="auto" mb="auto" mt="50px" ml="100px">
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
                {visibleColumn && <Text>ProductManage</Text>}
              </Box>
              <VStack>
                {visible == true && <Setting title="ProductName" />}
                <Spacer />
                {visible == true && <Setting title="Description" />}
                <Spacer />

                {visible == true && <Setting title="MainCategory" />}
                <Spacer />

                {visible == true && <Setting title="SubCategory" />}
                <Spacer />

                {visible == true && <Setting title="VendorName" />}
                <Spacer />

                {visible == true && <Setting title="Size" />}
                <Spacer />

                {visible == true && <Setting title="Color" />}
                <Spacer />

                {visible == true && <Setting title="Stocks" />}
                <Spacer />

                {visible == true && <Setting title="MaterialType" />}
                <Spacer />

                {visible == true && <Setting title="MarketPrice" />}
                <Spacer />

                {visible == true && <Setting title="SellingPrice" />}
                <Spacer />

                {visible == true && <Setting title="PriceCode" />}
                <Spacer />

                {visible == true && <Setting title="BarCode" />}
                <Spacer />

                {visible == true && <Setting title="MRPBarCode" />}
                <Spacer />
                {visible == true && <Setting title="Action" />}
              </VStack>
            </HStack>
          </Box>
        }
      </Flex>
    </>
  );
}

export default SettingComponent;
