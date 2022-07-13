// import MaterialTable from "material-table";
// import {
//   AddBox,
//   ArrowDownward,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clear,
//   DeleteOutline,
//   Edit,
//   FilterList,
//   FirstPage,
//   LastPage,
//   Remove,
//   SaveAlt,
//   Search,
//   ViewColumn,
// } from "@material-ui/icons";

// import {
//   chakra,
//   Spacer,
//   Stack,
//   VStack,
//   Text,
//   Heading,
//   Center,
//   Skeleton,
// } from "@chakra-ui/react";
// import { FaUserAlt, FaLock } from "react-icons/fa";
// import { BsArrowsExpand } from "react-icons/bs";

// import { forwardRef, useEffect, useState } from "react";
// import {
//   AddladgerBookAction,
//   ladgerBookAction,
//   ladgerBookshow,
// } from "../actions/productAction";
// import { useDispatch, useSelector } from "react-redux";
// import { Box, Button, Divider, Input, Select } from "@material-ui/core";

// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => (
//     <ChevronRight {...props} ref={ref} />
//   )),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => (
//     <ChevronLeft {...props} ref={ref} />
//   )),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
// };
// const CFaUserAlt = chakra(FaUserAlt);
// const CFaLock = chakra(FaLock);
// function Test() {
//   const [category, setCategory] = useState("");
//   const [details, setDetails] = useState("");
//   const [credit, setCredit] = useState("");
//   const [debit, setDebit] = useState("");

//   const dispatch = useDispatch();
//   let { loading, ladger } = useSelector((state) => {
//     return state.ladgerBook;
//   });

//   let { showcategoryLadger } = useSelector((state) => {
//     return state.ladgerBookshow;
//   });

//   console.log(showcategoryLadger, "showcategoryLadgershowcategoryLadger");
//   let { addladger } = useSelector((state) => {
//     return state.AddladgerBook;
//   });

//   console.log(ladger, "123456787");
//   useEffect(() => {
//     dispatch(ladgerBookAction());
//     dispatch(ladgerBookshow());
//   }, [addladger]);
//   const [showPassword, setShowPassword] = useState(false);

//   const columns = [
//     // { title: "S.No", field: "S.No" },
//     // { title: "Date", field: "Date" },
//     { title: "Category", field: "Category" },
//     { title: "Detaile", field: "Detaile" },
//     { title: "Debit", field: "Debit" },
//     { title: "Credit", field: "Credit" },
//     { title: "Current Balnce", field: "Current_Balnce" },
//     // { title: "Clossing Balnce", field: "Clossing Balnce" },
//   ];

//   const data =
//     ladger &&
//     ladger.map((ladg) => {
//       return {
//         Category: ladg.category,
//         Detaile: ladg.details,
//         Debit: ladg.debit,
//         Credit: ladg.credit,
//         Current_Balnce: ladg.balance,
//       };
//     });
//   // options = {
//   //   exportButton: true,
//   //   exportCsv: (columns, data) => {
//   //     alert("You should develop a code to export " + data.length + " rows");
//   //   },
//   // };

//   ///submitHandler
//   const submitHandler = (e) => {
//     e.preventDefault();
//     const obj = {
//       category,
//       details,
//       credit,
//       debit,
//     };
//     dispatch(AddladgerBookAction(obj));
//   };
//   //background setup
//   const basicBoxStyles = {
//     justifyContent: "center",
//     alignItems: "center",
//     background:
//       "url(https://media.istockphoto.com/photos/recycled-paper-texture-background-in-turquoise-green-blue-mint-color-picture-id1163827586?k=20&m=1163827586&s=612x612&w=0&h=M3h5PwbI2tBkj5oc-UCmhEIJX1wl8IVtr0XXfQaicVk=) center/cover no-repeat",
//   };
//   return (
//     <VStack>
//       <Box
//         sx={basicBoxStyles}
//         filter="grayscale(80%)"
//         height={200}
//         width="90%"
//         ml="250px"
//       >
//         <form onSubmit={submitHandler}>
//           <Box
//             spacing={3}
//             display={["block", "block", "block", "flex", "flex"]}
//             alignItems="center"
//             justifyContent="center"
//             mt="80px"
//           >
//             <VStack mb="28px">
//               <Text>Select Category</Text>
//               <Select
//                 onChange={(e) => {
//                   setCategory(e.target.value);
//                 }}
//                 placeholder="Select category"
//                 size="md"
//               >
//                 {showcategoryLadger &&
//                   showcategoryLadger.map((data) => (
//                     <option value={data.category}>{data.category}</option>
//                   ))}
//               </Select>
//             </VStack>
//             <Divider />
//             <Input
//               onChange={(e) => {
//                 setDetails(e.target.value);
//               }}
//               placeholder="Details"
//               _placeholder={{ color: "inherit" }}
//             />
//             <Divider />
//             <BsArrowsExpand />

