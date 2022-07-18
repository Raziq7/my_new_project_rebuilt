import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
  useToast,
  Box,
  Badge,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import { staffLogin } from "../../actions/staffAction";
// import Messege from "../Messege";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const staffLoginData = useSelector((state) => {
    return state.staffLginData;
  });
  let { loding, staffInfo } = staffLoginData;

  const loginMsg = useSelector((state) => {
    return state.staffLginData;
  });
  let { error } = loginMsg;

  useEffect(() => {
    let isStaff = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (isStaff) {
      navigate("/");
    }
  }, [staffInfo]);

  //validatio form
  const validate = (values) => {
    const errors = {};

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
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(staffLogin(values));
    },
  });

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          {error &&
            toast({
              title: `${error}`,
              status: "error",
              position: "bottom-right",
              isClosable: true,
            })}
          {/* // <Messege variant="danger">{error}</Messege>} */}
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                type="email"
                placeholder="Enter Your Email"
                aria-label="Email"
                name="email"
              />
            </FormControl>
            {formik.errors.email ? (
              <Text color="tomato">{formik.errors.email}</Text>
            ) : null}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                placeholder="Enter Your Password"
                aria-label="Password"
                name="password"
              />
            </FormControl>
            {formik.errors.password ? (
              <Text color="tomato">{formik.errors.password}</Text>
            ) : null}
            <Stack spacing={6}>
              <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Box
          sx={{
            zIndex: 100,
            position: "absolute",
            marginLeft: "350px",
            mt: 2,
            width: "300px",
          }}
        >
          <Text color="black" fontSize="lg">
            New Update Available !
          </Text>{" "}
          <Badge colorScheme="green">App Version V1.0.5</Badge>
          <br />
          <Text fontSize="12px" color="md">
            We have added some new awesome features
          </Text>
          <br />
          {/* <Button>App Version V1.0.5</Button> */}
        </Box>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={"images/4231726.jpg"}
        />
      </Flex>
    </Stack>
  );
}
