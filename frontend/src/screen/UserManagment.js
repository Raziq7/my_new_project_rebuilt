import React, { forwardRef, useEffect, useState } from "react";
import MaterialTable from "material-table";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
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
  useColorModeValue,
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
  const navigate = useNavigate();

  const [status, setStatus] = useState();

  const { changeStatus } = useSelector((state) => {
    return state.changeStatus;
  });
  //useSelector
  const { loading, viewStaff, error } = useSelector((state) => {
    return state.showStaff;
  });

  //data Meterial
  let data =
    viewStaff &&
    viewStaff.map((data) => {
      // if (!data.superAdmin)
      return {
        UserName: data.name,
        UserEmail: data.email,
        Phone: data.phone,
        Status: data.status,

        Action: (
          // if (!data.superAdmin)
          <Select
            name="status"
            onChange={(e) => {
              setStatus({
                status: e.target.value,
                id: data._id,
              });
            }}
            placeholder="Select Status"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="block">Block</option>
            <option value="UnBlock">UnBlock</option>
          </Select>
        ),
        _id: data._id,
      };
    });
  useEffect(() => {
    dispatch(staffShow());
  }, [changeStatus]);

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.parse(localStorage.getItem("staffInfo"))
      : null;
    console.log(staffExit.findStaff.isAdmin, "staffExit");

    if (!staffExit.findStaff.isAdmin) {
      navigate("/login");
    }
  }, []);

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

  //meterial Icon

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  //COLUMN METERIAL
  const columns = [
    {
      title: "UserName",
      field: "UserName",
    },
    { title: "Useremail", field: "UserEmail" },
    { title: "Phone", field: "Phone" },

    { title: "Status", field: "Status" },
    {
      title: "Action",
      field: "Action",
    },
  ];

  return (
    <Box
      width={{
        sm: "60%",
        md: "650px",
        lg: "90%",
        xl: "100%",

      }}
      mb="auto"
      mt="auto"
      h="auto"
    >
      <Center fontSize="40px" color="teal">
        User Managment
      </Center>
      <Link style={{ textDecoration: "none" }} as={ReachLink} to="/StaffForm">
        <Button ml="100px" backgroundColor="#16134F" color="white">
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
            {" "}
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            {" "}
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            {" "}
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            {" "}
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            {" "}
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>{" "}
          <Skeleton>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton>
            {" "}
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton
            style={{
              marginBottom: "260px",
            }}
          >
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
        </>
      ) : (
        <MaterialTable
          style={{
            marginLeft: "40px",
            width: "100%",
            marginBottom: "260px",
          }}
          icons={tableIcons}
          data={data}
          columns={columns}
          title="User Managment"
          options={{
            filtering: true,
            pageSize: 5,
            pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
            // selection: true,
            exportButton: true,
            grouping: true,
          }}
        />
      )}
    </Box>
  );
}

export default UserManagment;
