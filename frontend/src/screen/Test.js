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

import {
  chakra,
  Spacer,
  Stack,
  VStack,
  Text,
  Heading,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsArrowsExpand } from "react-icons/bs";

import { forwardRef, useEffect, useState } from "react";
import {
  AddladgerBookAction,
  ladgerBookAction,
  ladgerBookshow,
} from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Input, Select } from "@material-ui/core";

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
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
function Test() {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [credit, setCredit] = useState("");
  const [debit, setDebit] = useState("");

  const dispatch = useDispatch();
  let { loading, ladger } = useSelector((state) => {
    return state.ladgerBook;
  });

  let { showcategoryLadger } = useSelector((state) => {
    return state.ladgerBookshow;
  });

  console.log(showcategoryLadger, "showcategoryLadgershowcategoryLadger");
  let { addladger } = useSelector((state) => {
    return state.AddladgerBook;
  });

  console.log(ladger, "123456787");
  useEffect(() => {
    dispatch(ladgerBookAction());
    dispatch(ladgerBookshow());
  }, [addladger]);
  const [showPassword, setShowPassword] = useState(false);

  const columns = [
    // { title: "S.No", field: "S.No" },
    // { title: "Date", field: "Date" },
    { title: "Category", field: "Category" },
    { title: "Detaile", field: "Detaile" },
    { title: "Debit", field: "Debit" },
    { title: "Credit", field: "Credit" },
    { title: "Current Balnce", field: "Current_Balnce" },
    // { title: "Clossing Balnce", field: "Clossing Balnce" },
  ];

  const data =
    ladger &&
    ladger.map((ladg) => {
      return {
        Category: ladg.category,
        Detaile: ladg.details,
        Debit: ladg.debit,
        Credit: ladg.credit,
        Current_Balnce: ladg.balance,
      };
    });
  // options = {
  //   exportButton: true,
  //   exportCsv: (columns, data) => {
  //     alert("You should develop a code to export " + data.length + " rows");
  //   },
  // };

  ///submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      category,
      details,
      credit,
      debit,
    };
    dispatch(AddladgerBookAction(obj));
  };
  //background setup
  const basicBoxStyles = {
    justifyContent: "center",
    alignItems: "center",
    background:
      "url(https://media.istockphoto.com/photos/recycled-paper-texture-background-in-turquoise-green-blue-mint-color-picture-id1163827586?k=20&m=1163827586&s=612x612&w=0&h=M3h5PwbI2tBkj5oc-UCmhEIJX1wl8IVtr0XXfQaicVk=) center/cover no-repeat",
  };
  return (
    <VStack>
      <Box
        sx={basicBoxStyles}
        filter="grayscale(80%)"
        height={200}
        width="90%"
        ml="250px"
      >
        <form onSubmit={submitHandler}>
          <Box
            spacing={3}
            display={["block", "block", "block", "flex", "flex"]}
            alignItems="center"
            justifyContent="center"
            mt="80px"
          >
            <VStack mb="28px">
              <Text>Select Category</Text>
              <Select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                placeholder="Select category"
                size="md"
              >
                {showcategoryLadger &&
                  showcategoryLadger.map((data) => (
                    <option value={data.category}>{data.category}</option>
                  ))}
              </Select>
            </VStack>
            <Divider />
            <Input
              onChange={(e) => {
                setDetails(e.target.value);
              }}
              placeholder="Details"
              _placeholder={{ color: "inherit" }}
            />
            <Divider />
            <BsArrowsExpand />

            <Input
              onChange={(e) => {
                setCredit(e.target.value);
              }}
              focusBorderColor="red"
              placeholder="Credit"
              _placeholder={{ color: "inherit" }}
              type="number"
            />
            <Input
              onChange={(e) => {
                setDebit(e.target.value);
              }}
              focusBorderColor="red"
              placeholder="Debit"
              _placeholder={{ color: "inherit" }}
              type="number"
            />
            <Button type="submit" variantColor="green">
              ADD
            </Button>
          </Box>
        </form>
      </Box>
      {loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <MaterialTable
          style={{ marginLeft: "200px", marginTop: "20px", width: "80%" }}
          icons={tableIcons}
          data={data}
          columns={columns}
          title="Ladger Book"
          options={{
            filtering: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 30, 40, 50],
            exportButton: {
              csv: true,
              pdf: false,
            },

            exportAllData: true,
          }}
        />
      )}
    </VStack>
  );
}

