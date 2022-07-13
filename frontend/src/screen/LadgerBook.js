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
import { GiButtonFinger } from "react-icons/gi";

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
function LadgerBook() {
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [credit, setCredit] = useState("");
  const [debit, setDebit] = useState("");
  const [expense, setExpense] = useState("category");

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
    { title: "Credit", field: "Credit" },
    { title: "Debit", field: "Debit" },
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
        height={250}
        width="90%"
        ml="250px"
      >
        <Center fontSize="40px" color="white">
          Ledger Book
        </Center>
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
                sx={{ marginLeft: "20px" }}
              >
                {showcategoryLadger &&
                  showcategoryLadger.map((data) => (
                    <option value={data.category}>{data.category}</option>
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
                placeholder="Details"
                _placeholder={{ color: "inherit" }}
                sx={{ marginLeft: "20px" }}
              />
            </VStack>
            <Box sx={{ marginLeft: "20px" }}></Box>

            <Select
              onChange={(e) => {
                setExpense(e.target.value);
              }}
              placeholder="Select category"
              size="md"
              sx={{ marginLeft: "20px" }}
            >
              <option value="category">Category</option>
              <option value="debit">Debit</option>
            </Select>
            <Box sx={{ marginLeft: "20px" }}></Box>
            {expense == "category" && (
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
                  sx={{ marginLeft: "20px" }}
                />
              </VStack>
            )}

            <Button type="submit">
              <GiButtonFinger></GiButtonFinger>
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
          title="Ledger Book"
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

export default LadgerBook;
