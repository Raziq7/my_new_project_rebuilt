import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Stack,
  Button,
  Spacer,
  Divider,
  Image,
  Box,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, showProductAction } from "../actions/productAction";
import { useNavigate } from "react-router-dom";

function Smple() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //selector
  let productDetail = useSelector((state) => {
    return state.showProInfo;
  });
  let { loading, showProduct, error } = productDetail;

  const { deleteDetail } = useSelector((state) => {
    return state.deleteInfo;
  });

  useEffect(() => {
    if (deleteDetail) {
      console.log(deleteDetail, "deleteDetaildeleteDetail");
    }
  }, [deleteDetail]);

  useEffect(() => {
    dispatch(showProductAction());
  }, []);

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      console.log("staffExits");
      navigate("/login");
    }
  }, []);
  const editPro = () => {};

  //delete
  const deletePro = (proId) => {
    dispatch(deleteProduct(proId));
  };

  return (
    <>
      {loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <Box
          width={{
            sm: "60%",
            md: "650px",
            lg: "800px",
            xl: "70%",
          }}
          overflowY="auto"
          ml="auto"
          mr="auto"
          mb="100px"
        >
          <TableContainer>
            <Table
              variant={{
                xs: "sm",
                sm: "sm",
                md: "sm",
                lg: "sm",
                xl: "md",
              }}
            >
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Description</Th>
                  <Th>Main Category</Th>
                  <Th>Sub Category</Th>
                  <Th>Vendor Name</Th>
                  <Th>Vendor Details</Th>

                  {/* <Th>Discount Price</Th> */}
                  <Th>Size</Th>
                  <Th>Color</Th>
                  <Th>Stocks</Th>
                  <Th>Qty Type</Th>
                  <Th>Qty</Th>
                  <Th isNumeric>Market Price</Th>
                  <Th>Selling Price</Th>
                  <Th>Price Code</Th>
                  <Th>Bar Code</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              {showProduct.showProduct.map((data) => {
                console.log(data.productItemDetails, "hello");

                return (
                  <Tbody key={data._id}>
                    <Tr>
                      <Td>{data.productName}</Td>
                      <Td>{data.description}</Td>
                      <Td>{data.mainCategory}</Td>
                      <Td>{data.subCategory}</Td>
                      <Td>{data.vendorName}</Td>
                      <Td>{data.vendoreDetails}</Td>

                      {data.productItemDetails.map((details) => {
                        return (
                          <>
                            {/* <Td>{details.discountPrice}</Td> */}
                            <Td>{details.proSize}</Td>
                            <Td>{details.proColor}</Td>
                            <Td>{details.stocks}</Td>
                            <Td>{details.selectQty}</Td>
                            <Td>{details.qty}</Td>
                            <Td isNumeric>{details.marketPrice}</Td>
                            <Td>{details.sellingPrice}</Td>
                            <Td>{details.priceCode}</Td>

                            <Td>
                              <Image src={details.barcode} alt="Dan Abramov" />
                              <Button size="sm" colorScheme="teal" mt="10px">
                                Download
                              </Button>
                            </Td>
                          </>
                        );
                      })}

                      <Td>
                        <Button
                          onClick={() => {
                            editPro(data._id);
                          }}
                          colorScheme="teal"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Spacer />
                        <Divider />
                        <Button
                          onClick={() => {
                            deletePro(data._id);
                          }}
                          colorScheme="red"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                );
              })}

              <Tfoot>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Description</Th>
                  <Th>Main Category</Th>
                  <Th>Sub Category</Th>
                  <Th>Vendor Name</Th>
                  <Th>Vendor Details</Th>

                  {/* <Th>Discount Price</Th> */}
                  <Th>Size</Th>
                  <Th>Color</Th>
                  <Th>Stocks</Th>
                  <Th>Qty Type</Th>
                  <Th>Qty</Th>
                  <Th isNumeric>Market Price</Th>
                  <Th>Selling Price</Th>
                  <Th>Price Code</Th>
                  <Th>Bar Code</Th>
                  <Th>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

export default Smple;
