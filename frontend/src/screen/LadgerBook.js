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
import { MdDelete } from "react-icons/md";

import {
  chakra,
  Stack,
  VStack,
  Text,
  Center,
  Skeleton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import { forwardRef, useEffect, useRef, useState } from "react";
import {
  AddladgerBookAction,
  ladgerBookAction,
  ladgerBookshow,
  ledgerDeleteAction,
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
function LadgerBook() {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [credit, setCredit] = useState("");
  const [debit, setDebit] = useState("");
  const [expense, setExpense] = useState("credit");

  const dispatch = useDispatch();
  let { loading, ladger } = useSelector((state) => {
    return state.ladgerBook;
  });

  let { showcategoryLadger } = useSelector((state) => {
    return state.ladgerBookshow;
  });

  let { addladger } = useSelector((state) => {
    return state.AddladgerBook;
  });

  let { deleteLadger } = useSelector((state) => {
    return state.ledgerDelete;
  });

  console.log(ladger, "123456787");
  useEffect(() => {
    dispatch(ladgerBookAction());
    dispatch(ladgerBookshow());
  }, [addladger, deleteLadger]);

  const columns = [
    { title: "Category", field: "Category" },
    { title: "Detaile", field: "Detaile" },
    { title: "Credit", field: "Credit" },
    { title: "Debit", field: "Debit" },
    { title: "Current Balnce", field: "Current_Balnce" },
    { title: "Action", field: "Action" },
  ];

  const data =
    ladger &&
    ladger.map((ladg) => {
      return {
        Category: ladg.category,
        Detaile: ladg.details,
        Debit: ladg.debit,
        Credit: ladg.credit,
        Current_Balnce: ladg.balance.toLocaleString("en-US"),
        Action: (
          <>
            <MdDelete onClick={() => dispatch(ledgerDeleteAction(ladg._id))} />
          </>
        ),
      };
    });

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
  const [color, setColor] = useState("white");
  const bg = useColorModeValue("#C9BBBB", "black");

  useEffect(() => {
    if (bg == "black") {
      setColor("#242935");
      console.log(bg, "bgbgbgbgbgbgbg");
    } else {
      setColor("white");
    }
  }, [bg]);

  return (
    <>
      <VStack width="95%">
        <Box>
          <Center fontSize="40px" color="teal" style={{ marginBottom: "10px" }}>
            Ledger Book
          </Center>
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: color,
            width: "90%",
          }}
          backgroundColor={color}
          filter="grayscale(80%)"
          height={250}
          boxShadow="2xl"
          style={{ marginBottom: "10px" }}
        >
          <form onSubmit={submitHandler}>
            <Box
              spacing={3}
              display={["block", "block", "block", "flex", "flex"]}
              alignItems="center"
              justifyContent="center"
              mt="80px"
            >
              <VStack mb="28px" w="150px">
                <Text>Select Category</Text>
                <Select
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  placeholder="Select category"
                  size="md"
                  style={{ marginLeft: "15px", width: "100px" }}
                >
                  {showcategoryLadger &&
                    showcategoryLadger.map((data) => (
                      <option
                        style={{ marginLeft: "15px" }}
                        value={data.category}
                      >
                        {data.category}
                      </option>
                    ))}
                </Select>
              </VStack>
              <Divider />
              <VStack mb="28px">
                <Text>Enter Details</Text>
                <Input
                  onChange={(e) => {
                    setDetails(e.target.value);
                  }}
                  backgroundColor={color == "dark" && "wheat"}
                  placeholder="Details"
                  _placeholder={{ color: "inherit" }}
                  sx={{ marginLeft: "15px" }}
                />
              </VStack>
              <Box sx={{ marginLeft: "20px" }}></Box>
              <VStack mb="28px">
                <Text>Select Type</Text>

                <Select
                  onChange={(e) => {
                    setExpense(e.target.value);
                  }}
                  placeholder="Select category"
                  size="md"
                  style={{ marginLeft: "15px", width: "100px" }}
                >
                  <option style={{ marginLeft: "15px" }} value="credit">
                    Credit
                  </option>
                  <option style={{ marginLeft: "15px" }} value="debit">
                    Debit
                  </option>
                </Select>
              </VStack>

              <Box sx={{ marginLeft: "20px" }}></Box>
              {expense == "credit" && (
                <VStack mb="28px">
                  <Text>Credit</Text>
                  <Input
                    onChange={(e) => {
                      setCredit(e.target.value);
                    }}
                    focusBorderColor="red"
                    placeholder="Credit"
                    _placeholder={{ color: "inherit" }}
                    type="number"
                  />
                </VStack>
              )}

              {expense == "debit" && (
                <VStack mb="28px">
                  <Text>Debit</Text>
                  <Input
                    onChange={(e) => {
                      setDebit(e.target.value);
                    }}
                    focusBorderColor="red"
                    placeholder="Debit"
                    _placeholder={{ color: "inherit" }}
                    type="number"
                    sx={{ marginLeft: "15px" }}
                  />
                </VStack>
              )}

              <Button
                style={{
                  backgroundColor: "#008081",
                  marginLeft: "15px",
                  color: "white",
                }}
                type="submit"
                width="100px"
                boxShadow="2xl"
                rounded="xl"
              >
                Add Ledger
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
            style={{ marginLeft: "5px", marginBottom: "50px", width: "90%" }}
            icons={tableIcons}
            data={data}
            columns={columns}
            title="Ledger Book"
            options={{
              filtering: true,
              pageSize: 5,
              pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
              exportButton: {
                csv: true,
                pdf: false,
              },
              exportAllData: true,
              grouping: true,
            }}
          />
        )}
      </VStack>
    </>
  );
}

export default LadgerBook;
