import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Text,
  Skeleton,
  Stack,
  HStack,
  Heading,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getShowCategory,
  setCategoryAction,
} from "../actions/productAction";
import { AiFillDelete } from "react-icons/ai";

function CategoryForm({ mode }) {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const categoryData = useSelector((state) => {
    return state.getCategory;
  });
  let { loading, showCategory, error } = categoryData;

  const { setcategory } = useSelector((state) => {
    return state.addCategory;
  });

  console.log(showCategory, "777777");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCategoryAction(category, mode));
  };

  const { deleteCatData } = useSelector((state) => {
    return state.deleteCategory;
  });

  useEffect(() => {
    dispatch(getShowCategory());
  }, [setcategory, deleteCatData]);

  return (
    <>
      <VStack>
        {loading && (
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
        )}
        {mode && (
          <Box mt="20px" w="400px" boxShadow="lg" p="6" rounded="md">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="name">{mode}</FormLabel>
                <Input
                  id={mode}
                  placeholder={mode}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
                <FormErrorMessage>{}</FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={false} type="submit">
                Submit
              </Button>
            </form>
          </Box>
        )}
        <HStack>
          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Size
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.size) {
                  return data.size.map((size) => {
                    return (
                      <HStack>
                        <Text>{size}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(size));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${size} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>

          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Color
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.color) {
                  return data.color.map((color) => {
                    return (
                      <HStack>
                        <Text>{color}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(color));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${color} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>
          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Metirial
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.material) {
                  return data.material.map((material) => {
                    return (
                      <HStack>
                        <Text>{material}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(material));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${material} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>

          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Vendor
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.Vendor_Details) {
                  return data.Vendor_Details.map((vendor) => {
                    return (
                      <HStack>
                        <Text>{vendor}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(vendor));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${vendor} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>
          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Sub Category
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.subcategory) {
                  return data.subcategory.map((subcategory) => {
                    return (
                      <HStack>
                        <Text>{subcategory}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(subcategory));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${subcategory} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>

          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Main Category
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.Main_Category) {
                  return data.Main_Category.map((MainCategory) => {
                    return (
                      <HStack>
                        <Text>{MainCategory}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(MainCategory));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${MainCategory} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>

          <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Gender Category
            </Heading>
            {showCategory &&
              showCategory.map((data) => {
                if (data.Gender_Category) {
                  return data.Gender_Category.map((GenderCategory) => {
                    return (
                      <HStack>
                        <Text>{GenderCategory}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(GenderCategory));
                            toast({
                              position: "bottom-left",
                              title: "Account created.",
                              description: `Category ${GenderCategory} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
          </Box>
        </HStack>
      </VStack>
    </>
  );
}

export default CategoryForm;
