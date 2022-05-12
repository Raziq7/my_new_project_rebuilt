import React, { useEffect, useState } from "react";
import {
  VStack,
  Input,
  HStack,
  Spacer,
  Button,
  Divider,
  Box,
  Textarea,
  Text,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  editProductTake,
  getShowCategory,
  getSubCategory,
} from "../actions/productAction";
import { useNavigate } from "react-router-dom";

function EditProductForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState([]);

  const { showSubCategory } = useSelector((state) => {
    return state.getSubCategories;
  });

  //useEffect

  useEffect(() => {
    dispatch(getSubCategory());
  }, []);

  useEffect(() => {
    let staffExit = localStorage.getItem("staffInfo")
      ? JSON.stringify(localStorage.getItem("staffInfo"))
      : null;
    if (!staffExit) {
      navigate("/login");
    }
  }, []);
  const { loading, editInfo, error } = useSelector((state) => {
    return state.editData;
  });

  console.log(editInfo, "+665465465465");
  const [initialState, setInitialState] = useState({
    productName: "",
    description: "",
    brand: "",
    meterial: "",
    vendorName: "",
    vendoreDetails: "",
  });

  useEffect(() => {
    if (editInfo) {
      setInitialState(editInfo);
      setProSize(editInfo.productItemDetails[0].proSize);
      setProColor(editInfo.productItemDetails[0].proColor);
      setSelectQty(editInfo.productItemDetails[0].selectQty);
      setQty(editInfo.productItemDetails[0].qty);
      setMarketPrice(editInfo.productItemDetails[0].marketPrice);
      setSellPrice(editInfo.productItemDetails[0].sellingPrice);
      setStocks(editInfo.productItemDetails[0].stocks);
      setPriceCode(editInfo.productItemDetails[0].priceCode);
    }
  }, [editInfo]);

  useEffect(() => {
    dispatch(editProduct(id));
  }, []);

  const [proSize, setProSize] = useState("");
  const [proColor, setProColor] = useState("");
  const [qty, setQty] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [sellingPrice, setSellPrice] = useState("");
  const [selectQty, setSelectQty] = useState("");
  const [stocks, setStocks] = useState("");
  const [priceCode, setPriceCode] = useState("");
  const [checkMeter, setCheckMetet] = useState(null);

  useEffect(() => {
    dispatch(getShowCategory());
  }, []);

  const categoryData = useSelector((state) => {
    return state.getCategory;
  });
  let { showCategory } = categoryData;
  // console.log(showCategory, "***************************************");

  const submitForm = (e) => {
    e.preventDefault();
    let obj = {
      proSize: proSize,
      proColor: proColor,
      qty: qty,
      marketPrice: marketPrice,
      sellingPrice: sellingPrice,
      selectQty: selectQty,
      stocks: stocks,
      priceCode: priceCode,
    };
    initialState.productItemDetails = [obj];
    // console.log(initialState);
    dispatch(editProductTake(initialState));
    navigate("/home");
  };
  return (
    <>
      {loading && <h1>...loading</h1>}
      {editInfo && (
        <VStack width={["auto", "auto", "90%", "90%", "90%"]} mb="auto">
          <Text fontSize="40px" color="teal">
            Edit Product
          </Text>
          <form
            width={["444px", "444px", "444px", "100%", "100%"]}
            display={["444px", "444px", "444px", "100%", "100%"]}
            onSubmit={submitForm}
          >
            <Box mt="9px">
              <HStack>
                <Input
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      productName: e.target.value,
                    });
                  }}
                  value={initialState.productName}
                  name="productName"
                  placeholder="Enter The Product Name"
                />
              </HStack>
              <Spacer />
              <HStack mt="9px">
                <Textarea
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      description: e.target.value,
                    });
                  }}
                  value={initialState.description}
                  name="description"
                  placeholder="Enter The Description"
                />
              </HStack>
            </Box>

            <Box
              display={["block", "block", "block", "block", "flex"]}
              justifyContent={[
                "center",
                "center",
                "center",
                "space-between",
                "space-between",
              ]}
              mt="20px"
            >
              <Box>
                <Text>Product Size</Text>
                {/* <Input
                  onChange={(e) => {
                    setProSize(e.target.value);
                  }}
                  value={proSize}
                  name="proSize"
                  htmlSize={4}
                  width="auto"
                /> */}
                <Select
                  mb="10px"
                  name="proSize"
                  onChange={(e) => {
                    setProSize(e.target.value);
                  }}
                  value={proSize}
                  placeholder="Product Size"
                >
                  {showCategory &&
                    showCategory.map((data) => {
                      if (data.size) {
                        return data.size.map((size) => {
                          return <option value={size}>{size}</option>;
                        });
                      }
                    })}
                </Select>
              </Box>

              <Box>
                <Text>Product Color</Text>
                {/* <Input
                  onChange={(e) => {
                    setProColor(e.target.value);
                  }}
                  value={proColor}
                  name="proColor"
                  htmlSize={4}
                  width="auto"
                /> */}
                <Select
                  w={{
                    sm: "200px",
                    md: "auto",
                    lg: "auto",
                    xl: "auto",
                  }}
                  name="proColor"
                  placeholder="The Color"
                  onChange={(e) => {
                    setProColor(e.target.value);
                  }}
                  value={proColor}
                >
                  {showCategory &&
                    showCategory.map((data) => {
                      if (data.color) {
                        return data.color.map((color) => {
                          return <option value={color}>{color}</option>;
                        });
                      }
                    })}
                </Select>
              </Box>

              <Box>
                <Text>Product Qty</Text>
                <Select
                  mb="10px"
                  name="qty"
                  onChange={(e) => {
                    setSelectQty(e.target.value);
                    setCheckMetet(e.target.value);
                  }}
                  value={selectQty}
                  placeholder="Select Qty"
                >
                  <option value="Meters">Meters</option>
                  <option value="Pieces">Pieces</option>
                </Select>
              </Box>

              <Box>
                <Text> .</Text>
                <Input
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                  value={qty}
                  name="selectQty"
                  htmlSize={4}
                  width="auto"
                />
              </Box>

              <Box>
                <Text width="100px">
                  {checkMeter == "Meters"
                    ? "Per Meter. Market Price"
                    : "Market Price"}
                </Text>
                <Input
                  onChange={(e) => {
                    setMarketPrice(e.target.value);
                  }}
                  value={marketPrice}
                  name="marketPrice"
                  htmlSize={4}
                  width="auto"
                />
              </Box>

              <Box>
                <Text width="100px">
                  {checkMeter == "Meters"
                    ? "Per Meter. Selling Price"
                    : "Selling Price"}
                </Text>
                <Input
                  onChange={(e) => {
                    setSellPrice(e.target.value);
                  }}
                  value={sellingPrice}
                  name="sellingPrice"
                  htmlSize={4}
                  width="auto"
                />
              </Box>

              <Box>
                <Text>Total Stocks</Text>
                <Input
                  onChange={(e) => {
                    setStocks(e.target.value);
                  }}
                  name="stocks"
                  htmlSize={4}
                  width="auto"
                  value={stocks}
                />
              </Box>

              <Box>
                <Text>Price Code</Text>
                <Input
                  onChange={(e) => {
                    setPriceCode(e.target.value);
                  }}
                  value={priceCode}
                  name="priceCode"
                  htmlSize={4}
                  width="auto"
                />
              </Box>
            </Box>

            <Box
              display={{
                sm: "revert",
                md: "block",
                lg: "block",
                xl: "flex",
              }}
              justifyContent={{
                sm: "center",
                md: "space-between",
                lg: "space-between",
                xl: "space-between",
              }}
              mt="10px"
            >
              <Box>
                <Select
                  w={{
                    sm: "200px",
                    md: "auto",
                    lg: "auto",
                    xl: "auto",
                  }}
                  name="brand"
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      brand: e.target.value,
                    });
                  }}
                  value={initialState.brand}
                  placeholder="The brand"
                >
                  <option value="Levise">Levise</option>
                  <option value="Allensolly">Allensolly</option>
                  <option value="GUCCI">GUCCI</option>
                </Select>
              </Box>

              <Box>
                <Select
                  name="meterial"
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      meterial: e.target.value,
                    });
                  }}
                  value={initialState.meterial}
                  placeholder="Product Meterial"
                >
                  {showCategory &&
                    showCategory.map((data) => {
                      if (data.material) {
                        return data.material.map((meterial) => {
                          return <option value={meterial}>{meterial}</option>;
                        });
                      }
                    })}
                </Select>
              </Box>

              <Box>
                <Select
                  name="mainCategory"
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      mainCategory: e.target.value,
                    });
                  }}
                  value={initialState.mainCategory}
                  placeholder="Main Category"
                >
                  {showCategory &&
                    showCategory.map((data) => {
                      if (data.Main_Category) {
                        return data.Main_Category.map((mainCategory) => {
                          return (
                            <option value={mainCategory}>{mainCategory}</option>
                          );
                        });
                      }
                    })}
                </Select>
              </Box>

              <Box>
                <Select
                  w="auto"
                  name="subCategory"
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      subCategory: e.target.value,
                    });
                  }}
                  value={initialState.subCategory}
                  placeholder="Product subCategory"
                >
                  {showSubCategory &&
                    showSubCategory.map((data) => {
                      console.log(data, "5555555555555");
                      if (data.categoryName === initialState.mainCategory) {
                        return data.subCategory.map((subCategory) => {
                          return (
                            <option value={subCategory}>{subCategory}</option>
                          );
                        });
                      }
                    })}
                </Select>
              </Box>

              <Box>
                <Select
                  name="category"
                  onChange={(e) => {
                    setInitialState({
                      ...initialState,
                      category: e.target.value,
                    });
                  }}
                  value={initialState.category}
                  placeholder="Gender Category"
                >
                  {showCategory &&
                    showCategory.map((data) => {
                      if (data.Gender_Category) {
                        return data.Gender_Category.map((GenderCategory) => {
                          return (
                            <option value={GenderCategory}>
                              {GenderCategory}
                            </option>
                          );
                        });
                      }
                    })}
                </Select>
              </Box>
            </Box>

            <Box
              display={{
                sm: "block",
                md: "block",
                lg: "block",
                xl: "block",
              }}
            >
              {/* <Input
                mt="10px"
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    vendorName: e.target.value,
                  });
                }}
                value={initialState.vendorName}
                name="vendorName"
                placeholder="Enter The Vendor Name"
              /> */}

              <Select
                name="vendorName"
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    vendorName: e.target.value,
                  });
                }}
                value={initialState.vendorName}
                placeholder="The Vendor Name"
              >
                {showCategory &&
                  showCategory.map((data) => {
                    if (data.Vendor_Details) {
                      return data.Vendor_Details.map((Vendor) => {
                        return <option value={Vendor}>{Vendor}</option>;
                      });
                    }
                  })}
              </Select>

              {/* <Textarea
                mt="10px"
                name="vendoreDetails"
                onChange={(e) => {
                  setInitialState({
                    ...initialState,
                    vendoreDetails: e.target.value,
                  });
                }}
                value={initialState.vendoreDetails}
                placeholder="Enter The Product Vendor Details"
              /> */}
            </Box>

            <Spacer />

            <Divider />
            <VStack mt="5px">
              <Button
                type="submit"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
              >
                Submit!!
              </Button>
            </VStack>
          </form>
        </VStack>
      )}
    </>
  );
}

export default EditProductForm;
