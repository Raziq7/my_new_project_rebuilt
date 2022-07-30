import React, { forwardRef, useEffect, useState } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Stack,
  Box,
  Center,
  Checkbox,
  Button,
  Input,
  Flex,
  Text,
  useToast,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseData, increasStockValue } from "../actions/productAction";
import { PurchasPdf } from "./PurchasPdf";

function ParchaseStock() {
  console.log("render");
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [increasStock, setincreasStock] = useState();
  const [search, setSearch] = useState("");
  const [dataId, setDataId] = useState();
  const [dataFilter, setDataFilter] = useState([]);
  const [pdf, setPdf] = useState(false);
  const toast = useToast();

  let { loading, purchaseData } = useSelector((state) => {
    return state.purcaseDetails;
  });

  const { increaseStock, error } = useSelector((state) => {
    return state.increasStockValue;
  });

  useEffect(() => {
    if (purchaseData) {
      setDataFilter(purchaseData);
      console.log(dataFilter, "54654646654654");
    }
  }, [purchaseData]);

  useEffect(() => {
    dispatch(getPurchaseData());
  }, [increaseStock]);

  useEffect(() => {
    if (increaseStock) {
      toast({
        title: " Product Quantity increased.",
        description: `Product Quantity increased as ${increasStock}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [increaseStock]);

  const incStock = (e) => {
    e.preventDefault();
    dispatch(increasStockValue(increasStock, dataId));
  };

  //data Meterial
  let data =
    dataFilter &&
    dataFilter.map((data) => {
      console.log(
        data,
        "Uncaught TypeError: row is undefined viewStaffviewStaffviewStaffviewStaffviewStaff"
      );
      // if (!data.superAdmin)
      return {
        ProductName: data.ProductName,
        Size: data.Size,
        Brand: data.Brand,
        MaterialType: data.MaterialType,
        MaxStock: data.MaxStock,
        MinStock: data.MinStock,
        SellingPrice: data.SellingPrice,
        VendorName: data.VendorName,
        Action: (
          // if (!data.superAdmin)
          <Button
            onClick={() => {
              setCheck(true);
              console.log(check);
            }}
          >
            Add Stock
          </Button>
        ),
        Add:
          check == true ? (
            <form onSubmit={incStock}>
              <Text>Purchased Quantity</Text>
              <HStack>
                <Input
                  placeholder="Purchased Quantity"
                  onChange={(e) => {
                    setincreasStock(e.target.value);
                    setDataId(data._id);
                  }}
                  htmlSize={4}
                  width="auto"
                  name="incStock"
                />
                <Button colorScheme="teal" size="sm" type="submit">
                  Add
                </Button>
              </HStack>
            </form>
          ) : null,
        _id: data._id,
      };
    });

  const submitHandler = (e) => {
    e.preventDefault();
    const filteredRows = dataFilter.filter((row) => {
      return row.ProductName.toString()
        .toLowerCase()
        .includes(search.toString().toLowerCase());
    });
    if (search.length < 1) {
      setDataFilter(dataFilter);
    } else {
      setDataFilter(filteredRows);
    }
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

  const columns = [
    {
      title: "Product Name",
      field: "ProductName",
    },
    { title: "Size", field: "Size" },
    { title: "Color", field: "Color" },

    { title: "Brand", field: "Brand" },
    { title: "Material", field: "Material" },
    { title: "Max Qty", field: "MaxQty" },
    { title: "Min Stock", field: "MinStock" },
    { title: "Price", field: "Price" },
    { title: "vendor Name", field: "vendorName" },

    {
      title: "Action",
      field: "Action",
    },

    {
      title: "Add",
      field: "Add",
    },
  ];

  return (
    <>
      <Box overflowY="auto" mb="auto" ml="auto" mr="auto">
        <Center fontSize="40px" color="teal" mt="10px">
          Purchase Stock
        </Center>
        {error &&
          toast({
            title: error,
            position: "top",
            isClosable: true,
            status: "error",
          })}
        {loading ? (
          <Box h="500px" display="flex">
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>{" "}
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
          </Box>
        ) : (
          <MaterialTable
            style={{
              marginLeft: 10,
              marginTop: "20px",
              width: "100%",
            }}
            icons={tableIcons}
            data={data}
            columns={columns}
            title="Purchase Stock"
            options={{
              filtering: true,
              pageSize: 5,
              pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
              // selection: true,
              exportButton: true,
              grouping: true,
            }}
          />
        )}
      </Box>
    </>
  );
}

export default ParchaseStock;
