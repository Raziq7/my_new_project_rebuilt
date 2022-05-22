import React, { useEffect } from "react";
// import JsBarcode from "";
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

  console.log(showProduct, "555555555");

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
      column_name: "Gender",
      enabled: columnExist.name == "Gender" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },

    {
      column_name: "Brand",
      enabled: columnExist.name == "Brand" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },

    {
      column_name: "MaterialType",
      enabled: columnExist.name == "MaterialType" ? columnExist.status : true,
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
      column_name: "Discount",
      enabled: columnExist.name == "Discount" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Stocks",
      enabled: columnExist.name == "Stocks" ? columnExist.status : true,
      // enabled: columnExist ? columnExist.status : true,
    },
    {
      column_name: "Vendor Name",
      enabled: columnExist.name == "Vendor Name" ? columnExist.status : true,
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
              ml="150px"
              mr="auto"
              width={{
                sm: "60%",
                md: "650px",
                lg: "800px",
                xl: "75%",
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
                          <Td>{data.ProductName}</Td>
                        )}

                        {columnExist.name == "Description" ? null : (
                          <Td>{data.Description}</Td>
                        )}

                        {columnExist.name == "Main Category" ? null : (
                          <Td>{data.MainCategory}</Td>
                        )}

                        {columnExist.name == "Sub Category" ? null : (
                          <Td>{data.SubCategory}</Td>
                        )}

                        {columnExist.name == "Size" ? null : (
                          <Td>{data.Size}</Td>
                        )}

                        {columnExist.name == "Color" ? null : (
                          <Td>{data.Color}</Td>
                        )}

                        {columnExist.name == "Gender" ? null : (
                          <Td>{data.GenderWear}</Td>
                        )}

                        {columnExist.name == "Brand" ? null : (
                          <Td>{data.Brand}</Td>
                        )}

                        {columnExist.name == "MaterialType" ? null : (
                          <Td>{data.MaterialType}</Td>
                        )}

                        {columnExist.name == "Market Price" ? null : (
                          <Td isNumeric>{data.MarketPrice}</Td>
                        )}

                        {columnExist.name == "Selling Price" ? null : (
                          <Td>{data.SellingPrice}</Td>
                        )}

                        {columnExist.name == "Price Code" ? null : (
                          <Td>{data.priceCode}</Td>
                        )}
                        {columnExist.name == "Discount" ? null : (
                          <Td>{data.Discount}</Td>
                        )}

                        {columnExist.name == "Stocks" ? null : (
                          <Td>{data.Qty}</Td>
                        )}
                        {columnExist.name == "Vendor Name" ? null : (
                          <Td>{data.VendorName}</Td>
                        )}

                        {/* {columnExist.name == "Qty Type" ? null : (
                          <Td>{data.selectQty}</Td>
                        )} */}

                        {columnExist.name == "Bar Code" ? null : (
                          <Td>
                            <Image src={data.BarCodeLink} alt="Bar Code" />
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

                        <Td>
                          <Image
                            src={`copy/${data.BarCodePin}.png`}
                            alt="MRP Barcode"
                          />
                          <Button size="sm" colorScheme="teal" mt="10px">
                            Download
                          </Button>
                        </Td>

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
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </>
  );
}

export default Home;
