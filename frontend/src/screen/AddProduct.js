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
      navigate("/login");
    }
  }, []);
  const [select, setSelect] = useState([]);
  const [proSize, setProSize] = useState("");
  const [proColor, setProColor] = useState("");
  const [qty, setQty] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [sellingPrice, setSellPrice] = useState("");
  const [selectQty, setSelectQty] = useState("");
  const [stocks, setStocks] = useState("");
  const [priceCode, setPriceCode] = useState("");

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
      alert(JSON.stringify(values, null, 2));
      dispatch(addProductAction(values));
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
      priceCode: priceCode,
    };

    setSelect([...select, obj]);
  };
  return (
    <VStack width={["auto", "auto", "90%", "90%", "90%"]}>
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
            <Input
              onChange={(e) => {
                setProSize(e.target.value);
              }}
              name="proSize"
              htmlSize={4}
              width="auto"
            />
          </Box>

          <Box>
            <Text>Product Color</Text>
            <Input
              onChange={(e) => {
                setProColor(e.target.value);
              }}
              name="proColor"
              htmlSize={4}
              width="auto"
            />
          </Box>

          <Box>
            <Text>Product Qty</Text>
            <Select
              mb="10px"
              name="qty"
              onChange={(e) => {
                setSelectQty(e.target.value);
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
              width="auto"
            />
          </Box>

          <Box>
            <Text>Market Price</Text>
            <Input
              onChange={(e) => {
                setMarketPrice(e.target.value);
              }}
              name="marketPrice"
              htmlSize={4}
              width="auto"
            />
          </Box>

          <Box>
            <Text>Selling Price</Text>
            <Input
              onChange={(e) => {
                setSellPrice(e.target.value);
              }}
              name="sellPrice"
              htmlSize={4}
              width="auto"
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
            <Text>Price Code</Text>
            <Input
              onChange={(e) => {
                setPriceCode(e.target.value);
              }}
              name="priceCode"
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
                  <Th isNumeric>Price Code</Th>
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
                      <Td isNumeric>{value.priceCode}</Td>
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
                  <Th isNumeric>Price Code</Th>
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
              <option value="Cotton">Cotton</option>
              <option value="Silk">Silk</option>
              <option value="Fabrics">Fabrics</option>
            </Select>
          </Box>

          <Box>
            <Select
              name="mainCategory"
              onChange={formik.handleChange}
              value={formik.values.mainCategory}
              placeholder="Main Category"
            >
              <option value="TopWear">Top Wear</option>
              <option value="BottomWear">Bottom Wear</option>
              <option value="Linean">Linean</option>
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
              <option value="Tshirt">T-Shirt</option>
              <option value="shirt">Shirt</option>
              <option value="uniform">Uniform</option>
            </Select>
          </Box>

          <Box>
            <Select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              placeholder="Gender Category"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
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
          <Input
            mt="10px"
            onChange={formik.handleChange}
            value={formik.values.vendorName}
            name="vendorName"
            placeholder="Enter The Vendor Name"
          />

          <Textarea
            mt="10px"
            name="vendoreDetails"
            onChange={formik.handleChange}
            value={formik.values.vendoreDetails}
            placeholder="Enter The Product Vendor Details"
          />
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
