import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
  Button,
  Input,
  HStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  VStack,
  Progress,
  useToast,
  Center,
  useColorModeValue,
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

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { billingAction, checkoutBill } from "../actions/productAction";
import { PDF } from "./PDF";

function Billing() {
  const [billValue, setValue] = useState();
  const [billInfo, setBillInfo] = useState([]);
  const [billingForm, setBillForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [qtyVal, setQtyVal] = useState(1);
  const [qtyErr, setQtyErr] = useState();
  let qty = 1;

  const [visilblePdf, setVisiblePdf] = useState(false);
  const [grandTotal, setGrandTotal] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const dispacth = useDispatch();

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
    { title: "Size", field: "Size" },
    { title: "Brand", field: "Brand" },

    { title: "Discount", field: "Discount" },
    { title: "Price", field: "Price" },
    { title: "Qty", field: "Qty" },

    {
      title: "Action",
      field: "Action",
    },
  ];

  let { error, loading, BillDetail } = useSelector((state) => {
    return state.billing;
  });

  useEffect(() => {
    if (BillDetail) {
      setBillInfo([...billInfo, BillDetail]);
    }
  }, [BillDetail]);

  //INITIAL VALUE
  let grand = 0;
  //data Meterial
  let data =
    billInfo &&
    billInfo.map((data) => {
      grand = grand + data.SellingPrice;
      let qtyRate = data.SellingPrice * data.qtyVal;
      grand = grand + qtyRate - data.SellingPrice;
      return {
        ProductName: data.ProductName,
        Size: data.Size,
        Brand: data.Brand,
        Discount: data.Discount,
        Price: data.SellingPrice,
        Qty: (
          <HStack>
            <AiOutlineMinus onClick={() => decrement(data._id)} />
            <Text>{data.qtyVal}</Text>
            <AiOutlinePlus onClick={() => incrementQty(data._id)} />
          </HStack>
        ),

        Action: qty == 1 && (
          <MdDangerous onClick={() => removeItem(data._id)} />
        ),
        _id: data._id,
      };
    });

  useEffect(() => {
    if (qtyVal == 1) {
      setQtyVal(1);
    }
  }, [qtyVal]);

  //events
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("heelo", billValue);
    dispacth(billingAction(billValue));
  };

  const saveDetailClick = () => {
    console.log(name);
    console.log(phone);
    setBillForm(true);
  };

  //removeItem
  const removeItem = (id) => {
    if (billInfo.length == 1) {
      setBillInfo([]);
    } else {
      const index = billInfo.findIndex((i) => i.id !== id);
      setBillInfo((prevState) => prevState.splice(index, 1));
    }
  };
  const toast = useToast({
    position: "top",
    title: "Out Of Stock",
    containerStyle: {
      width: "800px",
      maxWidth: "100%",
    },
  });
  //INC QTY
  const incrementQty = async (id) => {
    console.log("==================================");
    const index = billInfo.findIndex((i) => i._id == id);
    if (billInfo[index].qtyVal === undefined || null) {
      billInfo[index].qtyVal = 1;
      setQtyVal(billInfo[index].qtyVal);
    }
    await setQtyVal(billInfo[index].qtyVal);
    console.log(billInfo[index]);
    if (billInfo[index].Qty < qtyVal) {
      // setQtyErr("Sorry No Stock There");
      toast({
        containerStyle: {
          border: "20px solid red",
        },
      });
    } else {
      setQtyVal(qtyVal + 1);
      billInfo[index].qtyVal = qtyVal;
    }
  };

  //DEC QTY

  const decrement = async (id) => {
    const index = billInfo.findIndex((i) => i._id == id);
    console.log(index);

    if (billInfo[index].qtyVal) {
      if (billInfo[index].qtyVal !== 1) {
        await setQtyVal(billInfo[index].qtyVal);
        setQtyVal(qtyVal - 1);
        setQtyErr("");
        billInfo[index].qtyVal = qtyVal;
        // dispacth(decreasBillingQty(id));
      }
    }
  };
  const bg = useColorModeValue("#C9BBBB", "black");

  return (
    <>
      <Box
        display={["block", "block", "block", "block", "block"]}
        minH={"10vh"}
        ml="auto"
        mr="auto"
        mb="auto"
        mt="20px"
      >
        <Center fontSize="40px" color="teal" mt="10px">
          Billing Managment
        </Center>
        {!visilblePdf && (
          <>
            {!billingForm && (
              <>
                <Button ml="50px" colorScheme="blue" onClick={onOpen}>
                  Enter customer Details
                </Button>

                <Modal
                  initialFocusRef={initialRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Enter Customer Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>
                        <FormLabel>Customer Name</FormLabel>
                        <Input
                          onChange={(e) => setName(e.target.value)}
                          ref={initialRef}
                          placeholder="Name"
                        />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>customer contact number</FormLabel>
                        <Input
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number"
                          type="number"
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        onClick={saveDetailClick}
                        colorScheme="blue"
                        mr={3}
                      >
                        Proceed to billing
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )}

            {billingForm && (
              <>
                <VStack>
                  <HStack>
                    <form onSubmit={handleSubmit}>
                      <Input
                        type="number"
                        border="solid"
                        background="white"
                        placeholder="Enter the Billing ID"
                        w="29"
                        name="excel"
                        value={billValue}
                        onChange={(e) => {
                          setValue(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                      <Button
                        ml="5px"
                        type="submit"
                        backgroundColor="#16134F"
                        color="white"
                      >
                        Add to cart
                      </Button>
                    </form>
                  </HStack>
                  <Text color="ActiveBorder">Enter Name : {name} </Text>
                  <Text>Enter contact Number : {phone} </Text>
                </VStack>
                {loading && <Progress size="xs" isIndeterminate />}
                {error && <h1>{error}</h1>}

                <MaterialTable
                  style={{
                    marginLeft: "50px",
                    marginTop: "20px",
                    width: "100%",
                  }}
                  icons={tableIcons}
                  data={data}
                  columns={columns}
                  title="User Management"
                  options={{
                    filtering: true,
                    pageSize: 3,
                    pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
                    exportButton: true,
                    grouping: true,
                    rowStyle: {
                      fontFamily: "Mulish-Regular",
                      backgroundColor: bg,
                      color: "#FFFFFF",
                    },
                    headerStyle: {
                      fontFamily: "Mulish-Regular",
                      fontSize: "1.1em",
                      fontWeight: "600",
                      color: "#FFFFFF",
                      backgroundColor: bg,
                    },
                  }}
                />
                <Box
                  mt="20px"
                  boxShadow="xl"
                  rounded="xl"
                  w="150px"
                  bg="#16134F"
                >
                  <Center>
                    <Text color="white">TOTAL: {grand}</Text>
                  </Center>
                </Box>
                {/* {BillDetail && (
                  <Button
                    onClick={() => {
                      setGrandTotal(grand);
                      setVisiblePdf(true);
                      dispacth(checkoutBill(billInfo, grand));
                    }}
                    background="teal"
                    color="white"
                    mt="15px"
                    ml="15px"
                  >
                    Checkout
                  </Button>
                )} */}
              </>
            )}
          </>
        )}

        {/* // : (
        //   // <PDF billInfo={billInfo} qty={qty} grand={grandTotal} />
        // )} */}
      </Box>
    </>
  );
}

export default Billing;
