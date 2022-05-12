import { Box, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ProductManageColomnHideAndVisible } from "../actions/SettingAction";

function Setting({ title }) {
  const [value, setValue] = useState();

  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (typeof e === "string") {
      if (e.toLowerCase() === "true") {
        console.log("true");
        setValue(true);
      }
      if (e.toLowerCase() === "false") {
        console.log("false");
        setValue(false);
      }
    }
    // console.log(value);
    dispatch(ProductManageColomnHideAndVisible(value, title));
  };

  return (
    <Box overflowY="auto" mb="auto" mt="50px" ml="auto" mr="auto">
      <RadioGroup onChange={handleChange} value={value}>
        <Text>{title}</Text>
        <Stack direction="row">
          <Radio value={true}>Visible</Radio>
          <Radio value={false}>Hide</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
}

export default Setting;