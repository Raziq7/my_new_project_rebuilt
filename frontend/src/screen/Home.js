import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Button,
  Spacer,
  Divider,
  Image,
  Box,
  Center,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneProduct,
  deleteProduct,
  downloadBarCode,
  showProductAction,
} from "../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import useSocket from "../CustomHook/useSocket";
import { Link as ReachLink } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  //socket io
  const socket = useSocket((socket) => {
    socket.on("user", (data) => {
      dispatch(addOneProduct(data));
    });
    socket.on("deletePro", (data) => {
      dispatch(deleteProduct(data._id));
    });
    socket.on("updatePro", (data) => {
      dispatch(showProductAction());
    });
    socket.on("connect_error", (data) => {});
  });

  //selector
  let productDetail = useSelector((state) => {
    return state.showProInfo;
  });
  let { loading, showProduct, error } = productDetail;

  const { deleteDetail } = useSelector((state) => {
    return state.deleteInfo;
  });

  const { editSuccess } = useSelector((state) => {
    return state.editSuccess;
  });

  const { download } = useSelector((state) => {
    return state.downloadBarCode;
  });
  console.log(download, "download");
  // const { columnHideAndVisible } = useSelector((state) => {
  //   return state.ProductManageColomnHideAndVisible;
  // });

  let columnExist;

  columnExist = localStorage.getItem("productColumn")
    ? JSON.parse(localStorage.getItem("productColumn"))
    : { id: true, name: "null" };

  useEffect(() => {
    if (download) {
      toast({
        title: "Download Success.",
        description: "Barcode Downloaded Successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [download]);

  useEffect(() => {
    console.log(columnExist, "*****************");

    if (!columnExist) {
      columnExist.id = true;
    }
  }, []);

  useEffect(() => {
    if (editSuccess) {
    }
  }, [editSuccess]);

  useEffect(() => {
    dispatch(showProductAction());
  }, [deleteDetail]);

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      navigate("/login");
    }
  }, []);
  const editPro = async (proId) => {
    navigate(`/editProduct/${proId}`);
  };

  //delete
  const deletePro = (proId) => {
    dispatch(deleteProduct(proId));
  };

  //downloadClick
  const downloadClick = (id) => {
    dispatch(downloadBarCode(id));
  };

  const columns = [
    {
      column_name: "Product Name",

      enabled: columnExist.name == "Product Name" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Description",
      enabled: columnExist.name == "Description" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Main Category",
      enabled: columnExist.name == "Main Category" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Sub Category",
      enabled: columnExist.name == "Sub Category" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Vendor Name",
      enabled: columnExist.name == "Vendor Name" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Size",
      enabled: columnExist.name == "Size" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Color",
      enabled: columnExist.name == "Color" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Stocks",
      enabled: columnExist.name == "Stocks" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Qty Type",
      enabled: columnExist.name == "Qty Type" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Qty",
      enabled: columnExist.name == "Qty" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Market Price",
      enabled: columnExist.name == "Market Price" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Selling Price",
      enabled: columnExist.name == "Selling Price" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Price Code",
      enabled: columnExist.name == "Price Code" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Bar Code",
      enabled: columnExist.name == "Bar Code" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "MRP Bar Code",
      enabled: columnExist.name == "MRP Bar Code" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Action",
      enabled: columnExist.name == "Action" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
  ];

  return (
    <>
      <Box overflowY="auto" mb="auto">
        <Center fontSize="40px" color="teal">
          Products
        </Center>
        {loading ? (
          <HStack>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
              <div>won't be visible</div>
            </Skeleton>
          </HStack>
        ) : (
          <>
            <Link
              style={{ textDecoration: "none" }}
              as={ReachLink}
              to="/addproduct"
            >
              <Button left="60%">Add Product</Button>
            </Link>
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
                <TableCaption>Ukkens Vasthralay Product Details</TableCaption>
                <Thead>
                  <Tr>
                    {columns.map((item) => {
                      if (item.enabled) {
                        return <Th> {item.column_name} </Th>;
                      }
                    })}
                  </Tr>
                </Thead>
                {showProduct.showProduct.map((data) => {
                  return (
                    <Tbody key={data._id}>
                      <Tr>
                        {columnExist.name == "Product Name" &&
                        !columnExist.status ? null : (
                          <Td>{data.productName}</Td>
                        )}

                        {columnExist.name == "Description" ? null : (
                          <Td>{data.description}</Td>
                        )}

                        {columnExist.name == "Main Category" ? null : (
                          <Td>{data.mainCategory}</Td>
                        )}

                        {columnExist.name == "Sub Category" ? null : (
                          <Td>{data.subCategory}</Td>
                        )}

                        {columnExist.name == "Vendor Name" ? null : (
                          <Td>{data.vendorName}</Td>
                        )}

                        {data.productItemDetails.map((details) => {
                          return (
                            <>
                              {columnExist.name == "Size" ? null : (
                                <Td>{details.proSize}</Td>
                              )}

                              {columnExist.name == "Color" ? null : (
                                <Td>{details.proColor}</Td>
                              )}

                              {columnExist.name == "Stocks" ? null : (
                                <Td>{details.stocks}</Td>
                              )}

                              {columnExist.name == "Qty Type" ? null : (
                                <Td>{details.selectQty}</Td>
                              )}

                              {columnExist.name == "Qty" ? null : (
                                <Td>{details.qty}</Td>
                              )}

                              {columnExist.name == "Market Price" ? null : (
                                <Td isNumeric>{details.marketPrice}</Td>
                              )}

                              {columnExist.name == "Selling Price" ? null : (
                                <Td>{details.sellingPrice}</Td>
                              )}

                              {columnExist.name == "Price Code" ? null : (
                                <Td>{details.priceCode}</Td>
                              )}

                              {columnExist.name == "Bar Code" ? null : (
                                <Td>
                                  <Image
                                    src={details.barcodeUrl}
                                    alt="Bar Code"
                                  />
                                  <Button
                                    size="sm"
                                    colorScheme="teal"
                                    mt="10px"
                                    onClick={() => {
                                      downloadClick(data._id);
                                    }}
                                  >
                                    Download
                                  </Button>
                                </Td>
                              )}

                              {columnExist.name == "MRP Bar Code" ? null : (
                                <Td>
                                  <Image
                                    src={details.mrpBarCodeUrl}
                                    alt="MRP Barcode"
                                  />
                                  <Button
                                    size="sm"
                                    colorScheme="teal"
                                    mt="10px"
                                  >
                                    Download
                                  </Button>
                                </Td>
                              )}
                            </>
                          );
                        })}
                        {columnExist.name == "Action" ? null : (
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
                        )}
                      </Tr>
                    </Tbody>
                  );
                })}
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </>
  );
}

export default Home;
