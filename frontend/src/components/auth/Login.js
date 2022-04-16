import React, { useEffect } from "react";
import {
  Button,
  Divider,
  Flex,
  FormControl,
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
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { staffLogin } from "../../actions/staffAction";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffLoginData = useSelector((state) => {
    return state.staffLginData;
  });

  let { loding, staffInfo } = staffLoginData;

  useEffect(() => {
    if (staffInfo) {
      navigate("/");
    }
  }, [staffInfo]);

  useEffect(() => {
    let isStaff = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (isStaff) {
      navigate("/");
    }
  }, []);

  //validatio form

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

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4) {
      errors.password = "Must be 4 Characters or More";
    } else if (values.password === "123456") {
      errors.password = "Must Not be 123456";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(staffLogin(values));
    },
  });
  return (
    <div>
      {loding ? (
        <h1>Loding......</h1>
      ) : (
        <Flex justify={"center"} align={"center"}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <VStack>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<Icon name="info" />} />
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      type="name"
                      placeholder="Enter Your Name"
                      aria-label="name"
                      name="name"
                    />
                  </InputGroup>
                </FormControl>
                {formik.errors.name ? (
                  <Text color="tomato">{formik.errors.name}</Text>
                ) : null}
              </VStack>

              <VStack>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<MdLocalPostOffice />} />
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      type="email"
                      placeholder="Enter Your Email"
                      aria-label="Email"
                      name="email"
                    />
                  </InputGroup>
                </FormControl>
                {formik.errors.name ? (
                  <Text color="tomato">{formik.errors.email}</Text>
                ) : null}
              </VStack>

              <VStack>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<AiTwotoneLock />} />
                    <Input
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      type="password"
                      placeholder="Enter Your Password"
                      aria-label="Password"
                      name="password"
                    />
                  </InputGroup>
                </FormControl>
                {formik.errors.name ? (
                  <Text color="tomato">{formik.errors.password}</Text>
                ) : null}
              </VStack>

              <Divider />
              <Button
                type="submit"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
              >
                Sign In!
              </Button>
            </Stack>
          </form>
        </Flex>
      )}
    </div>
  );
}

export default Login;
