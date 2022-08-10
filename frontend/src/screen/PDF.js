import React from "react";
import Pdf from "react-to-pdf";

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
} from "@chakra-ui/react";

const ref = React.createRef();

export const PDF = ({ billInfo, qty, grand }) => {
  return (
    <>
      <div className="Post" ref={ref}>
        <TableContainer
          ml="30px"
          mr="auto"
          mt="50px"
          width={{
            sm: "100%",
            md: "100%",
            lg: "auto",
            xl: "auto",
          }}
        >
          <Table variant="simple">
            <TableCaption>Ukkens Vastralaya Billing</TableCaption>
            <Thead>
              <Tr>
                <Th>Product Name</Th>
                <Th>Price</Th>
                <Th>Qty</Th>
                <Th>Discount</Th>
                <Th>Size</Th>
                <Th>Brand</Th>
              </Tr>
            </Thead>

            <Tbody>
              {billInfo &&
                billInfo.map((data) => {
                  return (
                    <>
                      <Tr>
                        <Td>{data.ProductName}</Td>
                        <Td>{data.SellingPrice}</Td>

                        <Td>{data.qtyVal}</Td>

                        <Td> {data.Discount}</Td>
                        <Td>{data.Size}</Td>
                        <Td> {data.Brand}</Td>
                      </Tr>
                    </>
                  );
                })}
            </Tbody>
            <Text>TOTAL: {grand}</Text>
          </Table>
        </TableContainer>
      </div>

      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => (
          <Button sx={{ marginLeft: "35px" }} colorScheme="red" onClick={toPdf}>
            Download as PDF
          </Button>
        )}
      </Pdf>
    </>
  );
};
