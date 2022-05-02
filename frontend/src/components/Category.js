import React, { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  ButtonGroup,
  Button,
  VStack,
} from "@chakra-ui/react";
import CategoryForm from "../screen/CategoryForm";
// import { useSelector } from "react-redux";
function Category() {
  const [mode, setMode] = useState(null);

  return (
    <>
      <VStack mb="600px" ml="auto" mr="auto">
        <Box p="2" ml="100px">
          <Heading size="md">Categories</Heading>
        </Box>
        <Spacer />
        <Flex direction={["column", "column", "row"]}>
          <ButtonGroup ml="50px" gap="2">
            <Button
              colorScheme="teal"
              onClick={() => {
                setMode("size");
              }}
            >
              Size
            </Button>
            <Button
              onClick={() => {
                setMode("color");
              }}
              colorScheme="teal"
            >
              color
            </Button>
            <Button
              onClick={() => {
                setMode("material");
              }}
              colorScheme="teal"
            >
              Material
            </Button>
            <Button
              onClick={() => {
                setMode("Vendor_Details");
              }}
              colorScheme="teal"
            >
              Vendor Details
            </Button>
            <Button
              onClick={() => {
                setMode("subcategory");
              }}
              colorScheme="teal"
            >
              Subcategory{" "}
            </Button>
            <Button
              onClick={() => {
                setMode("Main_Category");
              }}
              colorScheme="teal"
            >
              Main Category
            </Button>
            <Button
              onClick={() => {
                setMode("Gender_Category");
              }}
              colorScheme="teal"
            >
              Gender Category
            </Button>
          </ButtonGroup>
        </Flex>

        <CategoryForm mode={mode} />
      </VStack>
    </>
  );
}

export default Category;