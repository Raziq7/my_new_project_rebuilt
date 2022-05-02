import React, { useEffect, useState } from "react";
import {
  VStack,
  Input,
  HStack,
  Stack,
  Spacer,
  Button,
  Divider,
  Checkbox,
  Center,
  Flex,
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
  Container,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction, getShowCategory } from "../actions/productAction";
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
  };
  return (
    <VStack width={["auto", "auto", "90%", "90%", "90%"]} mb="auto">
      <Text fontSize="40px" color="teal">
        Add Product
      </Text>
      <form
        width={["444px", "444px", "444px", "100%", "100%"]}
        display={["444px", "444px", "444px", "100%", "100%"]}
        onSubmit={formik.handleSubmit}
      >
        <Box mt="9px">
          <HStack>
            <Input
              onChange={formik.handleChange}
              value={formik.values.productName}
              name="productName"
              placeholder="Enter The Product Name"
            />
          </HStack>
          <Spacer />
          <HStack mt="9px">
            <Textarea
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              placeholder="Enter The Description"
            />
          </HStack>
        </Box>

        <Box
          display={["block", "block", "block", "block", "flex"]}
          justifyContent={[
            "center",
            "center",
            "center",
            "space-between",
            "space-between",
          ]}
          mt="20px"
        >
          <Box>
            <Text>Product Size</Text>
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
            <Text>Product Color</Text>

            <Select
              w={{
                sm: "200px",
                md: "auto",
                lg: "auto",
                xl: "auto",
              }}
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
            <Text>Product Qty</Text>
            <Select
              mb="10px"
              name="qty"
              onChange={(e) => {
                setSelectQty(e.target.value);
                setCheckMetet(e.target.value);
              }}
              placeholder="Select Qty"
            >
              <option value="Meters">Meters</option>
              <option value="Pieces">Pieces</option>
            </Select>
          </Box>

          <Box>
            <Text> .</Text>
            <Input
              onChange={(e) => {
                setQty(e.target.value);
              }}
              name="qty"
              htmlSize={4}
              width="80px"
              type="number"
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
            <Text>Total Stocks</Text>
            <Input
              onChange={(e) => {
                setStocks(e.target.value);
              }}
              name="stocks"
              htmlSize={4}
              width="auto"
            />
          </Box>

          <Box>
            <Text>Max Qty</Text>
            <Input
              onChange={(e) => {
                setMaxQty(e.target.value);
              }}
              name="MaxQty"
              htmlSize={4}
              width="auto"
            />
          </Box>
          <Box>
            <Text>Min Qty</Text>
            <Input
              onChange={(e) => {
                setMinQty(e.target.value);
              }}
              name="MinQty"
              htmlSize={4}
              width="auto"
            />
          </Box>

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
          mt="10px"
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
              <option value="Levise">Levise</option>
              <option value="Allensolly">Allensolly</option>
              <option value="GUCCI">GUCCI</option>
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
              {showCategory &&
                showCategory.map((data) => {
                  if (data.Main_Category) {
                    return data.Main_Category.map((mainCategory) => {
                      return (
                        <option value={mainCategory}>{mainCategory}</option>
                      );
                    });
                  }
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
              {showCategory &&
                showCategory.map((data) => {
                  if (data.subcategory) {
                    return data.subcategory.map((subCategory) => {
                      return <option value={subCategory}>{subCategory}</option>;
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
                        <option value={GenderCategory}>{GenderCategory}</option>
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

          {/* <Textarea
            mt="10px"
            name="vendoreDetails"
            onChange={formik.handleChange}
            value={formik.values.vendoreDetails}
            placeholder="Enter The Product Vendor Details"
          /> */}
        </Box>

        <Spacer />

        <Divider />
        <VStack mt="5px">
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
  );
}

export default AddProduct;
