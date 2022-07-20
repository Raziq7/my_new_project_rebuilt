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
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalOverlay,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getShowCategory,
  setCategoryAction,
  setSubCategoryAction,
  getSubCategory,
  deleteSubCatAction,
} from "../actions/productAction";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";

function CategoryForm({ mode }) {
  const [category, setCategory] = useState("");
  const [subCat, setSubCat] = useState({
    value: "",
    mainValue: null,
  });
  const [init, setInit] = useState("");

  const dispatch = useDispatch();
  const toast = useToast();

  const [subCategory, setSubCategory] = useState(false);
  const [mainValue, setMainValue] = useState("");

  const categoryData = useSelector((state) => {
    return state.getCategory;
  });
  let { loading, showCategory, error } = categoryData;

  const { setcategory } = useSelector((state) => {
    return state.addCategory;
  });

  const { subCategoryData } = useSelector((state) => {
    return state.subCategory;
  });

  const { deleteSubCat } = useSelector((state) => {
    return state.deleteSubCategory;
  });
  console.log(deleteSubCat, "55555555555555");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCategoryAction(category, mode));
  };

  const subCategorySubmit = (e) => {
    e.preventDefault();
    dispatch(setSubCategoryAction(subCat));
  };

  const { deleteCatData } = useSelector((state) => {
    return state.deleteCategory;
  });

  const { showSubCategory } = useSelector((state) => {
    return state.getSubCategories;
  });

  useEffect(() => {
    dispatch(getShowCategory());
    setCategory("");
  }, [setcategory, deleteCatData, showSubCategory]);

  useEffect(() => {
    dispatch(getSubCategory());
  }, [deleteSubCat, subCategoryData]);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
                  value={category}
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
          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Size
              </Heading>
              {showCategory.map((data) => {
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
                              title: "Deleted.",
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
          )}

          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Color
              </Heading>
              {showCategory.map((data) => {
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
                              title: "Deleted.",
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
          )}

          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Material
              </Heading>
              {showCategory.map((data) => {
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
                              title: "Deleted.",
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
          )}

          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Vendor
              </Heading>

              {showCategory.map((data) => {
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
                              title: "Deleted.",
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
          )}
          {/* <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
            <Heading as="h4" size="md">
              Sub Category
            </Heading>
            {showCategory && !showCategory.length == 0 &&
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
                              title: "Deleted.",
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
          </Box> */}

          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Main Category
              </Heading>
              {showCategory.map((data) => {
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
                              title: "Deleted.",
                              description: `Category ${MainCategory} Deleted Successfully`,
                              status: "success",
                              duration: 9000,
                              isClosable: true,
                            });
                          }}
                        />
                        <MdOutlineAddCircle
                          onClick={() => {
                            setSubCategory(true);
                            setMainValue(MainCategory);
                          }}
                        />
                      </HStack>
                    );
                  });
                }
              })}
              <Button
                onClick={() => {
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
              >
                Show SubCategory
              </Button>

              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                  <ModalHeader>Sub Category</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Main Category</Th>
                            <Th>Sub Category</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {showSubCategory &&
                            showSubCategory.map((value) => {
                              return (
                                value.subCategory &&
                                value.subCategory.map((sub) => {
                                  return (
                                    <>
                                      <Tr>
                                        <Td>{value.categoryName}</Td>
                                        <Td>{sub}</Td>
                                        <Td>
                                          <Button
                                            onClick={() => {
                                              dispatch(
                                                deleteSubCatAction({
                                                  value: value.categoryName,
                                                  sub,
                                                })
                                              );
                                            }}
                                          >
                                            Delete
                                          </Button>
                                        </Td>
                                      </Tr>
                                    </>
                                  );
                                })
                              );
                            })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          )}

          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Gender Category
              </Heading>
              {showCategory.map((data) => {
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
                              title: "Deleted.",
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
          )}

          {/* Brand */}

          {showCategory && !showCategory.length == 0 && (
            <Box w="auto" h="auto" boxShadow="lg" p="6" rounded="md">
              <Heading as="h4" size="md" color="teal">
                Brand
              </Heading>
              {showCategory.map((data) => {
                if (data.Brand) {
                  return data.Brand.map((brand) => {
                    return (
                      <HStack>
                        <Text>{brand}</Text>
                        <Spacer />
                        <AiFillDelete
                          onClick={() => {
                            dispatch(deleteCategory(brand));
                            toast({
                              position: "bottom-left",
                              title: "Deleted.",
                              description: `Category ${brand} Deleted Successfully`,
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
          )}
        </HStack>
        {subCategory == true ? (
          <Box mt="20px" w="400px" boxShadow="lg" p="6" rounded="md">
            <form onSubmit={subCategorySubmit}>
              <FormControl>
                <FormLabel htmlFor="name">Add SubCategory</FormLabel>
                <Input
                  placeholder="Add SubCategory"
                  onChange={(e) => {
                    setSubCat({ value: e.target.value, mainValue });
                  }}
                />
                <FormErrorMessage>{}</FormErrorMessage>
              </FormControl>
              <Button mt={4} colorScheme="teal" isLoading={false} type="submit">
                Submit
              </Button>
            </form>
          </Box>
        ) : null}
      </VStack>
    </>
  );
}

export default CategoryForm;
