import React, { useEffect } from "react";
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
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction } from "../actions/productAction";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => {
    return state.productDetails;
  });
  const { loding, productDetail, error } = productData;
  useEffect(() => {
    if (productDetail) {
      navigate("/home");
    }
  }, [productDetail]);

  console.log(productData, "----009888888");
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      category: "",
      mainCategory: "",
      subCategory: "",
      brand: "",
      size: "",
      color: "",
      marketPrice: "",
      sellingPrice: "",
      discountPrice: "",
      stocks: "",
      vendorCode: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(addProductAction(values));
    },
  });
  return (
    <Stack spacing={4}>
      <VStack>
        <form onSubmit={formik.handleSubmit}>
          <HStack mt="10">
            <Input
              onChange={formik.handleChange}
              value={formik.values.productName}
              name="productName"
              placeholder="Enter The Product Name"
              w="50%"
              ml="20"
            />

            <Spacer />

            <Input
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              placeholder="Enter The Description"
              w="50%"
              pr="40"
            />
          </HStack>

          <HStack mt="10">
            <Input
              onChange={formik.handleChange}
              value={formik.values.category}
              name="category"
              placeholder="Enter The Product category"
              w="50%"
              ml="20"
            />

            <Spacer />

            <Input
              onChange={formik.handleChange}
              value={formik.values.mainCategory}
              name="mainCategory"
              placeholder="Enter The mainCategory"
              w="50%"
              pr="40"
            />
          </HStack>

          <HStack mt="10">
            <Input
              onChange={formik.handleChange}
              value={formik.values.subCategory}
              name="subCategory"
              placeholder="Enter The Product subCategory"
              w="50%"
              ml="20"
            />

            <Spacer />

            <Input
              onChange={formik.handleChange}
              value={formik.values.brand}
              name="brand"
              placeholder="Enter The brand"
              w="50%"
              pr="40"
            />
          </HStack>

          <HStack mt="10">
            <Input
              onChange={formik.handleChange}
              value={formik.values.size}
              name="size"
              placeholder="Enter The Product size"
              w="50%"
              ml="20"
            />

            <Spacer />

            <Input
              onChange={formik.handleChange}
              value={formik.values.color}
              name="color"
              placeholder="Enter The color"
              w="50%"
              pr="40"
            />
          </HStack>

          <HStack mt="10">
            <Input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.marketPrice}
              name="marketPrice"
              placeholder="Enter The Product marketPrice"
              w="50%"
              ml="20"
            />

            <Spacer />

            <Input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.sellingPrice}
              name="sellingPrice"
              placeholder="Enter The sellingPrice"
              w="50%"
              pr="40"
            />
          </HStack>

          <HStack mt="10">
            <Input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.discountPrice}
              name="discountPrice"
              placeholder="Enter The Product discountPrice"
              w="50%"
              ml="20"
            />

            <Spacer />

            <Input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.stocks}
              name="stocks"
              placeholder="Enter The stocks"
              w="50%"
              pr="40"
            />
          </HStack>

          <Spacer />

          <VStack mt="10">
            <Input
              onChange={formik.handleChange}
              value={formik.values.vendorCode}
              name="vendorCode"
              placeholder="Enter The Product vendorCode"
              w="50%"
              ml="20"
            />

            <Spacer />
          </VStack>

          <Stack spacing={4}>
            <MultiSelectMenu
              label="Animals"
              options={["Bat", "Tiger", "Lion"]}
            />
            <MultiSelectMenu
              label="Fruits"
              options={[
                "Apple",
                "Banana",
                "Orange",
                "Pineapple",
                "Pomegranate",
                "Watermelon",
                "Kiwi",
                "Peach",
                "Papaya",
                "Dragonfruit",
                "Cantaloupe",
                "Musk Melon",
                "Grapefruit",
                "Durian",
                "Mango",
                "Pear",
                "Raspberry",
              ]}
            />
          </Stack>
          <Divider />
          <VStack mt="5">
            <Button
              type="submit"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _active={{ boxShadow: "lg" }}
            >
              Submit!!
            </Button>
          </VStack>
        </form>
      </VStack>
    </Stack>
  );
}

export default AddProduct;
