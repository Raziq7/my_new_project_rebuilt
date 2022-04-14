import React from "react";
import {
  VStack,
  Input,
  HStack,
  Stack,
  Spacer,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";

function AddProduct() {
  return (
    <Stack spacing={4}>
      <VStack>
        <HStack mt="10">
          <Input placeholder="Enter The Product Name" w="50%" ml="20" />

          <Spacer />

          <Input placeholder="Enter The Description" w="50%" pr="40" />
        </HStack>
        <HStack mt="10">
          <Select placeholder="Select category">
            <option value="option1">Men</option>
            <option value="option2">Women</option>
          </Select>

          <Spacer />

          <Select placeholder="Main Category">
            <option value="option2">Top Wear</option>
            <option value="option3">Bottom Wear</option>
          </Select>

          <Spacer />

          <Select placeholder="Sub Category">
            <option value="option1">Tshirts</option>
            <option value="option2">Shirts</option>
            <option value="option3"> Pants</option>
          </Select>
        </HStack>

        <HStack mt="10">
          <Select placeholder="Select Brand">
            <option value="option1">Levis</option>
            <option value="option2">Parx</option>
          </Select>

          <Spacer />

          <Select placeholder="Size">
            <option value="option2">SM</option>
            <option value="option3">MD</option>
            <option value="option3">LG</option>
            <option value="option3">XL</option>
            <option value="option3">XXL</option>
          </Select>

          <Spacer />

          <Select placeholder="color">
            <option value="option1">Blue</option>
            <option value="option2">Red</option>
            <option value="option3">Yello</option>
          </Select>
        </HStack>
        <HStack>
          <VStack>
            <Text>Market Price</Text>
            <NumberInput size="lg" maxW={32} defaultValue={15} min={10}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>

          <Spacer />

          <VStack>
            <Text>Selling Price</Text>
            <NumberInput size="lg" maxW={32} defaultValue={15} min={10}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>

          <Spacer />
          <VStack>
            <Text>Discount Price</Text>
            <NumberInput size="lg" maxW={32} defaultValue={15} min={10}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
        </HStack>
        <HStack mt="10">
          <Input placeholder="Enter The Product Stocks" w="50%" ml="20" />

          <Spacer />

          <Input placeholder="Enter The Vendor Code" w="50%" pr="40" />
        </HStack>
        <Divider />
        <Button
          type="submit"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
          _active={{ boxShadow: "lg" }}
        >
          Submit!!
        </Button>
      </VStack>
    </Stack>
  );
}

export default AddProduct;
