// import React, { useEffect, useState } from "react";
// // import JsBarcode from "../../public/copy";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
//   Skeleton,
//   Button,
//   Spacer,
//   Divider,
//   Image,
//   Box,
//   Center,
//   HStack,
//   useToast,
//   Checkbox,
//   Flex,
// } from "@chakra-ui/react";
// import { saveAs } from "file-saver";
// import JSZip from "jszip";
// import JSZipUtils from "jszip-utils";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   addOneProduct,
//   deleteProduct,
//   downloadBarCode,
//   showProductAction,
// } from "../actions/productAction";
// import { Link, useNavigate } from "react-router-dom";
// import useSocket from "../CustomHook/useSocket";
// import { Link as ReachLink } from "react-router-dom";
// import { ProductManageColomnHideAndVisibleShow } from "../actions/SettingAction";

// function Home() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const toast = useToast();

//   const [zip, setZip] = useState([]);
//   const [zipMrp, setZipMrp] = useState([]);

//   const [zipFolder, setZipFolder] = useState();
//   const [zipFolder1, setZipFolder1] = useState();

//   //socket io
//   const socket = useSocket((socket) => {
//     socket.on("user", (data) => {
//       dispatch(addOneProduct(data));
//     });
//     socket.on("deletePro", (data) => {
//       dispatch(deleteProduct(data._id));
//     });
//     socket.on("updatePro", (data) => {
//       dispatch(showProductAction());
//     });
//     socket.on("connect_error", (data) => {});
//   });

//   //selector
//   let productDetail = useSelector((state) => {
//     return state.showProInfo;
//   });
//   let { loading, showProduct, error } = productDetail;

//   console.log(showProduct, "555555555");

//   const { deleteDetail } = useSelector((state) => {
//     return state.deleteInfo;
//   });

//   const { editSuccess } = useSelector((state) => {
//     return state.editSuccess;
//   });

//   const { columnHideAndVisibleShow } = useSelector((state) => {
//     return state.ProductManageColomnHideAndVisibleShow;
//   });
//   console.log(
//     columnHideAndVisibleShow,
//     "columnHideAndVisibleShowcolumnHideAndVisibleShowyyyyyyyyyyyyyyyyyyyyyyy"
//   );

//   // let columnExist;

//   // columnExist = localStorage.getItem("productColumn")
//   //   ? JSON.parse(localStorage.getItem("productColumn"))
//   //   : { id: true, name:&&" columnExist.status == true &&

//   useEffect(() => {
//     // if (!columnExist) {
//     //   columnExist.id = true;
//     // }

//     dispatch(ProductManageColomnHideAndVisibleShow());
//   }, []);

//   useEffect(() => {
//     if (editSuccess) {
//     }
//   }, [editSuccess]);

//   useEffect(() => {
//     dispatch(showProductAction());
//   }, [deleteDetail]);
//   let staffExit = localStorage.getItem("staffInfo")
//     ? JSON.stringify(localStorage.getItem("staffInfo"))
//     : null;
//   useEffect(() => {
//     if (!staffExit) {
//       navigate("/login");
//     }
//   }, [staffExit]);
//   const editPro = async (proId) => {
//     navigate(`/editProduct/${proId}`);
//   };

//   //delete
//   const deletePro = (proId) => {
//     dispatch(deleteProduct(proId));
//   };

//   //downloadClick
//   // const downloadClick = (id) => {
//   //   // dispatch(downloadBarCode(id));
//   // };

//   const zipDownload = (e) => {
//     console.log(zip, "e.target.checkede.target.checked");
//   };

//   //clickZipDownload
//   const clickZipDownload = () => {
//     var zip1 = new JSZip();
//     var count = 0;
//     var zipFilename = `${zipFolder}.zip`;

//     zip.forEach(function (url, i) {
//       var filename = zip[i];
//       console.log(filename, "zip[i]===-=-==-=-");
//       filename = filename
//         .replace(/[\/\*\|\:\<\>\?\"\\]/gi, "")
//         .replace("httpsi.imgur.com", "");
//       // loading a file and add it in a zip file
//       JSZipUtils.getBinaryContent(url, function (err, data) {
//         if (err) {
//           throw err; // or handle the error
//         }
//         zip1.file(filename, data, { binary: true });
//         count++;
//         if (count == zip.length) {
//           zip1.generateAsync({ type: "blob" }).then(function (content) {
//             saveAs(content, zipFilename);
//           });
//         }
//       });
//     });
//   };

