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
  Button,
  Spacer,
  Divider,
  Image,
  Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, showProductAction } from "../actions/productAction";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //selector
  let productDetail = useSelector((state) => {
    return state.showProInfo;
  });
  let { loading, showProduct, error } = productDetail;

  const { deleteDetail } = useSelector((state) => {
    return state.deleteInfo;
  });

  useEffect(() => {
    if (deleteDetail) {
      console.log(deleteDetail, "deleteDetaildeleteDetail");
    }
  }, [deleteDetail]);

  useEffect(() => {
    dispatch(showProductAction());
  }, []);

  const editPro = () => {};

  //delete
  const deletePro = (proId) => {
    dispatch(deleteProduct(proId));
  };

  return (
    <TableContainer>
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
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Product Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Market Price</Th>
              <Th>Selling Price</Th>
              <Th>Discount Price</Th>
              <Th>Main Category</Th>
              <Th>Sub Category</Th>
              <Th>Size</Th>
              <Th>Vendor Code</Th>
              <Th>Bar Code</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          {showProduct.showProduct.map((data) => {
            console.log(data.productName, "hello");

            return (
              <Tbody key={data._id}>
                <Tr>
                  <Td>{data.productName}</Td>
                  <Td>{data.description}</Td>
                  <Td isNumeric>{data.marketPrice}</Td>
                  <Td>{data.sellingPrice}</Td>
                  <Td>{data.discountPrice}</Td>
                  <Td>{data.mainCategory}</Td>
                  <Td>{data.subCategory}</Td>
                  <Td>{data.size}</Td>
                  <Td>{data.vendorCode}</Td>
                  <Td>
                    <Image src={data.barcode} alt="Dan Abramov" />
                  </Td>

                  <Td></Td>

                  <Td>
                    <Button
                      onClick={() => {
                        editPro(data._id);
                      }}
                      colorScheme="teal"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Spacer />
                    <Divider />
                    <Button
                      onClick={() => {
                        deletePro(data._id);
                      }}
                      colorScheme="red"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </Tbody>
            );
          })}

          <Tfoot>
            <Tr>
              <Th>Product Name</Th>
              <Th>Description</Th>
              <Th isNumeric>Market Price</Th>
              <Th>Selling Price</Th>
              <Th>Discount Price</Th>
              <Th>Main Category</Th>
              <Th>Sub Category</Th>
              <Th>Size</Th>
              <Th>Vendor Code</Th>
              <Th>Bar Code</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      )}
    </TableContainer>
  );
}

export default Home;