//             <Input
//               onChange={(e) => {
//                 setCredit(e.target.value);
//               }}
//               focusBorderColor="red"
//               placeholder="Credit"
//               _placeholder={{ color: "inherit" }}
//               type="number"
//             />
//             <Input
//               onChange={(e) => {
//                 setDebit(e.target.value);
//               }}
//               focusBorderColor="red"
//               placeholder="Debit"
//               _placeholder={{ color: "inherit" }}
//               type="number"
//             />
//             <Button type="submit" variantColor="green">
//               ADD
//             </Button>
//           </Box>
//         </form>
//       </Box>
//       {loading ? (
//         <Stack>
//           <Skeleton height="20px" />
//           <Skeleton height="20px" />
//           <Skeleton height="20px" />
//         </Stack>
//       ) : (
//         <MaterialTable
//           style={{ marginLeft: "200px", marginTop: "20px", width: "80%" }}
//           icons={tableIcons}
//           data={data}
//           columns={columns}
//           title="Ladger Book"
//           options={{
//             filtering: true,
//             pageSize: 5,
//             pageSizeOptions: [5, 10, 20, 30, 40, 50],
//             exportButton: {
//               csv: true,
//               pdf: false,
//             },

//             exportAllData: true,
//           }}
//         />
//       )}
//     </VStack>
//   );
// }

// export default Test;

// // import {
// //   Button,
// //   Checkbox,
// //   Flex,
// //   FormControl,
// //   FormLabel,
// //   Heading,
// //   Input,
// //   Link,
// //   Stack,
// //   Image,
// //   Text,
// // } from "@chakra-ui/react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { useFormik } from "formik";
// // import { staffLogin } from "../actions/staffAction";
// // import { useEffect } from "react";
// // import Messege from "../components/Messege";

// // export default function Test() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const staffLoginData = useSelector((state) => {
// //     return state.staffLginData;
// //   });
// //   let { loding, staffInfo } = staffLoginData;

// //   const loginMsg = useSelector((state) => {
// //     return state.staffLginData;
// //   });
// //   let { error } = loginMsg;

// //   useEffect(() => {
// //     let isStaff = localStorage.getItem("staffInfo")
// //       ? JSON.stringify(localStorage.getItem("staffInfo"))
// //       : null;
// //     if (isStaff) {
// //       navigate("/");
// //     }
// //   }, [staffInfo]);

// //   //validatio form
// //   const validate = (values) => {
// //     const errors = {};

// //     if (!values.email) {
// //       errors.email = "Required";
// //     } else if (values.email.length <= 3) {
// //       errors.email = "Must be 4 characters or More";
// //     }

// //     if (!values.password) {
// //       errors.password = "Required";
// //     } else if (values.password.length < 4) {
// //       errors.password = "Must be 4 Characters or More";
// //     } else if (values.password === "123456") {
// //       errors.password = "Must Not be 123456";
// //     }
// //     return errors;
// //   };

// //   const formik = useFormik({
// //     initialValues: {
// //       email: "",
// //       password: "",
// //     },
// //     validate,
// //     onSubmit: (values) => {
// //       dispatch(staffLogin(values));
// //     },
// //   });

// //   return (
// //     <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
// //       <Flex p={8} flex={1} align={"center"} justify={"center"}>
// //         <Stack spacing={4} w={"full"} maxW={"md"}>
// //           <Heading fontSize={"2xl"}>Sign in to your account</Heading>
// //           {error && <Messege variant="danger">{error}</Messege>}