//   const clickMrpZipDownload = () => {
//     ///MRPZIP
//     var zip2 = new JSZip();
//     var count = 0;
//     var zipFilename = `${zipFolder1}.zip`;

//     zipMrp.forEach(function (url, i) {
//       var filename = zipMrp[i];
//       console.log(filename, "zipMrp[i]===-=-==-=-");
//       filename = filename
//         .replace(/[\/\*\|\:\<\>\?\"\\]/gi, "")
//         .replace("httpsi.imgur.com", "");
//       // loading a file and add it in a zip file
//       JSZipUtils.getBinaryContent(url, function (err, data) {
//         if (err) {
//           throw err; // or handle the error
//         }
//         zip2.file(filename, data, { binary: true });
//         count++;
//         if (count == zip.length) {
//           zip2.generateAsync({ type: "blob" }).then(function (content) {
//             saveAs(content, zipFilename);
//           });
//         }
//       });
//     });
//   };
//   // const columns = [
//   //   {
//   //     column_name: "Product Name",

//   //     enabled: columnExist.name == "Product Name" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Description",
//   //     enabled: columnExist.name == "Description" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Main Category",
//   //     enabled: columnExist.name == "Main Category" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Sub Category",
//   //     enabled: columnExist.name == "Sub Category" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Size",
//   //     enabled: columnExist.name == "Size" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Color",
//   //     enabled: columnExist.name == "Color" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "Gender",
//   //     enabled: columnExist.name == "Gender" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "Brand",
//   //     enabled: columnExist.name == "Brand" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "MaterialType",
//   //     enabled: columnExist.name == "MaterialType" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "Market Price",
//   //     enabled: columnExist.name == "Market Price" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "Selling Price",
//   //     enabled: columnExist.name == "Selling Price" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "Price Code",
//   //     enabled: columnExist.name == "Price Code" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },

//   //   {
//   //     column_name: "Discount",
//   //     enabled: columnExist.name == "Discount" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Stocks",
//   //     enabled: columnExist.name == "Stocks" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Vendor Name",
//   //     enabled: columnExist.name == "Vendor Name" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Bar Code",
//   //     enabled: columnExist.name == "Bar Code" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "MRP Bar Code",
//   //     enabled: columnExist.name == "MRP Bar Code" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   //   {
//   //     column_name: "Action",
//   //     enabled: columnExist.name == "Action" ? columnExist.status : true,
//   //     // enabled: columnExist ? columnExist.status : true,
//   //   },
//   // ];

//   return (
//     <>
//       <Box overflowY="auto" mb="auto">
//         <Center fontSize="40px" color="teal">
//           Products
//         </Center>
//         {loading ? (
//           <HStack>
//             <Skeleton>
//               <div>contents wrapped</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//             </Skeleton>
//             <Skeleton>
//               <div>contents wrapped</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//             </Skeleton>
//             <Skeleton>
//               <div>contents wrapped</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//               <div>won't be visible</div>
//             </Skeleton>
//           </HStack>
//         ) : (
//           <>
//             <Link
//               style={{ textDecoration: "none" }}
//               as={ReachLink}
//               to="/addproduct"
//             >
//               <Button left="60%">Add Product</Button>
//             </Link>
//             <Flex>
//               <Box ml="500px">
//                 <Button onClick={clickZipDownload}>Zip Download</Button>
//               </Box>
//               <Box ml="500px">
//                 <Button onClick={clickMrpZipDownload}>Zip Download MRP</Button>
//               </Box>
//             </Flex>

//             <TableContainer
//               ml="150px"
//               mr="auto"
//               width={{
//                 sm: "60%",
//                 md: "650px",
//                 lg: "800px",
//                 xl: "75%",
//               }}
//             >
//               <Table variant="simple">
//                 <TableCaption>Ukkens Vasthralay Product Details</TableCaption>
//                 <Thead>
//                   <Tr>
//                     {columnHideAndVisibleShow &&
//                       columnHideAndVisibleShow.map((item) => {
//                         console.log(item.status, "statusstatusstatusstatus");
//                         if (item.status) {
//                           return <Th> {item.title} </Th>;
//                         }
//                       })}
//                   </Tr>
//                 </Thead>

//                 {showProduct.showProduct.map((data) => {
//                   return (
//                     <Tbody key={data._id}>
//                       <Tr>
//                         {columnHideAndVisibleShow &&
//                           columnHideAndVisibleShow.map((columnExist) => {
//                             return (
//                               <>
//                                 {columnExist.title == "ProductName" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.ProductName}</Td>
//                                   )}

