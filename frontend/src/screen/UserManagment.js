import React, { useEffect, useState } from "react";
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
  Box,
  Center,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { staffShow, staffStatusChange } from "../actions/staffAction";
import useSocket from "../CustomHook/useSocket";

function UserManagment() {
  ///socket - io
  const socket = useSocket((socket) => {
    socket.on("userUpdate", (data) => {
      dispatch(staffShow());
    });
  });

  const dispatch = useDispatch();
  const toast = useToast();

  const [status, setStatus] = useState();

  const { changeStatus } = useSelector((state) => {
    return state.changeStatus;
  });
  console.log(changeStatus, "changeStatus");

  useEffect(() => {
    dispatch(staffShow());
  }, [changeStatus]);

  //useSelector
  const { loading, viewStaff, error } = useSelector((state) => {
    return state.showStaff;
  });

  useEffect(() => {
    if (!status == "") {
      console.log("entered", status);
      dispatch(staffStatusChange(status));
      toast({
        title: "Status Changed Successfully.",
        description: `Status Changed To ${status.status}.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [status]);

  return (
    <Box
      width={{
        sm: "60%",
        md: "650px",
        lg: "500px",
        xl: "70%",
      }}
      mb="500px"
      ml="50px"
    >
      <Center fontSize="40px" color="teal">
        User Managment
      </Center>
      <Link style={{ textDecoration: "none" }} as={ReachLink} to="/StaffForm">
        <Button left="96" ml="36">
          Add User
        </Button>
      </Link>
      {loading ? (
        <>
          <Skeleton>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
        </>
      ) : (
        <TableContainer
          width={{
            sm: "650px",
            md: "650px",
            lg: "600px",
            xl: "700px",
          }}
          ml="auto"
          mr="auto"
        >
          <Table variant="simple">
            <TableCaption>Ukkens Vasthralaya User Managment</TableCaption>
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>User email</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
                <Th> Action</Th>
              </Tr>
            </Thead>
            {viewStaff.map((staff) => {
              return (
                <Tbody key={staff._id}>
                  <Tr>
                    <Td>{staff.name}</Td>
                    <Td>{staff.email}</Td>
                    <Td>{staff.phone}</Td>
                    <Td>{staff.status}</Td>
                    <Td>
                      <Select
                        w="110px"
                        name="status"
                        onChange={(e) => {
                          setStatus({
                            status: e.target.value,
                            id: staff._id,
                          });
                        }}
                        placeholder="Select Status"
                      >
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="block">Block</option>
                        <option value="UnBlock">UnBlock</option>
                      </Select>
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}

            <Tfoot>
              <Tr>
                <Th>User Name</Th>
                <Th>User email</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
                <Th> Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default UserManagment;
