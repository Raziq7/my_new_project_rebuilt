import React, { useEffect, useState } from "react";
import {
  VStack,
  Input,
  HStack,
  Spacer,
  Button,
  Divider,
  Box,
  Textarea,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
  Spinner,
  Flex,
  Select,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, editProductTake } from "../actions/productAction";
import { useNavigate } from "react-router-dom";

function EditProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [select, setSelect] = useState([]);

  //useEffect

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      navigate("/login");
    }
  }, []);

  const { showSubCategory } = useSelector((state) => {
    return state.getSubCategories;
  });

  const categoryData = useSelector((state) => {
    return state.getCategory;
  });
  let { showCategory } = categoryData;

  const { loading, editInfo, error } = useSelector((state) => {
    return state.editData;
  });
  console.log(editInfo, "+665465465465");

  const [initialState, setInitialState] = useState({
    ProductName: "",
    Description: "",
    MainCategory: "",
    SubCategory: "",
    Size: "",
    Color: "",
    GenderWear: "",
    Brand: "",
    MaterialType: "",
    MarketPrice: "",
    SellingPrice: "",
    Discount: "",
    MaxStock: "",
    MinStock: "",
    Qty: "",
    MaxStockMeter: "",
    MinStockMeter: "",
    VendorName: "",
  });

  useEffect(() => {
    if (editInfo) {
      console.log(editInfo);
      setInitialState(editInfo);
    }
  }, [editInfo]);

  useEffect(() => {
    dispatch(editProduct(id));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(editProductTake(initialState));
    navigate("/home");
  };
  return (
    <>
      <Box mb="450px" mt="auto" mr="auto" ml="auto">
        <VStack>
          <Text fontSize="40px" color="teal">
            Update Product
          </Text>
          {loading ? (
            <Spinner
              mt="200px"
              thickness="6px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            editInfo && (
              <form
                width={["444px", "444px", "444px", "444px"]}
                onSubmit={submitForm}
              >
                <Box mt="9px">
                  <HStack>
                    <Input
                      onChange={(e) => {
                        setInitialState({
                          ...initialState,
                          ProductName: e.target.value,
                        });
                      }}
                      value={initialState.ProductName}
                      name="productName"
                      placeholder="Enter The Product Name"
                    />
                  </HStack>
                  <Spacer />
                  <HStack mt="15px">
                    <Textarea
                      onChange={(e) => {
                        setInitialState({
                          ...initialState,
                          Description: e.target.value,
                        });
                      }}
                      value={initialState.Description}
                      name="description"
                      placeholder="Enter The Description"
                    />
                  </HStack>
                </Box>

                <Box
                  display={["block", "block", "block", "block", "block"]}
                  justifyContent={[
                    "center",
                    "center",
                    "center",
                    "space-between",
                    "space-between",
                  ]}
                  mt="20px"
                >
                  <HStack
                    display={["block", "block", "-ms-grid", "flex", "flex"]}
                    ml={["60px", "20px", "20px", "20px", "20px"]}
                    mr={["60px", "20px", "20px", "20px", "20px"]}
                    mt="10px"
                  >
                    <Box>
                      <Text>Main Category</Text>
                      {/* <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MainCategory: e.target.value,
                          });
                        }}
                        value={initialState.MainCategory}
                        name="proSize"
                        htmlSize={4}
                        width="auto"
                      /> */}
                      <Select
                        name="mainCategory"
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MainCategory: e.target.value,
                          });
                        }}
                        value={initialState.MainCategory}
                        placeholder="Main Category"
                      >
                        {showCategory &&
                          showCategory.map((data) => {
                            if (data.Main_Category) {
                              return data.Main_Category.map((mainCategory) => {
                                return (
                                  <option value={mainCategory}>
                                    {mainCategory}
                                  </option>
                                );
                              });
                            }
                          })}
                      </Select>
                    </Box>

                    <Spacer />

                    <Box>
                      <Text>SubCategory</Text>
                      {/* <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            SubCategory: e.target.value,
                          });
                        }}
                        value={initialState.SubCategory}
                        name="SubCategory"
                        htmlSize={4}
                        width="auto"
                      /> */}

                      <Select
                        w="auto"
                        name="subCategory"
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            SubCategory: e.target.value,
                          });
                        }}
                        value={initialState.subCategory}
                        placeholder="Product subCategory"
                      >
                        {showSubCategory &&
                          showSubCategory.map((data) => {
                            console.log(data, "5555555555555");
                            if (
                              data.categoryName === initialState.MainCategory
                            ) {
                              return data.subCategory.map((subCategory) => {
                                return (
                                  <option value={subCategory}>
                                    {subCategory}
                                  </option>
                                );
                              });
                            }
                          })}
                      </Select>
                    </Box>

                    <Spacer />

                    <Box>
                      <Text>Product Size</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            Size: e.target.value,
                          });
                        }}
                        value={initialState.Size}
                        name="Size"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>
                    <Spacer />
                    <Box>
                      <Text>Product Color</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            Color: e.target.value,
                          });
                        }}
                        value={initialState.Color}
                        name="Color"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>
                    <Spacer />
                    <Box>
                      <Text>Gender</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            GenderWear: e.target.value,
                          });
                        }}
                        value={initialState.GenderWear}
                        name="Gender"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />
                    <Box>
                      <Text>Brand</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            Brand: e.target.value,
                          });
                        }}
                        value={initialState.Brand}
                        name="Brand"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />
                    <Box>
                      <Text>Material Type</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MaterialType: e.target.value,
                          });
                        }}
                        value={initialState.MaterialType}
                        name="MaterialType"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>
                  </HStack>
                  <Center height="15px">
                    <Divider orientation="vertical" />
                  </Center>
                  <HStack
                    display={["block", "block", "-ms-grid", "flex", "flex"]}
                    ml={["60px", "20px", "20px", "20px", "20px"]}
                    mr={["60px", "20px", "20px", "20px", "20px"]}
                    mt="20px"
                  >
                    <Box>
                      <Text>Market Price</Text>
                      {/* <Input
                    name="MarketPrice"
                    onChange={(e) => {
                      setInitialState({
                        ...initialState,
                        MarketPrice: e.target.value,
                      });
                    }}
                    value={initialState.MarketPrice}
                    placeholder="MarketPrice"
                    htmlSize={4}
                    width="auto"
                  /> */}

                      <NumberInput
                        size="md"
                        maxW={105}
                        value={initialState.MarketPrice}
                      >
                        <NumberInputField
                          onChange={(e) => {
                            console.log(initialState.MarketPrice);
                            setInitialState({
                              ...initialState,
                              MarketPrice: e.target.value,
                            });
                          }}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>

                    <Spacer />

                    <Box>
                      <Text>Selling Price</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            SellingPrice: e.target.value,
                          });
                        }}
                        value={initialState.SellingPrice}
                        name="SellingPrice"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />

                    <Box>
                      <Text>Discount</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            Discount: e.target.value,
                          });
                        }}
                        value={initialState.Discount}
                        name="Size"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>
                    <Spacer />
                    <Box>
                      <Text>MaxStock</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MaxStock: e.target.value,
                          });
                        }}
                        value={initialState.MaxStock}
                        name="Color"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>
                    <Spacer />
                    <Box>
                      <Text>MinStock</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MinStock: e.target.value,
                          });
                        }}
                        value={initialState.MinStock}
                        name="MinStock"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />
                    <Box>
                      <Text>Qty</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            Qty: e.target.value,
                          });
                        }}
                        value={initialState.Qty}
                        name="Qty"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />
                    <Box>
                      <Text>MaxStock Meter</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MaxStockMeter: e.target.value,
                          });
                        }}
                        value={initialState.MaxStockMeter}
                        name="MaxStockMeter"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />

                    <Box>
                      <Text>MinStock Meter</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            MinStockMeter: e.target.value,
                          });
                        }}
                        value={initialState.MinStockMeter}
                        name="MinStockMeter"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>

                    <Spacer />
                    <Box>
                      <Text>Vendor Name</Text>
                      <Input
                        onChange={(e) => {
                          setInitialState({
                            ...initialState,
                            VendorName: e.target.value,
                          });
                        }}
                        value={initialState.VendorName}
                        name="VendorName"
                        htmlSize={4}
                        width="auto"
                      />
                    </Box>
                  </HStack>
                </Box>

                <Spacer />

                <Divider orientation="horizontal" />
                <Divider orientation="horizontal" />

                <Flex mt="15px" justifyContent="center">
                  <Button
                    color="#16134F"
                    colorScheme="blue"
                    type="submit"
                    boxShadow="sm"
                    _hover={{ boxShadow: "md" }}
                    _active={{ boxShadow: "lg" }}
                  >
                    Submit
                  </Button>

                  <Link to="/home">
                    <Button
                      ml="10px"
                      colorScheme="red"
                      boxShadow="sm"
                      _hover={{ boxShadow: "md" }}
                      _active={{ boxShadow: "lg" }}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Flex>
              </form>
            )
          )}
        </VStack>
      </Box>
    </>
  );
}

export default EditProductForm;
