import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categorySelect } from "../actions/productAction";

function CategoryLadger() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [Category, setCategory] = useState();
  const { loading, error, categoryLadger } = useSelector((state) => {
    return state.categorySelect;
  });

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const clickSetCategory = () => {
    dispatch(categorySelect(Category));
  };
  useEffect(() => {
    if (categoryLadger) {
      toast({
        position: "top-left",
        title: "New Category created.",
        description: "Category Added Successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [categoryLadger]);

  return (
    <>
      <Button onClick={onOpen}>Open Form</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        {loading ? (
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <ModalContent>
            <ModalHeader>Ladger Category</ModalHeader>
            <ModalCloseButton />
            {error && (
              <Text fontSize="md" color="tomato" ml="20px">
                {error}
              </Text>
            )}
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Select Your Category</FormLabel>
                <Input
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  ref={initialRef}
                  placeholder="Enter Your Catergory"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={clickSetCategory} colorScheme="blue" mr={3}>
                Save
              </Button>

              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
export default CategoryLadger;
