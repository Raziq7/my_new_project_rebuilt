import React, { useEffect, useState } from "react";
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

  let { loading, purchaseData } = useSelector((state) => {
    return state.purcaseDetails;
  });

  const { increaseStock } = useSelector((state) => {
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

  const incStock = (e) => {
    e.preventDefault();
    dispatch(increasStockValue(increasStock, dataId));
  };

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
  return (
    <>
      {loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : !pdf ? (
        <Box overflowY="auto" mb="auto" ml="auto" mr="auto">
          <Center fontSize="40px" color="teal">
            Purchase Stock
          </Center>
          <Flex justifyContent="space-between">
            <Box ml="200px">
              <Button
                on
                onClick={() => {
                  setPdf(true);
                }}
              >
                Download PDF
              </Button>
            </Box>
            <Box mr="200px">
              <form onSubmit={submitHandler}>
                <Input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search"
                  w="auto"
                />
                <Button ml="5px" type="submit">
                  Search
                </Button>
              </form>
            </Box>
          </Flex>
          <TableContainer
            ml="auto"
            mr="auto"
            width={{
              sm: "60%",
              md: "650px",
              lg: "800px",
              xl: "70%",
            }}
          >
            <Table variant="simple">
              <TableCaption>Ukkens Vastralaya Parchase Stocks</TableCaption>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Size</Th>
                  <Th>Color</Th>
                  <Th>Brand</Th>
                  <Th>Material</Th>
                  <Th>Max Qty</Th>
                  <Th>Min Stock</Th>
                  <Th>Price</Th>
                  <Th>vendor Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>

              {dataFilter &&
                dataFilter.map((data) => {
                  return (
                    <Tbody>
                      <Tr>
                        <Td>{data.ProductName ? data.ProductName : "null"}</Td>

                        <Td>{data.Size ? data.Size : "null"}</Td>
                        <Td>{data.Color ? data.Color : "null"}</Td>
                        <Td>{data.Brand ? data.Brand : "null"}</Td>
                        <Td>{data.MaterialType}</Td>
                        <Td>{data.MaxStock ? data.MaxStock : "null"}</Td>

                        <Td>{data.MinStock ? data.MinStock : "null"}</Td>

                        <Td>{data.SellingPrice}</Td>
                        <Td>{data.VendorName ? data.VendorName : "null"}</Td>
                        <Td>
                          <Button
                            onClick={() => {
                              setCheck(true);
                              console.log(check);
                            }}
                          >
                            Update Product
                          </Button>
                        </Td>
                        {check == true && (
                          <Td>
                            <form onSubmit={incStock}>
                              <Input
                                onChange={(e) => {
                                  setincreasStock(e.target.value);
                                  setDataId(data._id);
                                }}
                                htmlSize={4}
                                width="auto"
                                name="incStock"
                              />
                              <Button
                                colorScheme="teal"
                                size="sm"
                                type="submit"
                              >
                                Add
                              </Button>
                            </form>
                          </Td>
                        )}
                      </Tr>
                    </Tbody>
                  );
                })}
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <PurchasPdf dataFilter={dataFilter} />
      )}
    </>
  );
}

export default ParchaseStock;