// //           <form onSubmit={formik.handleSubmit}>
// //             <FormControl id="email">
// //               <FormLabel>Email address</FormLabel>
// //               <Input
// //                 onChange={formik.handleChange}
// //                 value={formik.values.email}
// //                 onBlur={formik.handleBlur}
// //                 type="email"
// //                 placeholder="Enter Your Email"
// //                 aria-label="Email"
// //                 name="email"
// //               />
// //             </FormControl>
// //             {formik.errors.email ? (
// //               <Text color="tomato">{formik.errors.email}</Text>
// //             ) : null}
// //             <FormControl id="password">
// //               <FormLabel>Password</FormLabel>
// //               <Input
// //                 onChange={formik.handleChange}
// //                 value={formik.values.password}
// //                 onBlur={formik.handleBlur}
// //                 type="password"
// //                 placeholder="Enter Your Password"
// //                 aria-label="Password"
// //                 name="password"
// //               />
// //             </FormControl>
// //             {formik.errors.password ? (
// //               <Text color="tomato">{formik.errors.password}</Text>
// //             ) : null}
// //             <Stack spacing={6}>
// //               {/* <Stack
// //               direction={{ base: "column", sm: "row" }}
// //               align={"start"}
// //               justify={"space-between"}
// //             >
// //               {/* <Checkbox>Remember me</Checkbox> */}
// //               {/* <Link color={"blue.500"}>Forgot password?</Link> */}
// //               {/* </Stack> */}
// //               <Button type="submit" colorScheme={"blue"} variant={"solid"}>
// //                 Sign in
// //               </Button>
// //             </Stack>
// //           </form>
// //         </Stack>
// //       </Flex>
// //       <Flex flex={1}>
// //         <Image
// //           alt={"Login Image"}
// //           objectFit={"cover"}
// //           src={"images/4231726.jpg"}
// //         />
// //       </Flex>
// //     </Stack>
// //   );
// // }

// import React, { forwardRef, useEffect, useState } from "react";
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
//   Stack,
// } from "@chakra-ui/react";
// import MaterialTable from "material-table";
// import {
//   AddBox,
//   ArrowDownward,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clear,
//   DeleteOutline,
//   Edit,
//   FilterList,
//   FirstPage,
//   LastPage,
//   Remove,
//   SaveAlt,
//   Search,
//   ViewColumn,
// } from "@material-ui/icons";
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

//   const [showPro, setShowPro] = useState([]);
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
//   console.log(
//     showProduct,
//     "showProductshowProductshowProductshowProductshowProduct"
//   );

//   const { deleteDetail } = useSelector((state) => {
//     return state.deleteInfo;
//   });

//   const { editSuccess } = useSelector((state) => {
//     return state.editSuccess;
//   });

//   const { columnHideAndVisibleShow } = useSelector((state) => {
//     return state.ProductManageColomnHideAndVisibleShow;
//   });

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

//   //data Meterial
//   let data =
//     showProduct &&
//     showProduct.map((data) => {
//       return {
//         ProductName: data.ProductName,
//         Description: data.Description,
//         MainCategory: data.MainCategory,
//         SubCategory: data.SubCategory,
//         Size: data.Size,
//         Color: data.Color,
//         GenderWear: data.GenderWear,
//         Brand: data.Brand,
//         MaterialType: data.MaterialType,
//         SellingPrice: data.SellingPrice,
//         priceCode: data.priceCode,
//         Discount: data.Discount,
//         Qty: data.Qty,
//         VendorName: data.VendorName,
//         BarCode: (
//           <img
//             src={`copy/${data.BarCodePin}OUT.png`}
//             alt=""
//             border="3"
//             height="100"
//             width="100"
//           />
//         ),
//         MRPBarCode: (
//           <img
//             src={`copy/${data.BarCodePin}OUT.png`}
//             alt=""
//             border="3"
//             height="100"
//             width="100"
//           />
//         ),
//         Action: (
//           <Button
//             onClick={() => {
//               editPro(data._id);
//             }}
//             colorScheme="blue"
//           >
//             Edit
//           </Button>
//         ),
//         _id: data._id,
//         BarCodeLink: data.BarCodeLink,
//         BarCodeMrpLink: data.BarCodeMrpLink,
//         PID: data.PID,
//       };
//     });

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
//       alert(filename);
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

//   //meterial Icon

