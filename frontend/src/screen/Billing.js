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
  Flex,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
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
import { useNavigate } from "react-router-dom";

function Billing() {
  const [billValue, setValue] = useState();
  const [billInfo, setBillInfo] = useState([]);
  const [billingForm, setBillForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [qtyVal, setQtyVal] = useState(1);
  const [qtyErr, setQtyErr] = useState();
  const [gst, setGst] = useState(0);

  let qty = 1;

  const [visilblePdf, setVisiblePdf] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

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
    { title: "MRP", field: "MRP" },
    { title: "subtotal(per unit)", field: "SubtotalUnit" },
    { title: "subtotal( x QTY)", field: "Subtotal" },
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
      grand = grand + data.SellingPrice - data.Discount;
      let qtyRate = data.SellingPrice * data.qtyVal;
      grand = grand + qtyRate - data.SellingPrice;
      return {
        ProductName: data.ProductName,
        Size: data.Size,
        Brand: data.Brand,
        Discount: data.Discount,
        MRP: data.SellingPrice.toLocaleString("en-US"),
        SubtotalUnit: data.SellingPrice - data.Discount,
        Subtotal: data.qtyVal * data.SellingPrice - data.Discount,
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

  useEffect(() => {
    if (visilblePdf) {
      setVisiblePdf(false);
      Swal.fire({
        title: "Have you Taken the print out ?",
        text: "You can't print it out later !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, checkout it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispacth(checkoutBill(billInfo, grand));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Billing has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location("/billing");
        }
      });
    }
  }, [visilblePdf]);

  //events
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!billInfo.length == 0) {
      billInfo.map((i) => {
        if (i.PID == billValue) {
          i.qtyVal += 1;
          setQtyVal(i.qtyVal);
        } else {
          dispacth(billingAction(billValue));
        }
      });
    } else {
      dispacth(billingAction(billValue));
    }
    setValue("");
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

  //Gst
  const gstSubmit = (e) => {
    e.preventDefault();
    let gstcont = parseInt(gst);
    grand += gstcont;
    setGrandTotal(grand);
    setGst("");
  };
  return (
    <>
      <Box
        display={["block", "block", "block", "block", "block"]}
        minH={"10vh"}
        ml="auto"
        mr="auto"
        mb="auto"
        mt="20px"
        width="100%"
      >
        <Center fontSize="40px" color="teal" mt="10px">
          Billing Managment
        </Center>
        {!billingForm && (
          <>
            <Center>
              <Button mt="25px" ml="10px" colorScheme="blue" onClick={onOpen}>
                Enter customer Details
              </Button>
            </Center>

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
                  <Button onClick={saveDetailClick} colorScheme="blue" mr={3}>
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
                width: "95%",
              }}
              icons={tableIcons}
              data={data}
              columns={columns}
              title="Billing Managment"
              options={{
                filtering: true,
                pageSize: 5,
                pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
                exportButton: true,
                grouping: true,
              }}
            />
            <Box mt="15px" ml="300px" width="50%">
              <form onSubmit={gstSubmit}>
                <FormLabel>Enter GST</FormLabel>
                <HStack>
                  <Input
                    onChange={(e) => setGst(e.target.value)}
                    ref={initialRef}
                    placeholder="GST"
                    value={gst}
                    type="number"
                    bg="white"
                  />
                  <Button bg="#16134F" colorScheme="#16134F" type="submit">
                    Add Gst
                  </Button>
                </HStack>
              </form>
            </Box>
            <Flex ml="300px">
              <Box
                mt="30px"
                boxShadow="xl"
                rounded="xl"
                w="150px"
                bg="#16134F"
                h="25px"
              >
                <Center>
                  <Text color="white">
                    TOTAL: {grand.toLocaleString("en-US")}
                  </Text>
                </Center>
              </Box>

              <Box
                sx={{ marginTop: "30px" }}
                boxShadow="xl"
                rounded="xl"
                w="170px"
                bg="#16134F"
                h="25px"
                ml="10px"
              >
                <Center>
                  <Text color="white">
                    Total With Gst:{" "}
                    {!grandTotal == 0
                      ? grandTotal
                      : grand.toLocaleString("en-US")}
                  </Text>
                </Center>
              </Box>
              {BillDetail && (
                <Button
                  onClick={() => {
                    setGrandTotal(grand);
                    setVisiblePdf(true);
                  }}
                  background="teal"
                  color="white"
                  mt="25px"
                  ml="100px"
                >
                  Checkout
                </Button>
              )}
            </Flex>
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
