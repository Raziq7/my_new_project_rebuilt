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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseData, increasStockValue } from "../actions/productAction";

function Sample() {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [increasStock, setincreasStock] = useState();
  const [dataId, setDataId] = useState();

  let { loading, purchaseData } = useSelector((state) => {
    return state.purcaseDetails;
  });

  const { increaseStock } = useSelector((state) => {
    return state.increasStockValue;
  });

  useEffect(() => {
    dispatch(getPurchaseData());
  }, [increaseStock]);

  const incStock = (e) => {
    e.preventDefault();
    dispatch(increasStockValue(increasStock, dataId));
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
      ) : (
        <Box overflowY="auto" mb="auto">
          <Center fontSize="40px" color="teal">
            Purchase Stock
          </Center>
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
                  <Th>Qty</Th>
                  <Th>Material Type</Th>
                  <Th>vendor Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>

              {purchaseData !== null &&
                purchaseData.map((data) => {
                  console.log(data, "455555555");
                  return (
                    <Tbody>
                      <Tr>
                        <Td>{data.productName ? data.productName : null}</Td>

                        <Td>
                          {data.productItemDetails[0].proSize
                            ? data.productItemDetails[0].proSize
                            : null}
                        </Td>
                        <Td>
                          {data.productItemDetails[0].proColor
                            ? data.productItemDetails[0].proColor
                            : null}
                        </Td>
                        <Td>{data.brand ? data.brand : null}</Td>
                        <Td>{data.meterial}</Td>
                        <Td>
                          {data.productItemDetails[0].MaxQty
                            ? data.productItemDetails[0].MaxQty
                            : null}
                        </Td>

                        <Td>
                          {data.productItemDetails[0].qty
                            ? data.productItemDetails[0].qty
                            : null}
                        </Td>

                        <Td>{data.productItemDetails[0].selectQty}</Td>
                        <Td>{data.vendorName ? data.vendorName : null}</Td>
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
                        {check == true ? (
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
                        ) : null}
                      </Tr>
                    </Tbody>
                  );
                })}
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

export default Sample;
