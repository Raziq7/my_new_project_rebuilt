import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Stack,
  Box,
  Center,
} from "@chakra-ui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { Link as ReachLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseData } from "../actions/productAction";

function ParchaseStock() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchaseData());
  }, []);

  let { loading, purchaseData } = useSelector((state) => {
    return state.purcaseDetails;
  });

  console.log("*/*/656565654654654654", purchaseData);
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
                  <Th>Material Type</Th>
                  <Th>Max Qty</Th>
                  <Th>Max Meter</Th>
                  <Th>Qty</Th>
                  <Th>Qty In Meter</Th>
                  <Th>vendor Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>

              {purchaseData.map((data) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>{data.productName}</Td>

                      <Td>{data.productItemDetails.proSize}</Td>
                      <Td>{data.productItemDetails.proColor}</Td>
                      <Td>{data.brand}</Td>
                      <Td>{data.meterial}</Td>
                      <Td>{data.productItemDetails.MaxQty}</Td>
                      <Td>{data.productItemDetails.meterQty}</Td>
                      <Td>{data.productItemDetails.qty}</Td>

                      <Td>{data.meterialType}</Td>
                      {/* <Td>details.selectQty</Td> */}
                      <Td>{data.vendorName}</Td>
                      {/* <Td>
                        <Button size="sm" colorScheme="teal" mt="10px">
                          Apdate
                        </Button>
                      </Td> */}
                    </Tr>
                  </Tbody>
                );
              })}

              <Tfoot>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Size</Th>
                  <Th>Color</Th>
                  <Th>Brand</Th>
                  <Th>Max Qty</Th>
                  <Th>Max Meter</Th>
                  <Th>Qty</Th>
                  <Th>Qty In Meter</Th>
                  <Th>Material Type</Th>
                  <Th>vendor Name</Th>
                  <Th>Action</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

export default ParchaseStock;
