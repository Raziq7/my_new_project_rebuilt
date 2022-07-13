import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductExcel } from "../actions/productAction";
import * as xlsx from "xlsx";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetail } = useSelector((state) => {
    return state.productDetails;
  });

  const onHandler = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setFile(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello", file);
    dispatch(addProductExcel(file));
    navigate("/home");
  };
  return (
    <Flex
      minH={"70vh"}
      ml="auto"
      mr="auto"
      mb="auto"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={20}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Add New Product
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Select from Excel Sheet
        </Text>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormControl>
            <Input
              type="file"
              name="excel"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => {
                onHandler(e);
              }}
              required
              multiple
            />
          </FormControl>
          <Stack spacing={2}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Request to add product
            </Button>
            <Link to="/home">
              <Button
                ml="100px"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "red.500",
                }}
                type="submit"
              >
                Cancel
              </Button>
            </Link>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