//                                 {/* {columnExist.name == "Product Name" &&
//                                 !columnExist.status ? null : (
//                                   <Td>{data.ProductName}</Td>
//                                 )} */}

//                                 {columnExist.title == "Description" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.Description}</Td>
//                                   )}

//                                 {columnExist.title == "MainCategory" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.MainCategory}</Td>
//                                   )}

//                                 {columnExist.title == "SubCategory" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.SubCategory}</Td>
//                                   )}

//                                 {columnExist.title == "Size" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.Size}</Td>
//                                   )}

//                                 {columnExist.title == "Color" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.Color}</Td>
//                                   )}

//                                 {columnExist.title == "Gender" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.GenderWear}</Td>
//                                   )}
//                                 {columnExist.title == "Brand" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.Brand}</Td>
//                                   )}
//                                 {columnExist.title == "MaterialType" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.MaterialType}</Td>
//                                   )}
//                                 {columnExist.title == "MarketPrice" &&
//                                   columnExist.status == true && (
//                                     <Td isNumeric>{data.MarketPrice}</Td>
//                                   )}
//                                 {columnExist.title == "SellingPrice" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.SellingPrice}</Td>
//                                   )}
//                                 {columnExist.title == "PriceCode" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.priceCode}</Td>
//                                   )}
//                                 {columnExist.title == "Discount" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.Discount}</Td>
//                                   )}
//                                 {columnExist.title == "Stocks" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.Qty}</Td>
//                                   )}
//                                 {columnExist.title == "VendorName" &&
//                                   columnExist.status == true && (
//                                     <Td>{data.VendorName}</Td>
//                                   )}
//                                 {/* {columnExist.name == "Qty Type" &&  columnExist.status == true &&
//                           <Td>{data.selectQty}</Td>
//                         )} */}
//                                 {columnExist.title == "BarCode" &&
//                                   columnExist.status == true && (
//                                     <Td>
//                                       <Image
//                                         src={`copy/${data.BarCodePin}OUT.png`}
//                                         alt="Bar Code"
//                                       />
//                                       <Button
//                                         size="sm"
//                                         colorScheme="teal"
//                                         mt="10px"
//                                         onClick={() => {
//                                           saveAs(
//                                             `copy/${data.BarCodePin}OUT.png`,
//                                             `${data.BarCodePin}.jpg`
//                                           );
//                                           toast({
//                                             title: "Download Success.",
//                                             description:
//                                               "Barcode Downloaded Successfully.",
//                                             status: "success",
//                                             duration: 9000,
//                                             isClosable: true,
//                                           });
//                                         }}
//                                       >
//                                         Download
//                                       </Button>
//                                     </Td>
//                                   )}

//                                 {columnExist.title == "MRPBarCode" &&
//                                   columnExist.status == true && (
//                                     <Td>
//                                       <Image
//                                         src={`copy/${data.BarCodePin}.png`}
//                                         alt="MRP Barcode"
//                                       />
//                                       <Button
//                                         size="sm"
//                                         colorScheme="teal"
//                                         mt="10px"
//                                         onClick={() => {
//                                           saveAs(
//                                             `copy/${data.BarCodePin}.png`,
//                                             `${data.BarCodePin}MRP.jpg`
//                                           );
//                                           toast({
//                                             title: "Download Success.",
//                                             description:
//                                               "Barcode Downloaded Successfully.",
//                                             status: "success",
//                                             duration: 9000,
//                                             isClosable: true,
//                                           });
//                                         }}
//                                       >
//                                         Download
//                                       </Button>
//                                     </Td>
//                                   )}
//                               </>
//                             );
//                           })}

//                         <Td>
//                           <Button
//                             onClick={() => {
//                               editPro(data._id);
//                             }}
//                             colorScheme="teal"
//                             size="sm"
//                           >
//                             Edit
//                           </Button>
//                           <Spacer />
//                           <Divider />
//                           <Button
//                             onClick={() => {
//                               deletePro(data._id);
//                             }}
//                             colorScheme="red"
//                             size="sm"
//                           >
//                             Delete
//                           </Button>
//                         </Td>
//                         <Td>
//                           <Checkbox
//                             onChange={() => {
//                               setZipMrp([...zipMrp, data.BarCodeMrpLink]);
//                               setZipFolder(data.PID);
//                               setZip([...zip, data.BarCodeLink]);
//                               setZipFolder1(data.PID);
//                               zipDownload();
//                             }}
//                           >
//                             Checkbox
//                           </Checkbox>
//                         </Td>
//                       </Tr>
//                     </Tbody>
//                   );
//                 })}
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Box>
//     </>
//   );
// }

