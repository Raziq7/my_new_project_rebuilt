import React, { useEffect } from "react";
import {
  VStack,
  Input,
  HStack,
  Stack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Divider,
  Checkbox,
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

  //useEffect
  useEffect(() => {
    if (productDetail) {
      navigate("/home");
    }
  }, [productDetail]);

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      console.log("staffExits");
      navigate("/login");
    }
  }, []);

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
      order: "",
      country: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
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

          {/* <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme="blue">
              MenuItem
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
                <MenuItemOption
                  onChange={formik.handleChange}
                  value={formik.values.ass}
                >
                  Ascending
                </MenuItemOption>
                <MenuItemOption
                  onChange={formik.handleChange}
                  value={formik.values.dss}
                >
                  Descending
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup
                onChange={formik.handleChange}
                values={formik.values.country}
                title="Country"
                type="checkbox"
              >
                <MenuItemOption
                  onClick={(e) => {
                    console.log("jhikgku");
                  }}
                  value="email"
                >
                  Email
                </MenuItemOption>
                <MenuItemOption value="phone">Phone</MenuItemOption>
                <MenuItemOption value="country">Country</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu> */}
          {/* <Stack spacing={10} direction="row">
            <Checkbox colorScheme="red" defaultIsChecked>
              Checkbox
            </Checkbox>
            <Checkbox colorScheme="green" defaultIsChecked>
              Checkbox
            </Checkbox>
          </Stack> */}
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
