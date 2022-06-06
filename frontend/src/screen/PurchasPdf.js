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

export const PurchasPdf = ({ dataFilter }) => {
  return (
    <>
      <div className="Post" ref={ref}>
        <TableContainer
          ml="50px"
          mb="500px"
          mr="auto"
          width={{
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
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
                    </Tr>
                  </Tbody>
                );
              })}
          </Table>
        </TableContainer>
      </div>

      <Pdf targetRef={ref} filename="post.pdf">
        {({ toPdf }) => (
          <Button
            style={{ marginBottom: "150px" }}
            colorScheme="red"
            onClick={toPdf}
          >
            Download as PDF
          </Button>
        )}
      </Pdf>
    </>
  );
};
