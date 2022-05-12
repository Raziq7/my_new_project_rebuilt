import { Box, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Setting from "../screen/Setting";

function SettingComponent() {
  const [visible, setVisible] = useState(false);
  return (
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
    </Box>
  );
}

export default SettingComponent;
