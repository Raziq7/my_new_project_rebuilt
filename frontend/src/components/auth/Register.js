import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { staffRegster } from "../../actions/staffAction";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiTwotoneLock } from "react-icons/ai";
import { MdLocalPostOffice } from "react-icons/md";
import { BiMobileAlt } from "react-icons/bi";
import { useFormik } from "formik";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //validate Form
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 3) {
      errors.name = "Must be 4 characters or More";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (values.email.length <= 3) {
      errors.email = "Must be 4 characters or More";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.length < 10) {
      errors.phone = "Must be 10 Numbers";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4) {
      errors.password = "Must be 4 Characters or More";
    } else if (values.password === "123456") {
      errors.password = "Must Not be 123456";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Second Password Does'nt Match";
    }
    return errors;
  };

  const staffRegisterData = useSelector((state) => {
    return state.staffData;
  });
  const { loading, error, staffInfo } = staffRegisterData;
  console.log(staffInfo, loading, error);
  //submit Form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      const detail = values;
      console.log(detail);
      dispatch(staffRegster(detail));
    },
  });
  useEffect(() => {
    if (staffInfo) {
      navigate("/usermanagment");
    }
  }, [staffInfo]);

  // useEffect(() => {
  //   let isStaff = localStorage.getItem("staffInfo")
  //     ? JSON.stringify(localStorage.getItem("staffInfo"))
  //     : null;
  //   if (isStaff) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <Box
      justify={"center"}
      align={"center"}
      ml="auto"
      mr="auto"
      mb="auto"
      mt="10px"
    >
      <Center fontSize="40px" color="teal">
        Add New User
      </Center>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <VStack>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<Icon name="info" />} />
                <Input
                  backgroundColor="white"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  type="name"
                  placeholder="Enter User Name"
                  aria-label="name"
                  name="name"
                />
              </InputGroup>
            </FormControl>
            {formik.touched.name && formik.errors.name ? (
              <Text color="tomato">{formik.errors.name}</Text>
            ) : null}
          </VStack>

          <VStack>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<MdLocalPostOffice />} />
                <Input
                  backgroundColor="white"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  type="email"
                  placeholder="Enter User Email"
                  aria-label="Email"
                  name="email"
                />
              </InputGroup>
            </FormControl>
            {formik.touched.email && formik.errors.email ? (
              <Text color="tomato">{formik.errors.email}</Text>
            ) : null}
          </VStack>

          <VStack>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<BiMobileAlt />} />
                <Input
                  backgroundColor="white"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Enter User Phone Number"
                  aria-label="Phone Number"
                  name="phone"
                />
              </InputGroup>
            </FormControl>
            {formik.touched.phone && formik.errors.phone ? (
              <Text color="tomato">{formik.errors.phone}</Text>
            ) : null}
          </VStack>

          <VStack>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<AiTwotoneLock />} />
                <Input
                  backgroundColor="white"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  type="password"
                  placeholder="Enter User Password"
                  aria-label="Password"
                  name="password"
                />
              </InputGroup>
            </FormControl>
            {formik.touched.password && formik.errors.password ? (
              <Text color="tomato">{formik.errors.password}</Text>
            ) : null}
          </VStack>

          <VStack>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<AiTwotoneLock />} />
                <Input
                  backgroundColor="white"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  type="password"
                  placeholder="Enter User Confirm Password"
                  aria-label="Confirm Password"
                  name="confirmPassword"
                />
              </InputGroup>
            </FormControl>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Text color="tomato">{formik.errors.confirmPassword}</Text>
            ) : null}
          </VStack>
          <Divider />

          <HStack>
            <Button
              backgroundColor="teal"
              color="white"
              type="submit"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              _active={{ boxShadow: "lg" }}
            >
              Register!
            </Button>

            <Link to="/usermanagment">
              <Button
                ml="10px"
                backgroundColor="tomato"
                type="submit"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
              >
                Cancel
              </Button>
            </Link>
          </HStack>
        </Stack>
      </form>
    </Box>
  );
}

export default Register;