// export default Home;

import React, { forwardRef, useEffect, useState } from "react";
// import JsBarcode from "../../public/copy";
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
  Checkbox,
  Flex,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";

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
import { ProductManageColomnHideAndVisibleShow } from "../actions/SettingAction";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const [showPro, setShowPro] = useState([]);
  const [zip, setZip] = useState([]);

  const [zipMrp, setZipMrp] = useState([]);

  const [zipFolder, setZipFolder] = useState();
  const [zipFolder1, setZipFolder1] = useState();

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
  console.log(
    showProduct,
    "showProductshowProductshowProductshowProductshowProduct"
  );

  const { deleteDetail } = useSelector((state) => {
    return state.deleteInfo;
  });

  const { editSuccess } = useSelector((state) => {
    return state.editSuccess;
  });

  const { columnHideAndVisibleShow } = useSelector((state) => {
    return state.ProductManageColomnHideAndVisibleShow;
  });

  // let columnExist;

  // columnExist = localStorage.getItem("productColumn")
  //   ? JSON.parse(localStorage.getItem("productColumn"))
  //   : { id: true, name:&&" columnExist.status == true &&

  useEffect(() => {
    // if (!columnExist) {
    //   columnExist.id = true;
    // }

    dispatch(ProductManageColomnHideAndVisibleShow());
  }, []);

  useEffect(() => {
    if (editSuccess) {
    }
  }, [editSuccess]);

  useEffect(() => {
    dispatch(showProductAction());
  }, [deleteDetail]);

  //data Meterial
  let data =
    showProduct &&
    showProduct.map((data) => {
      return {
        ProductName: data.ProductName,
        Description: data.Description,
        MainCategory: data.MainCategory,
        SubCategory: data.SubCategory,
        Size: data.Size,
        Color: data.Color,
        GenderWear: data.GenderWear,
        Brand: data.Brand,
        MaterialType: data.MaterialType,
        SellingPrice: data.SellingPrice,
        priceCode: data.priceCode,
        Discount: data.Discount,
        Qty: data.Qty,
        VendorName: data.VendorName,
        BarCode: (
          <img
            src={`copy/${data.BarCodePin}OUT.png`}
            alt=""
            border="3"
            height="100"
            width="100"
          />
        ),
        MRPBarCode: (
          <img
            src={`copy/${data.BarCodePin}OUT.png`}
            alt=""
            border="3"
            height="100"
            width="100"
          />
        ),
        Action: (
          <Button
            onClick={() => {
              editPro(data._id);
            }}
            colorScheme="blue"
          >
            Edit
          </Button>
        ),
        _id: data._id,
        BarCodeLink: data.BarCodeLink,
        BarCodeMrpLink: data.BarCodeMrpLink,
        PID: data.PID,
      };
    });

  let staffExit = localStorage.getItem("staffInfo")
    ? JSON.stringify(localStorage.getItem("staffInfo"))
    : null;

  useEffect(() => {
    if (!staffExit) {
      navigate("/login");
    }
  }, [staffExit]);
  const editPro = async (proId) => {
    navigate(`/editProduct/${proId}`);
  };

  //clickZipDownload
  const clickZipDownload = () => {
    var zip1 = new JSZip();
    var count = 0;
    var zipFilename = `${zipFolder}.zip`;

    zip.forEach(function (url, i) {
      var filename = zip[i];
      console.log(filename, "zip[i]===-=-==-=-");
      filename = filename
        .replace(/[\/\*\|\:\<\>\?\"\\]/gi, "")
        .replace("httpsi.imgur.com", "");
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip1.file(filename, data, { binary: true });
        count++;
        if (count == zip.length) {
          zip1.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  };

  const clickMrpZipDownload = () => {
    ///MRPZIP
    var zip2 = new JSZip();
    var count = 0;
    var zipFilename = `${zipFolder1}.zip`;

    zipMrp.forEach(function (url, i) {
      var filename = zipMrp[i];
      alert(filename);
      console.log(filename, "zipMrp[i]===-=-==-=-");
      filename = filename
        .replace(/[\/\*\|\:\<\>\?\"\\]/gi, "")
        .replace("httpsi.imgur.com", "");
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip2.file(filename, data, { binary: true });
        count++;
        if (count == zip.length) {
          zip2.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  };

  //meterial Icon

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  //COLUMN METERIAL
  const columns = [
    {
      title: "Product Name",
      field: "ProductName",
    },
    { title: "Description", field: "Description" },
    { title: "Main Category", field: "MainCategory" },

    { title: "SubCategory", field: "SubCategory" },
    { title: "Size", field: "Size" },
    { title: "Color", field: "Color" },

    { title: "Gender Wear", field: "GenderWear" },
    { title: "Brand", field: "Brand" },
    { title: "Material Type", field: "MaterialType" },
    { title: "Selling Price", field: "SellingPrice" },
    { title: "price Code", field: "priceCode" },
    { title: "Discount", field: "Discount" },
    { title: "Qty", field: "Qty" },
    { title: "Vendor Name", field: "VendorName" },
    {
      title: "Bar Code",
      field: "BarCode",
    },
    {
      title: "MRP Bar Code",
      field: "MRPBarCode",
    },
    {
      title: "Action",
      field: "Action",
    },
  ];

  // const columns = [
  //   {
  //     column_name: "Product Name",

  //     enabled: columnExist.name == "Product Name" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Description",
  //     enabled: columnExist.name == "Description" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Main Category",
  //     enabled: columnExist.name == "Main Category" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Sub Category",
  //     enabled: columnExist.name == "Sub Category" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Size",
  //     enabled: columnExist.name == "Size" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Color",
  //     enabled: columnExist.name == "Color" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "Gender",
  //     enabled: columnExist.name == "Gender" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "Brand",
  //     enabled: columnExist.name == "Brand" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "MaterialType",
  //     enabled: columnExist.name == "MaterialType" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "Market Price",
  //     enabled: columnExist.name == "Market Price" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "Selling Price",
  //     enabled: columnExist.name == "Selling Price" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "Price Code",
  //     enabled: columnExist.name == "Price Code" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },

  //   {
  //     column_name: "Discount",
  //     enabled: columnExist.name == "Discount" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Stocks",
  //     enabled: columnExist.name == "Stocks" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Vendor Name",
  //     enabled: columnExist.name == "Vendor Name" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Bar Code",
  //     enabled: columnExist.name == "Bar Code" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "MRP Bar Code",
  //     enabled: columnExist.name == "MRP Bar Code" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  //   {
  //     column_name: "Action",
  //     enabled: columnExist.name == "Action" ? columnExist.status : true,
  //     // enabled: columnExist ? columnExist.status : true,
  //   },
  // ];

  return (
    <>
      <Box overflowY="auto" mb="auto">
        <Center fontSize="40px" color="teal">
          Product Management
        </Center>
        <>
          <Link
            style={{ textDecoration: "none" }}
            as={ReachLink}
            to="/addproduct"
          >
            <Button left="15%" backgroundColor="#16134F" color="white">
              Add Product
            </Button>
          </Link>
          <Flex>
            <Box ml="500px">
              {/* <Button onClick={clickZipDownload}>Zip Download</Button> */}
            </Box>
            <Box ml="500px">
              {/* <Button onClick={clickMrpZipDownload}>Zip Download MRP</Button> */}
            </Box>
          </Flex>
          {loading ? (
            <HStack ml="200px">
              <Skeleton w="100%" mt="50px">
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </HStack>
          ) : (
            <MaterialTable
              style={{
                marginLeft: "150px",
                marginTop: "20px",
                width: "80%",
              }}
              icons={tableIcons}
              data={data}
              columns={columns}
              title="Product Management"
              options={{
                filtering: true,
                pageSize: 3,
                pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
                selection: true,
                exportButton: true,
                grouping: true,
              }}
              actions={[
                {
                  tooltip: "Remove All Selected Products",
                  icon: "delete",
                  onClick: (evt, data) => {
                    data.map((id) => {
                      dispatch(deleteProduct(id._id));
                    });
                  },
                },

                {
                  tooltip: "download All Selected Bar Code",
                  icon: "lot",
                  onClick: (evt, data) => {
                    data.map(async (id) => {
                      setZipFolder(id.PID);
                      setZip([...zip, id.PID]);

                      clickZipDownload();
                    });
                  },
                },

                {
                  tooltip: "download MRP All Selected Bar Code",
                  icon: "2 down",
                  onClick: (evt, data) => {
                    data.map(async (id) => {
                      alert(id.PID, "ghjhkhkjhhkjkjhooogloglglglkg");

                      setZipMrp([...zipMrp, id.BarCodeMrpLink]);
                      setZipFolder1(id.PID);
                      clickMrpZipDownload();
                    });
                  },
                },
              ]}
            />
          )}
        </>
      </Box>
    </>
  );
}

export default Home;