//   const tableIcons = {
//     Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//     Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//     Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//     DetailPanel: forwardRef((props, ref) => (
//       <ChevronRight {...props} ref={ref} />
//     )),
//     Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//     Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//     Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//     FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//     LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//     NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//     PreviousPage: forwardRef((props, ref) => (
//       <ChevronLeft {...props} ref={ref} />
//     )),
//     ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//     Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//     SortArrow: forwardRef((props, ref) => (
//       <ArrowDownward {...props} ref={ref} />
//     )),
//     ThirdStateCheck: forwardRef((props, ref) => (
//       <Remove {...props} ref={ref} />
//     )),
//     ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
//   };

//   //COLUMN METERIAL
//   const columns = [
//     {
//       title: "Product Name",
//       field: "ProductName",
//     },
//     { title: "Description", field: "Description" },
//     { title: "Main Category", field: "MainCategory" },

//     { title: "SubCategory", field: "SubCategory" },
//     { title: "Size", field: "Size" },
//     { title: "Color", field: "Color" },

//     { title: "Gender Wear", field: "GenderWear" },
//     { title: "Brand", field: "Brand" },
//     { title: "Material Type", field: "MaterialType" },
//     { title: "Selling Price", field: "SellingPrice" },
//     { title: "price Code", field: "priceCode" },
//     { title: "Discount", field: "Discount" },
//     { title: "Qty", field: "Qty" },
//     { title: "Vendor Name", field: "VendorName" },
//     {
//       title: "Bar Code",
//       field: "BarCode",
//     },
//     {
//       title: "MRP Bar Code",
//       field: "MRPBarCode",
//     },
//     {
//       title: "Action",
//       field: "Action",
//     },
//   ];

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
//           Product Management
//         </Center>
//         <>
//           <Link
//             style={{ textDecoration: "none" }}
//             as={ReachLink}
//             to="/addproduct"
//           >
//             <Button left="60%">Add Product</Button>
//           </Link>
//           <Flex>
//             <Box ml="500px">
//               <Button onClick={clickZipDownload}>Zip Download</Button>
//             </Box>
//             <Box ml="500px">
//               <Button onClick={clickMrpZipDownload}>Zip Download MRP</Button>
//             </Box>
//           </Flex>
//           {loading ? (
//             <HStack ml="50px">
//               <Skeleton w="100%">
//                 <div>contents wrapped</div>
//                 <div>won't be visible</div>
//                 <div>contents wrapped</div>
//                 <div>won't be visible</div>
//                 <div>contents wrapped</div>
//                 <div>won't be visible</div>
//                 <div>contents wrapped</div>
//                 <div>won't be visible</div>
//                 <div>contents wrapped</div>
//                 <div>won't be visible</div>
//                 <div>contents wrapped</div>
//                 <div>won't be visible</div>
//               </Skeleton>
//             </HStack>
//           ) : (
//             <MaterialTable
//               style={{ marginLeft: "200px", marginTop: "20px", width: "80%" }}
//               icons={tableIcons}
//               data={data}
//               columns={columns}
//               title="Product Management"
//               options={{
//                 filtering: true,
//                 pageSize: 5,
//                 pageSizeOptions: [5, 10, 20, 30, 40, 50],
//                 selection: true,
//                 exportButton: true,
//                 grouping: true,
//               }}
//               actions={[
//                 {
//                   tooltip: "Remove All Selected Products",
//                   icon: "delete",
//                   onClick: (evt, data) => {
//                     data.map((id) => {
//                       console.log(id._id, "ghjhkhkjhhkjkjhooogloglglglkg");
//                       dispatch(deleteProduct(id._id));
//                     });
//                   },
//                 },

//                 {
//                   tooltip: "download All Selected Bar Code",
//                   icon: "lot",
//                   onClick: (evt, data) => {
//                     data.map(async (id) => {
//                       setZipFolder(id.PID);
//                       setZip([...zip, id.PID]);

//                       clickZipDownload();
//                     });
//                   },
//                 },

//                 {
//                   tooltip: "download MRP All Selected Bar Code",
//                   icon: "2 down",
//                   onClick: (evt, data) => {
//                     data.map(async (id) => {
//                       alert(id.PID, "ghjhkhkjhhkjkjhooogloglglglkg");

//                       setZipMrp([...zipMrp, id.BarCodeMrpLink]);
//                       setZipFolder1(id.PID);
//                       clickMrpZipDownload();
//                     });
//                   },
//                 },
//               ]}
//             />
//           )}
//         </>
//       </Box>
//     </>
//   );
// }

// export default Home;
