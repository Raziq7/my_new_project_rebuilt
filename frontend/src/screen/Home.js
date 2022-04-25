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
  Text,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneProduct,
  deleteProduct,
  showProductAction,
} from "../actions/productAction";
import { useNavigate } from "react-router-dom";
import useSocket from "../CustomHook/useSocket";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //socket io
  const socket = useSocket((socket) => {
    socket.on("user", (data) => {
      console.log(data, "hsjhdfjhsdfhsfjhsjdh");
      dispatch(addOneProduct(data));
    });
    socket.on("connect_error", (data) => {
      console.log(data, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    });
  });

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
        <Box overflowY="auto">
          <Center fontSize="40px" color="teal">
            Products
          </Center>
          <TableContainer
            ml="auto"
            mr="auto"
            width={{
              sm: "60%",
              md: "650px",
              lg: "800px",
              xl: "70%",
            }}
          >
            <Table variant="simple">
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

export default Home;
