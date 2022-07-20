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
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  getShowCategory,
  getSubCategory,
} from "../actions/productAction";
import { Link, useNavigate } from "react-router-dom";

function Test() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productData = useSelector((state) => {
    return state.productDetails;
  });
  const { loding, productDetail, error } = productData;

  const { showSubCategory } = useSelector((state) => {
    return state.getSubCategories;
  });

  //useEffect

  useEffect(() => {
    dispatch(getSubCategory());
  }, []);

  useEffect(() => {
    if (productDetail) {
    }
  }, [productDetail]);

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(getShowCategory());
  }, []);

  const categoryData = useSelector((state) => {
    return state.getCategory;
  });
  let { loading, showCategory } = categoryData;

  const [select, setSelect] = useState([]);
  const [proSize, setProSize] = useState("");
  const [proColor, setProColor] = useState("");
  const [qty, setQty] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [sellingPrice, setSellPrice] = useState("");
  const [selectQty, setSelectQty] = useState("");
  const [stocks, setStocks] = useState("");
  const [MaxQty, setMaxQty] = useState("");
  const [MinQty, setMinQty] = useState("");
  const [checkMeter, setCheckMetet] = useState(null);
  const [Error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      category: "",
      mainCategory: "",
      subCategory: "",
      brand: "",
      meterial: "",
      vendorName: "",
      vendoreDetails: "",
      select: [],
    },
    onSubmit: (values) => {
      values.select = select;
      // alert(JSON.stringify(values, null, 2));
      dispatch(addProductAction(values));
      navigate("/home");
    },
  });

  const TableSubmit = (e) => {
    e.preventDefault();
    if (MaxQty < stocks) {
      setError(true);
    } else {
      let obj = {
        proSize: proSize,
        proColor: proColor,
        qty: qty,
        marketPrice: marketPrice,
        sellingPrice: sellingPrice,
        selectQty: selectQty,
        stocks: stocks,
        MaxQty: MaxQty,
        MinQty: MinQty,
      };

      setSelect([...select, obj]);
      setError(false);
    }
  };
  const bg = useColorModeValue("white", "dark");
  return (
    <Box ml="50px" mt="5px" mb="auto">
      <Center>
        <Text fontSize="40px" color="teal">
          Upload Product Manually
        </Text>
      </Center>
      <VStack
        rounded="lg"
        boxShadow="2xl"
        backgroundColor={bg}
        width={["auto", "auto", "90%", "100%", "100%"]}
        height="700px"
        ml="40px"
        mt="5px"
        mb="auto"
      >
        <form
          style={{ marginTop: "40px" }}
          width={["444px", "444px", "444px", "100%", "100%"]}
          display={["444px", "444px", "444px", "100%", "100%"]}
          onSubmit={formik.handleSubmit}
        >
          <Box mt="9px">
            <Text>Enter The Product Name</Text>
            <Input
              onChange={formik.handleChange}
              value={formik.values.productName}
              name="productName"
              placeholder="Enter The Product Name"
            />
            <Spacer />
            <Text mt="9px">Enter The Description</Text>
            <Textarea
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              placeholder="Enter The Description"
            />
          </Box>

          <Box
            display={["block", "block", "block", "block", "flex"]}
            justifyContent="space-around"
            mt="20px"
          >
            {Error && (
              <Text color="red">
                Max Quantity Please Enter Greater than Total Stock
              </Text>
            )}
            <Box>
              <Text width="100px">Product Size</Text>
              <Select
                w={{
                  sm: "200px",
                  md: "auto",
                  lg: "auto",
                  xl: "auto",
                }}
                name="proSize"
                placeholder="The Size"
                onChange={(e) => {
                  setProSize(e.target.value);
                }}
              >
                {showCategory &&
                  showCategory.map((data) => {
                    if (data.size) {
                      return data.size.map((size) => {
                        return <option value={size}>{size}</option>;
                      });
                    }
                  })}
              </Select>
            </Box>

            <Box>
              <Text ml="10px" width="100px">
                Product Color
              </Text>

              <Select
                w={{
                  sm: "200px",
                  md: "auto",
                  lg: "auto",
                  xl: "auto",
                }}
                ml="10px"
                name="proColor"
                placeholder="The Color"
                onChange={(e) => {
                  setProColor(e.target.value);
                }}
              >
                {showCategory &&
                  showCategory.map((data) => {
                    if (data.color) {
                      return data.color.map((color) => {
                        return <option value={color}>{color}</option>;
                      });
                    }
                  })}
              </Select>
            </Box>

            <Box>
              <Text ml="10px" width="100px">
                Product Qty
              </Text>
              <Select
                mb="10px"
                name="qty"
                onChange={(e) => {
                  setSelectQty(e.target.value);
                  setCheckMetet(e.target.value);
                }}
                ml="10px"
                placeholder="Select Qty"
              >
                <option value="Meters">Meters</option>
                <option value="Pieces">Pieces</option>
              </Select>
            </Box>

            <Box>
              <Text ml="10px" width="100px">
                {" "}
                Discount
              </Text>
              <Input
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                name="qty"
                htmlSize={4}
                width="80px"
                type="number"
                ml="15px"
              />
            </Box>

            <Box>
              <Text width="100px">
                {checkMeter == "Meters"
                  ? "Per Meter. Market Price"
                  : "Market Price"}
              </Text>
              <Input
                onChange={(e) => {
                  setMarketPrice(e.target.value);
                }}
                name="marketPrice"
                type="number"
                htmlSize={4}
                width="80px"
              />
            </Box>

            <Box>
              <Text width="100px">
                {checkMeter == "Meters"
                  ? "Per Meter. Selling Price"
                  : "Selling Price"}
              </Text>
              <Input
                onChange={(e) => {
                  setSellPrice(e.target.value);
                }}
                name="sellPrice"
                htmlSize={4}
                type="number"
                width="80px"
              />
            </Box>

            <Box>
              <Text width="100px">Total Stocks</Text>
              <Input
                onChange={(e) => {
                  setStocks(e.target.value);
                }}
                name="stocks"
                htmlSize={4}
                width="auto"
                type="number"
              />
            </Box>

            <Box>
              <Text width="100px">Max Qty</Text>
              <Input
                onChange={(e) => {
                  setMaxQty(e.target.value);
                }}
                name="MaxQty"
                htmlSize={4}
                width="auto"
                type="number"
              />
            </Box>
            <Box>
              <Text width="100px">Min Qty</Text>
              <Input
                onChange={(e) => {
                  setMinQty(e.target.value);
                }}
                name="MinQty"
                htmlSize={4}
                width="auto"
              />
            </Box>
            <VStack>
              <Button
                type="submit"
                ml="5px"
                mt="20px"
                colorScheme="teal"
                size="sm"
                onClick={TableSubmit}
              >
                Add
              </Button>
            </VStack>
          </Box>

          <Box
            width={["65%", "60%", "650px", "800px", "900px"]}
            overflowY="auto"
            mt="10px"
          >
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Product Size</Th>
                    <Th>Product Color</Th>
                    <Th isNumeric>Product Qty</Th>
                    <Th isNumeric> Market Price</Th>
                    <Th isNumeric>Selling Price</Th>
                    <Th isNumeric>Total Stock</Th>
                    <Th isNumeric>Max Qty</Th>
                    <Th isNumeric>Min Qty</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {select.map((value) => {
                    return (
                      <Tr>
                        <Td>{value.proSize}</Td>
                        <Td>{value.proColor}</Td>
                        <Td>{value.qty}</Td>
                        <Td isNumeric>{value.marketPrice}</Td>
                        <Td isNumeric>{value.sellingPrice}</Td>
                        <Td isNumeric>{value.stocks}</Td>
                        <Td isNumeric>{value.MaxQty}</Td>
                        <Td isNumeric>{value.MinQty}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Product Size</Th>
                    <Th>Product Color</Th>
                    <Th isNumeric>Product Qty</Th>
                    <Th isNumeric> Market Price</Th>
                    <Th isNumeric>Selling Price</Th>
                    <Th isNumeric>Total Stock</Th>
                    <Th isNumeric>Max Qty</Th>
                    <Th isNumeric>Min Qty</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>

          <Box
            display={{
              sm: "revert",
              md: "block",
              lg: "block",
              xl: "flex",
            }}
            justifyContent={{
              sm: "center",
              md: "space-between",
              lg: "space-between",
              xl: "space-between",
            }}
            mt="15px"
            mb="15px"
          >
            <Box>
              <Select
                w={{
                  sm: "200px",
                  md: "auto",
                  lg: "auto",
                  xl: "auto",
                }}
                name="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
                placeholder="The brand"
              >
                {showCategory &&
                  showCategory.map((data) => {
                    if (data.Brand) {
                      return data.Brand.map((brand) => {
                        return <option value={brand}>{brand}</option>;
                      });
                    }
                  })}
              </Select>
            </Box>

            <Box>
              <Select
                name="meterial"
                onChange={formik.handleChange}
                value={formik.values.meterial}
                placeholder="Product Meterial"
              >
                {showCategory &&
                  showCategory.map((data) => {
                    if (data.material) {
                      return data.material.map((meterial) => {
                        return <option value={meterial}>{meterial}</option>;
                      });
                    }
                  })}
              </Select>
            </Box>

            <Box>
              <Select
                name="mainCategory"
                onChange={formik.handleChange}
                value={formik.values.mainCategory}
                placeholder="Main Category"
              >
                {showSubCategory &&
                  showSubCategory.map((data) => {
                    return (
                      <option value={data.categoryName}>
                        {data.categoryName}
                      </option>
                    );
                  })}
              </Select>
            </Box>

            <Box>
              <Select
                w="auto"
                name="subCategory"
                onChange={formik.handleChange}
                value={formik.values.subCategory}
                placeholder="Product subCategory"
              >
                {showSubCategory &&
                  showSubCategory.map((data) => {
                    if (data.categoryName == formik.values.mainCategory) {
                      return data.subCategory.map((subCategory) => {
                        return (
                          <option value={subCategory}>{subCategory}</option>
                        );
                      });
                    }
                  })}
              </Select>
            </Box>

            <Box>
              <Select
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                placeholder="Gender Category"
              >
                {showCategory &&
                  showCategory.map((data) => {
                    if (data.Gender_Category) {
                      return data.Gender_Category.map((GenderCategory) => {
                        return (
                          <option value={GenderCategory}>
                            {GenderCategory}
                          </option>
                        );
                      });
                    }
                  })}
              </Select>
            </Box>
          </Box>

          <Box
            display={{
              sm: "block",
              md: "block",
              lg: "block",
              xl: "block",
            }}
          >
            {/* <Input
            mt="10px"
            onChange={formik.handleChange}
            value={formik.values.vendorName}
            name="vendorName"
            placeholder="Enter The Vendor Name"
          /> */}

            <Select
              name="vendorName"
              onChange={formik.handleChange}
              value={formik.values.vendorName}
              placeholder="The Vendor Name"
            >
              {showCategory &&
                showCategory.map((data) => {
                  if (data.Vendor_Details) {
                    return data.Vendor_Details.map((Vendor) => {
                      return <option value={Vendor}>{Vendor}</option>;
                    });
                  }
                })}
            </Select>
          </Box>

          <Spacer />

          <Divider />
          <HStack mt="5px" ml="360px">
            <Button
              type="submit"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _active={{ boxShadow: "lg" }}
              bg="blue.500"
            >
              Submit!!
            </Button>
            <Link to="/addproduct">
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
            </Link>
          </HStack>
        </form>
      </VStack>
    </Box>
  );
}

export default Test;
