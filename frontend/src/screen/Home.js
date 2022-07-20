import React, { forwardRef, useEffect, useState } from "react";
import {
  Skeleton,
  Button,
  Box,
  Center,
  HStack,
  useToast,
  Flex,
} from "@chakra-ui/react";
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
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";

import { useDispatch, useSelector } from "react-redux";
import {
  addOneProduct,
  deleteProduct,
  downloadBarCode,
  showProductAction,
} from "../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import useSocket from "../CustomHook/useSocket";
import { Link as ReachLink } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const toast = useToast();

  const [zip, setZip] = useState([]);

  const [zipMrp, setZipMrp] = useState([]);

  const [zipFolder, setZipFolder] = useState();
  const [zipFolder1, setZipFolder1] = useState();

  //socket io
  const socket = useSocket((socket) => {
    socket.on("user", (data) => {
      dispatch(addOneProduct(data));
    });
    socket.on("deletePro", (data) => {
      dispatch(deleteProduct(data._id));
    });
    socket.on("updatePro", (data) => {
      dispatch(showProductAction());
    });
    socket.on("connect_error", (data) => {});
  });

  //selector
  let productDetail = useSelector((state) => {
    return state.showProInfo;
  });
  let { loading, showProduct, error } = productDetail;
  console.log(
    showProduct,
    "showProductshowProductshowProductshowProductshowProduct"
  );

  const { deleteDetail } = useSelector((state) => {
    return state.deleteInfo;
  });

  const { editSuccess } = useSelector((state) => {
    return state.editSuccess;
  });

  useEffect(() => {
    if (editSuccess) {
    }
  }, [editSuccess]);

  useEffect(() => {
    dispatch(showProductAction());
  }, [deleteDetail]);

  //data Meterial
  let data =
    showProduct &&
    showProduct.map((data) => {
      return {
        ProductName: data.ProductName,
        Description: data.Description,
        MainCategory: data.MainCategory,
        SubCategory: data.SubCategory,
        Size: data.Size,
        Color: data.Color,
        GenderWear: data.GenderWear,
        Brand: data.Brand,
        MaterialType: data.MaterialType,
        SellingPrice: data.SellingPrice,
        priceCode: data.priceCode,
        Discount: data.Discount,
        Qty: data.Qty,
        VendorName: data.VendorName,
        BarCode: (
          <img
            src={data.BarCodeLink}
            alt=""
            border="3"
            height="100"
            width="100"
          />
        ),
        MRPBarCode: (
          <img
            src={data.BarCodeMrpLink}
            alt=""
            border="3"
            height="100"
            width="100"
          />
        ),
        Action: (
          <Button
            onClick={() => {
              editPro(data._id);
            }}
            colorScheme="blue"
          >
            Edit
          </Button>
        ),
        _id: data._id,
        BarCodeLink: data.BarCodeLink,
        BarCodeMrpLink: data.BarCodeMrpLink,
        PID: data.PID,
      };
    });

  let staffExit = localStorage.getItem("staffInfo")
    ? JSON.stringify(localStorage.getItem("staffInfo"))
    : null;

  useEffect(() => {
    if (!staffExit) {
      navigate("/login");
    }
  }, [staffExit]);
  const editPro = async (proId) => {
    navigate(`/editProduct/${proId}`);
  };

  //clickZipDownload
  const clickZipDownload = () => {
    var zip1 = new JSZip();
    var count = 0;
    var zipFilename = `${zipFolder}.zip`;

    zip.forEach(function (url, i) {
      var filename = zip[i];
      console.log(filename, "zip[i]===-=-==-=-");
      filename = filename
        .replace(/[\/\*\|\:\<\>\?\"\\]/gi, "")
        .replace("httpsi.imgur.com", "");
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip1.file(filename, data, { binary: true });
        count++;
        if (count == zip.length) {
          zip1.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  };

  const clickMrpZipDownload = () => {
    ///MRPZIP
    var zip2 = new JSZip();
    var count = 0;
    var zipFilename = `${zipFolder1}.zip`;

    zipMrp.forEach(function (url, i) {
      var filename = zipMrp[i];
      alert(filename);
      console.log(filename, "zipMrp[i]===-=-==-=-");
      filename = filename
        .replace(/[\/\*\|\:\<\>\?\"\\]/gi, "")
        .replace("httpsi.imgur.com", "");
      // loading a file and add it in a zip file
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          throw err; // or handle the error
        }
        zip2.file(filename, data, { binary: true });
        count++;
        if (count == zip.length) {
          zip2.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  };

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
      title: "Product Name",
      field: "ProductName",
    },
    { title: "Description", field: "Description" },
    { title: "Main Category", field: "MainCategory" },

    { title: "SubCategory", field: "SubCategory" },
    { title: "Size", field: "Size" },
    { title: "Color", field: "Color" },

    { title: "Gender Wear", field: "GenderWear" },
    { title: "Brand", field: "Brand" },
    { title: "Material Type", field: "MaterialType" },
    { title: "Selling Price", field: "SellingPrice" },
    { title: "price Code", field: "priceCode" },
    { title: "Discount", field: "Discount" },
    { title: "Qty", field: "Qty" },
    { title: "Vendor Name", field: "VendorName" },
    {
      title: "Bar Code",
      field: "BarCode",
    },
    {
      title: "MRP Bar Code",
      field: "MRPBarCode",
    },
    {
      title: "Action",
      field: "Action",
    },
  ];

  return (
    <>
      <Box overflowY="auto" mb="auto">
        <Center fontSize="40px" color="teal" mt="10px">
          Product Management
        </Center>
        <>
          <Link
            style={{ textDecoration: "none" }}
            as={ReachLink}
            to="/addproduct"
          >
            <Button left="15%" backgroundColor="#16134F" color="white">
              Add Product
            </Button>
          </Link>
          <Flex>
            <Box ml="500px">
              {/* <Button onClick={clickZipDownload}>Zip Download</Button> */}
            </Box>
            <Box ml="500px">
              {/* <Button onClick={clickMrpZipDownload}>Zip Download MRP</Button> */}
            </Box>
          </Flex>
          {loading ? (
            <HStack ml="200px">
              <Skeleton w="100%" mt="50px">
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </HStack>
          ) : (
            <MaterialTable
              style={{
                marginLeft: 150,
                marginRight: "auto",
                marginTop: "20px",
                width: "1060px",
              }}
              icons={tableIcons}
              data={data}
              columns={columns}
              title="Product Management"
              options={{
                filtering: true,
                pageSize: 3,
                pageSizeOptions: [3, 5, 10, 20, 30, 40, 50],
                selection: true,
                exportButton: true,
                grouping: true,
              }}
              actions={[
                {
                  icon: () => <AiOutlineDelete />,
                  tooltip: "Remove All Selected Products",
                  onClick: (evt, data) => {
                    data.map((id) => {
                      dispatch(deleteProduct(id._id));
                    });
                  },
                },

                {
                  icon: () => <AiOutlineDownload />,
                  tooltip: "download All Selected Bar Code",
                  onClick: (evt, data) => {
                    data.map(async (id) => {
                      setZipFolder(id.PID);
                      setZip([...zip, id.PID]);

                      clickZipDownload();
                    });
                  },
                },

                {
                  icon: () => <AiOutlineDownload />,
                  tooltip: "download MRP All Selected Bar Code",
                  onClick: (evt, data) => {
                    data.map(async (id) => {
                      alert(id.PID, "ghjhkhkjhhkjkjhooogloglglglkg");

                      setZipMrp([...zipMrp, id.BarCodeMrpLink]);
                      setZipFolder1(id.PID);
                      clickMrpZipDownload();
                    });
                  },
                },
              ]}
            />
            // <h1>KSJDFALSJDFASKJL</h1>
          )}
        </>
      </Box>
    </>
  );
}

export default Home;
