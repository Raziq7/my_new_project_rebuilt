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
  Input,
} from "@chakra-ui/react";

const ref = React.createRef();

export const PDF = ({ billInfo, qty, grand }) => {
  return (
    <>
      <div className="Post" ref={ref}>
        <TableContainer
          ml="auto"
          mt="50px"
          mr="auto"
          width={{
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
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
              </Tr>
            </Thead>

            <Tbody>
              {billInfo &&
                billInfo.map((data) => {
                  return (
                    <>
                      <Tr>
                        <Td>{data.ProductName}</Td>

                        <Td>{data.Size}</Td>
                        <Td> {data.Brand}</Td>
                        <Td> {data.Discount}</Td>

                        <Td>{data.SellingPrice}</Td>

                        <Td>{data.qtyVal}</Td>
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
          <Button colorScheme="red" onClick={toPdf}>
            Download as PDF
          </Button>
        )}
      </Pdf>
    </>
  );
};
