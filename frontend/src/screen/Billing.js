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
} from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  billingAction,
  decreasBillingQty,
  increasQtyValue,
  deleteBillingPro,
} from "../actions/productAction";
import { PDF } from "./PDF";

function Billing() {
  const [billValue, setValue] = useState();
  const [billInfo, setBillInfo] = useState([]);
  const [billingForm, setBillForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState();
  const [qtyVal, setQtyVal] = useState(1);
  let qty = 1;

  const [visilblePdf, setVisiblePdf] = useState(false);
  const [grandTotal, setGrandTotal] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const dispacth = useDispatch();

  let { error, loading, BillDetail } = useSelector((state) => {
    return state.billing;
  });

  useEffect(() => {
    if (BillDetail) {
      setBillInfo([...billInfo, BillDetail]);
    }
  }, [BillDetail, deleteBillingPro]);

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
      console.log(index, "********");
      setBillInfo((prevState) => prevState.splice(index, 1));

      dispacth(deleteBillingPro(id));
    }
  };

  //INC QTY
  const incrementQty = (id) => {
    console.log("==================================");
    const index = billInfo.findIndex((i) => i._id == id);
    // console.log(index);

    console.log(billInfo[index].qtyVal);
    setQtyVal(billInfo[index].qtyVal);
    setQtyVal(qtyVal + 1);
    billInfo[index].qtyVal = qtyVal;
    dispacth(increasQtyValue(qty, id));

    // console.log(billInfo[index], " setQty(qty + 1); setQty(qty + 1);");
  };

  //DEC QTY

  const decrement = (id) => {
    console.log("==================================");
    const index = billInfo.findIndex((i) => i._id == id);
    console.log(index);

    if (billInfo[index].qtyVal) {
      if (billInfo[index].qtyVal !== 1) {
        setQtyVal(billInfo[index].qtyVal);
        setQtyVal(qtyVal - 1);
        billInfo[index].qtyVal = qtyVal;
        dispacth(decreasBillingQty(id));
      }
    }
  };

  //INITIAL VALUE
  let grand = 0;
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
        {!visilblePdf ? (
          <>
            {!billingForm && (
              <>
                <Button colorScheme="blue" onClick={onOpen}>
                  Enter Costomer Details
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
                        <FormLabel>Enter Customer Number</FormLabel>
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
                        Save
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
                        w="29"
                        name="excel"
                        onChange={(e) => {
                          setValue(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                      <Button type="submit">Search</Button>
                    </form>
                  </HStack>
                  <Text color="ActiveBorder">Costomer Name : {name} </Text>
                  <Text>Costomer Number : {phone} </Text>
                </VStack>
                {loading && <Progress size="xs" isIndeterminate />}
                {error && <h1>{error}</h1>}

                <TableContainer
                  ml="auto"
                  mt="50px"
                  mr="auto"
                  width={{
                    sm: "60%",
                    md: "650px",
                    lg: "800px",
                    xl: "70%",
                  }}
                >
                  <Table variant="simple">
                    <TableCaption>Ukkens Vastralaya Billing</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Product Name</Th>
                        <Th>Size</Th>

                        <Th>Brand</Th>
                        <Th>Discount</Th>

                        <Th>Price</Th>
                        <Th>Qty</Th>

                        <Th>Action</Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {billInfo &&
                        billInfo.map((data) => {
                          grand = grand + data.SellingPrice;
                          let qtyRate = data.SellingPrice * data.qtyVal;
                          grand = grand + qtyRate - data.SellingPrice;

                          return (
                            <>
                              {data.Qty < 5 && <Text>Low Product</Text>}
                              <Tr>
                                <Td>{data.ProductName}</Td>

                                <Td>{data.Size}</Td>

                                <Td> {data.Brand}</Td>
                                <Td> {data.Discount}</Td>

                                <Td>{data.SellingPrice}</Td>

                                <Td>{data.qtyVal}</Td>

                                <Td>
                                  <HStack>
                                    <AiOutlinePlus
                                      onClick={() => incrementQty(data._id)}
                                    />
                                    <AiOutlineMinus
                                      onClick={() => decrement(data._id)}
                                    />
                                  </HStack>
                                </Td>

                                <Td>
                                  {qty == 1 && (
                                    <MdDangerous
                                      onClick={() => removeItem(data._id)}
                                    />
                                  )}
                                </Td>
                              </Tr>
                            </>
                          );
                        })}
                    </Tbody>
                    <Text>TOTAL: {grand}</Text>
                  </Table>
                </TableContainer>

                {BillDetail && (
                  <Button
                    onClick={() => {
                      setGrandTotal(grand);
                      setVisiblePdf(true);
                    }}
                  >
                    Checkout
                  </Button>
                )}
              </>
            )}
          </>
        ) : (
          <PDF billInfo={billInfo} qty={qty} grand={grandTotal} />
        )}
      </Box>
    </>
  );
}

export default Billing;