export default Test;

// import {
//   Button,
//   Checkbox,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Link,
//   Stack,
//   Image,
//   Text,
// } from "@chakra-ui/react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { staffLogin } from "../actions/staffAction";
// import { useEffect } from "react";
// import Messege from "../components/Messege";

// export default function Test() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const staffLoginData = useSelector((state) => {
//     return state.staffLginData;
//   });
//   let { loding, staffInfo } = staffLoginData;

//   const loginMsg = useSelector((state) => {
//     return state.staffLginData;
//   });
//   let { error } = loginMsg;

//   useEffect(() => {
//     let isStaff = localStorage.getItem("staffInfo")
//       ? JSON.stringify(localStorage.getItem("staffInfo"))
//       : null;
//     if (isStaff) {
//       navigate("/");
//     }
//   }, [staffInfo]);

//   //validatio form
//   const validate = (values) => {
//     const errors = {};

//     if (!values.email) {
//       errors.email = "Required";
//     } else if (values.email.length <= 3) {
//       errors.email = "Must be 4 characters or More";
//     }

//     if (!values.password) {
//       errors.password = "Required";
//     } else if (values.password.length < 4) {
//       errors.password = "Must be 4 Characters or More";
//     } else if (values.password === "123456") {
//       errors.password = "Must Not be 123456";
//     }
//     return errors;
//   };

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validate,
//     onSubmit: (values) => {
//       dispatch(staffLogin(values));
//     },
//   });

//   return (
//     <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
//       <Flex p={8} flex={1} align={"center"} justify={"center"}>
//         <Stack spacing={4} w={"full"} maxW={"md"}>
//           <Heading fontSize={"2xl"}>Sign in to your account</Heading>
//           {error && <Messege variant="danger">{error}</Messege>}

//           <form onSubmit={formik.handleSubmit}>
//             <FormControl id="email">
//               <FormLabel>Email address</FormLabel>
//               <Input
//                 onChange={formik.handleChange}
//                 value={formik.values.email}
//                 onBlur={formik.handleBlur}
//                 type="email"
//                 placeholder="Enter Your Email"
//                 aria-label="Email"
//                 name="email"
//               />
//             </FormControl>
//             {formik.errors.email ? (
//               <Text color="tomato">{formik.errors.email}</Text>
//             ) : null}
//             <FormControl id="password">
//               <FormLabel>Password</FormLabel>
//               <Input
//                 onChange={formik.handleChange}
//                 value={formik.values.password}
//                 onBlur={formik.handleBlur}
//                 type="password"
//                 placeholder="Enter Your Password"
//                 aria-label="Password"
//                 name="password"
//               />
//             </FormControl>
//             {formik.errors.password ? (
//               <Text color="tomato">{formik.errors.password}</Text>
//             ) : null}
//             <Stack spacing={6}>
//               {/* <Stack
//               direction={{ base: "column", sm: "row" }}
//               align={"start"}
//               justify={"space-between"}
//             >
//               {/* <Checkbox>Remember me</Checkbox> */}
//               {/* <Link color={"blue.500"}>Forgot password?</Link> */}
//               {/* </Stack> */}
//               <Button type="submit" colorScheme={"blue"} variant={"solid"}>
//                 Sign in
//               </Button>
//             </Stack>
//           </form>
//         </Stack>
//       </Flex>
//       <Flex flex={1}>
//         <Image
//           alt={"Login Image"}
//           objectFit={"cover"}
//           src={"images/4231726.jpg"}
//         />
//       </Flex>
//     </Stack>
//   );
// }
